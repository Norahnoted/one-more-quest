import { initialRecord } from './game.js';
import { CATALOG, STARTER } from './catalog.js';
export const SAVE_KEY = 'one-more-chance:save:v1';
const integer = value => Number.isSafeInteger(value) && value >= 0;
function validDaily(daily) {
  return daily === undefined || (daily && typeof daily === 'object' && !Array.isArray(daily)
    && Object.entries(daily).every(([day, counts]) => /^\d{4}-\d{2}-\d{2}$/.test(day)
      && counts && ['apply','prepare','interview'].every(key => integer(counts[key]))));
}
function validProgress(p) {
  return p && validDaily(p.daily) && integer(p.totalXp) && integer(p.reinforcement) && integer(p.hearts) && p.hearts <= 3 && integer(p.interviewsCompleted)
    && [STARTER.id, ...CATALOG.map(x => x.id)].includes(p.weaponId)
    && p.collection && !Array.isArray(p.collection) && typeof p.collection === 'object'
    && Object.entries(p.collection).every(([id, n]) => CATALOG.some(x => x.id === id) && integer(n));
}
export function validRecord(r) {
  return r?.version === 1 && validProgress(r.current) && (r.previous === null || validProgress(r.previous))
    && (r.previous === null ? r.lastAction === null : ['apply','prepare','interview','heartbreak','retry','different'].includes(r.lastAction));
}
export function loadSave(getStorage = () => window.localStorage) {
  try {
    const raw = getStorage().getItem(SAVE_KEY);
    if (raw === null) return { record: initialRecord(), warning: '', blocked: false };
    const record = JSON.parse(raw);
    if (!validRecord(record)) throw new Error('Invalid save');
    record.current.daily ??= {};
    if (record.previous) record.previous.daily ??= {};
    return { record, warning: '', blocked: false };
  } catch {
    return { record: initialRecord(), blocked: true, warning: 'Your saved progress could not be read. It has not been overwritten. Please try a different browser profile or restore your browser data.' };
  }
}
export function saveRecord(record, getStorage = () => window.localStorage) {
  try { getStorage().setItem(SAVE_KEY, JSON.stringify(record)); return ''; }
  catch { return 'Progress is not saved. Browser storage is unavailable or full. Keep this page open; changes may be lost on refresh.'; }
}
