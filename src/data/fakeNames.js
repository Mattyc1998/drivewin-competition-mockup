export const FAKE_FIRST_NAMES = [
  'James', 'Sarah', 'David', 'Emma', 'Michael', 'Olivia', 'Daniel', 'Sophie',
  'Thomas', 'Chloe', 'Ryan', 'Megan', 'Jack', 'Amelia', 'Liam', 'Grace',
  'Callum', 'Hannah', 'Joshua', 'Ellie', 'Aaron', 'Lucy', 'Connor', 'Jessica',
  'Ben', 'Katie', 'Sam', 'Charlotte', 'Josh', 'Freya', 'Harry', 'Poppy',
  'Adam', 'Robyn', 'Luke', 'Molly', 'Jake', 'Isla', 'Ravi', 'Priya',
];

export const FAKE_LAST_INITIALS = [
  'M', 'K', 'O', 'P', 'T', 'B', 'H', 'W', 'C', 'R', 'S', 'D', 'F', 'L', 'G', 'N',
];

// Deterministic pseudo-random generator so seed data is stable across reloads.
export function mulberry32(seed) {
  let t = seed;
  return function () {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function fakeName(rng) {
  const first = FAKE_FIRST_NAMES[Math.floor(rng() * FAKE_FIRST_NAMES.length)];
  const last = FAKE_LAST_INITIALS[Math.floor(rng() * FAKE_LAST_INITIALS.length)];
  return `${first} ${last}.`;
}
