// Preloaded into `next build` through NODE_OPTIONS=--require, so the build workers inherit it.
// `new Date()` with no arguments returns a fixed instant (Footer.tsx prints the current year);
// Date.now() keeps running so timers and durations inside Next are unaffected.
const FROZEN = Date.parse(process.env.BK_FROZEN_NOW || "2026-10-14T12:00:00Z");
const RealDate = Date;
function FrozenDate(...args) {
  if (!new.target) return RealDate(...args);
  return args.length === 0 ? new RealDate(FROZEN) : new RealDate(...args);
}
FrozenDate.prototype = RealDate.prototype;
FrozenDate.now = RealDate.now;
FrozenDate.parse = RealDate.parse;
FrozenDate.UTC = RealDate.UTC;
globalThis.Date = FrozenDate;
