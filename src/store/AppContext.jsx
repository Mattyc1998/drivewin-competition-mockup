import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { INITIAL_COMPETITIONS, ticketsSoldTotal, formatTicketNumber } from '../data/competitions.js';
import { mulberry32, fakeName } from '../data/fakeNames.js';
import { PAST_WINNERS } from '../data/winners.js';

const STORAGE_KEY = 'drivewin-demo-state-v2';

export const DEMO_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
};

function seedEntrantsFor(comp) {
  const rng = mulberry32(comp.id.charCodeAt(0) * 7919 + comp.ticketsSoldBase);
  const count = 10 + Math.floor(rng() * 8); // 10-17 sample rows for flavour
  const rows = [];
  for (let i = 0; i < count; i++) {
    const qty = 1 + Math.floor(rng() * 10);
    const maxStart = Math.max(1, comp.ticketsSoldBase - qty);
    const start = 1 + Math.floor(rng() * maxStart);
    const daysAgo = Math.floor(rng() * 12) + 1;
    const purchaseDate = new Date('2026-09-18T09:00:00Z');
    purchaseDate.setUTCDate(purchaseDate.getUTCDate() - daysAgo);
    rows.push({
      id: `${comp.id}-seed-${i}`,
      name: fakeName(rng),
      quantity: qty,
      ticketNumbers: Array.from({ length: qty }, (_, k) => formatTicketNumber(comp.id, start + k)),
      purchaseDate: purchaseDate.toISOString(),
      isDemo: false,
    });
  }
  rows.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
  return rows;
}

function buildInitialState() {
  const competitions = INITIAL_COMPETITIONS.map((c) => ({ ...c }));
  const entrantsByComp = {};
  competitions.forEach((c) => {
    entrantsByComp[c.id] = seedEntrantsFor(c);
  });
  return {
    competitions,
    entrantsByComp, // { [compId]: entrant[] } — seed rows + demo purchases
    demoTicketCounts: {}, // { [compId]: number } tickets bought by the demo user this session
    draws: {}, // { [compId]: { winningTicketNumber, winnerName, isDemo, drawnAt } }
    extraWinners: [], // winners generated via admin "Run draw" during this demo
    lastOrder: null,
    nextOrderId: 10482,
  };
}

function loadInitialState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt storage
  }
  return buildInitialState();
}

