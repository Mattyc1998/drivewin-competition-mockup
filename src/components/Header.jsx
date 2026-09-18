import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DEMO_USER } from '../store/AppContext.jsx';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/competitions', label: 'Competitions' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/winners', label: 'Winners' },
  { to: '/my-tickets', label: 'My Tickets' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-black text-lg">
            D
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Drive<span className="text-gold-400">Win</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-gold-400' : 'text-white/75 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              onClick={() => setLoginOpen((v) => !v)}
              className="text-sm font-medium text-white/75 hover:text-white transition-colors"
            >
              {DEMO_USER.name.split(' ')[0]}
            </button>
            {loginOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-lg border border-white/10 bg-navy-800 p-4 shadow-2xl text-left">
                <p className="text-xs uppercase tracking-wide text-white/40 mb-1">Demo account</p>
                <p className="text-sm text-white font-semibold">{DEMO_USER.name}</p>
                <p className="text-xs text-white/50 mb-3">{DEMO_USER.email}</p>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  This is a live demo — you're already signed in, no real login required.
                </p>
                <Link
                  to="/my-tickets"
                  onClick={() => setLoginOpen(false)}
                  className="block text-center text-sm font-semibold rounded-md bg-white/10 hover:bg-white/15 text-white py-2 transition-colors"
                >
                  View my tickets
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/competitions"
            className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition"
          >
            Enter now
          </Link>
        </div>

        <button
          className="lg:hidden text-white p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-900 px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-white/10 text-gold-400' : 'text-white/80 hover:bg-white/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 flex items-center justify-between px-3">
            <span className="text-xs text-white/40">Signed in as {DEMO_USER.name}</span>
          </div>
          <Link
            to="/competitions"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-md bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-center text-sm font-bold text-white"
          >
            Enter now
          </Link>
        </div>
      )}
    </header>
  );
}
