export function mulberry32(seed: number) {
  return function() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickIndex(len: number, seed: number): number {
  const rnd = mulberry32(seed)();
  return Math.floor(rnd * len);
}

export function generateSeed(): number {
  return Math.floor(Math.random() * 2147483647);
}