function reducer(state, action) {
  switch (action.type) {
    case 'BUY_TICKETS': {
      const { competitionId, quantity } = action;
      const comp = state.competitions.find((c) => c.id === competitionId);
      if (!comp) return state;
      const alreadyDemo = state.demoTicketCounts[competitionId] || 0;
      const soldSoFar = ticketsSoldTotal(comp, alreadyDemo);
      const start = soldSoFar + 1;
      const ticketNumbers = Array.from({ length: quantity }, (_, i) =>
        formatTicketNumber(comp.id, start + i)
      );
      const orderId = `DW-${state.nextOrderId}`;
      const entrant = {
        id: `${competitionId}-demo-${orderId}`,
        name: DEMO_USER.name,
        quantity,
        ticketNumbers,
        purchaseDate: new Date().toISOString(),
        isDemo: true,
        orderId,
      };
      const lastOrder = {
        orderId,
        competitionId,
        competitionTitle: comp.title,
        quantity,
        unitPrice: comp.ticketPrice,
        total: +(comp.ticketPrice * quantity).toFixed(2),
        ticketNumbers,
        purchaseDate: entrant.purchaseDate,
      };
      return {
        ...state,
        demoTicketCounts: {
          ...state.demoTicketCounts,
          [competitionId]: alreadyDemo + quantity,
        },
        entrantsByComp: {
          ...state.entrantsByComp,
          [competitionId]: [entrant, ...(state.entrantsByComp[competitionId] || [])],
        },
        lastOrder,
        nextOrderId: state.nextOrderId + 1,
      };
    }
    case 'CREATE_COMPETITION': {
      const comp = action.competition;
      return {
        ...state,
        competitions: [comp, ...state.competitions],
        entrantsByComp: { ...state.entrantsByComp, [comp.id]: [] },
      };
    }
    case 'UPDATE_COMPETITION': {
      return {
        ...state,
        competitions: state.competitions.map((c) =>
          c.id === action.id ? { ...c, ...action.patch } : c
        ),
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        competitions: state.competitions.map((c) =>
          c.id === action.id ? { ...c, status: action.status } : c
        ),
      };
    }
    case 'RUN_DRAW': {
      const comp = state.competitions.find((c) => c.id === action.id);
      if (!comp) return state;
      const demoCount = state.demoTicketCounts[action.id] || 0;
      const totalSold = ticketsSoldTotal(comp, demoCount);
      if (totalSold < 1) return state;
      const rng = mulberry32(Date.now() % 2147483647);
      const winningNumber = 1 + Math.floor(rng() * totalSold);
      const ticketNumber = formatTicketNumber(comp.id, winningNumber);

      const entrants = state.entrantsByComp[action.id] || [];
      let winnerName = null;
      let isDemoWinner = false;
      for (const e of entrants) {
        if (e.ticketNumbers.includes(ticketNumber)) {
          winnerName = e.name;
          isDemoWinner = !!e.isDemo;
          break;
        }
      }
      if (!winnerName) {
        const rng2 = mulberry32(winningNumber * 31 + comp.id.length);
        winnerName = fakeName(rng2);
      }

      const draw = {
        winningTicketNumber: ticketNumber,
        winnerName,
        isDemo: isDemoWinner,
        drawnAt: new Date().toISOString(),
      };

      const newWinner = {
        id: `draw-${action.id}-${Date.now()}`,
        initials: winnerName,
        name: winnerName,
        location: 'UK',
        prize: comp.title,
        image: comp.images[0],
        date: draw.drawnAt.slice(0, 10),
        ticketNumber,
        quote: 'Live draw winner — drawn just now in this demo.',
      };

      return {
        ...state,
        draws: { ...state.draws, [action.id]: draw },
        competitions: state.competitions.map((c) =>
          c.id === action.id ? { ...c, status: 'ended' } : c
        ),
        extraWinners: [newWinner, ...state.extraWinners],
      };
    }
    case 'RESET_DEMO': {
      return buildInitialState();
    }
    default:
      return state;
  }
}

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full/unavailable — demo still works in-memory
    }
  }, [state]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error('useAppDispatch must be used within AppProvider');
  return ctx;
}

export function useCompetition(idOrSlug) {
  const state = useAppState();
  return useMemo(
    () =>
      state.competitions.find((c) => c.id === idOrSlug || c.slug === idOrSlug) || null,
    [state.competitions, idOrSlug]
  );
}

export function useAllWinners() {
  const state = useAppState();
  return useMemo(() => [...state.extraWinners, ...PAST_WINNERS], [state.extraWinners]);
}

export function useDemoSoldCount(compId) {
  const state = useAppState();
  return state.demoTicketCounts[compId] || 0;
}

export function useMyTickets() {
  const state = useAppState();
  return useMemo(() => {
    const rows = [];
    for (const comp of state.competitions) {
      const entrants = state.entrantsByComp[comp.id] || [];
      for (const e of entrants) {
        if (!e.isDemo) continue;
        const draw = state.draws[comp.id];
        let status = 'upcoming';
        if (draw) {
          status = draw.winningTicketNumber && e.ticketNumbers.includes(draw.winningTicketNumber)
            ? 'won'
            : 'lost';
        }
        rows.push({
          orderId: e.orderId,
          competition: comp,
          ticketNumbers: e.ticketNumbers,
          purchaseDate: e.purchaseDate,
          status,
        });
      }
    }
    rows.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    return rows;
  }, [state.competitions, state.entrantsByComp, state.draws]);
}
