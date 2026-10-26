import { useRef, useState, useEffect } from 'react';
import { transition, levelOf } from './game.js';
import { loadSave, saveRecord } from './storage.js';
export function useGame() {
  const [loaded] = useState(() => loadSave());
  const [record, setRecord] = useState(loaded.record);
  const latest = useRef(loaded.record);
  const [warning, setWarning] = useState(loaded.warning);
  const [message, setMessage] = useState('A little effort. A little further.');
  const [effect, setEffect] = useState(null);
  const timer = useRef(null);
  const sequence = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  function act(action) {
    if (loaded.blocked) return;
    const next = transition(latest.current, action);
    if (next === latest.current) return;
    clearTimeout(timer.current);
    const levelUp = levelOf(next.current.totalXp) > levelOf(latest.current.current.totalXp);
    setEffect(action === 'undo' ? null : { id: ++sequence.current, type: levelUp ? 'level' : action, level: levelOf(next.current.totalXp) });
    timer.current = setTimeout(() => setEffect(null), 2200);
    latest.current = next;
    setWarning(saveRecord(next));
    setRecord(next);
    setMessage(action === 'apply' ? '+10 XP · One more door knocked on.' : action === 'prepare' ? `Weapon reinforced to +${next.current.reinforcement}. You are getting ready.` : 'Last action undone. Your progress is restored.');
  }
  return { record, warning, message, effect, act, blocked: loaded.blocked };
}
