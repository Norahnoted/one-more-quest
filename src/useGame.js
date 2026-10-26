import { useRef, useState, useEffect } from 'react';
import { transition, levelOf } from './game.js';
import { CATALOG } from './catalog.js';
import { loadSave, saveRecord } from './storage.js';
export function useGame() {
  const [loaded] = useState(() => loadSave());
  const [record, setRecord] = useState(loaded.record);
  const latest = useRef(loaded.record);
  const [warning, setWarning] = useState(loaded.warning);
  const [message, setMessage] = useState('A little effort. A little further.');
  const [effect, setEffect] = useState(null);
  const [encounter, setEncounter] = useState(null);
  const [reward, setReward] = useState(null);
  const locked = useRef(false);
  const timers = useRef([]);
  const sequence = useRef(0);
  const later = (fn, delay) => { timers.current.push(setTimeout(fn,delay)); };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current=[]; };
  useEffect(() => () => clearTimers(), []);
  function act(action) {
    if (loaded.blocked || locked.current) return;
    const before = latest.current;
    const next = transition(before, action);
    if (next === before) return;
    clearTimers();
    setReward(null);
    const levelUp = levelOf(next.current.totalXp) > levelOf(before.current.totalXp);
    const showEffect = () => {
      setEffect(action === 'undo' ? null : { id: ++sequence.current, type: levelUp ? 'level' : action, level: levelOf(next.current.totalXp) });
      later(() => setEffect(null),2200);
    };
    latest.current = next;
    setWarning(saveRecord(next));
    setRecord(next);
    if (action === 'interview') {
      locked.current = true;
      setEffect(null);
      const boss = CATALOG[before.current.interviewsCompleted % CATALOG.length];
      setEncounter({ boss, phase:'approach' });
      setMessage(`Facing ${boss.name}. Showing up is the victory.`);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      later(() => setEncounter({boss,phase:'strike'}), reduced ? 100 : 1200);
      later(() => setEncounter({boss,phase:'stars'}), reduced ? 200 : 2700);
      later(() => {
        setEncounter(null); locked.current=false;
        setReward(boss);
        setMessage('Interview complete. You showed up. +30 XP, a new weapon, and a desk keepsake.');
        showEffect();
      },reduced ? 400 : 4000);
    } else {
      showEffect();
      setMessage(action === 'apply' ? '+10 XP · One more door knocked on.' : action === 'prepare' ? `Weapon reinforced to +${next.current.reinforcement}. You are getting ready.` : 'Last action undone. Your progress is restored.');
    }
  }
  return { record, warning, message, effect, encounter, reward, dismissReward:()=>setReward(null), act, busy:Boolean(encounter), blocked:loaded.blocked };
}
