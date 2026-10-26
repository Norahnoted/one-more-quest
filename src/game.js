import { STARTER, CATALOG } from './catalog.js';
export const RULES = { applicationXp: 10, interviewXp: 30, xpPerLevel: 100 };
export function initialRecord() {
  return { version: 1, current: { totalXp: 0, reinforcement: 0, weaponId: STARTER.id, hearts: 3, interviewsCompleted: 0, collection: {}, daily: {} }, previous: null, lastAction: null };
}
export function levelOf(xp) { return 1 + Math.floor(xp / RULES.xpPerLevel); }
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function transition(record, action, day = localDay()) {
  if (action === 'undo') return record.previous ? { ...record, current: structuredClone(record.previous), previous: null, lastAction: null } : record;
  if (!['apply', 'prepare', 'interview', 'heartbreak', 'retry', 'different'].includes(action)) return record;
  if (action === 'heartbreak' && record.current.hearts === 0) return record;
  if (['retry','different'].includes(action) && record.current.hearts !== 0) return record;
  const current = structuredClone(record.current);
  current.daily ??= {};
  if (['apply','prepare','interview'].includes(action)) {
    current.daily[day] ??= { apply: 0, prepare: 0, interview: 0 };
    current.daily[day][action]++;
  }
  if (action === 'heartbreak') current.hearts--;
  if (['retry','different'].includes(action)) current.hearts = 3;
  if (action === 'apply') current.totalXp += RULES.applicationXp;
  if (action === 'prepare') current.reinforcement++;
  if (action === 'interview') {
    const boss = CATALOG[current.interviewsCompleted % CATALOG.length];
    current.totalXp += RULES.interviewXp;
    current.weaponId = boss.id;
    current.interviewsCompleted++;
    current.collection[boss.id] = (current.collection[boss.id] || 0) + 1;
  }
  return { version: 1, current, previous: structuredClone(record.current), lastAction: action };
}
