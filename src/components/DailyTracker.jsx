import { useEffect, useState } from 'react';
import { localDay } from '../game.js';
const empty = { apply: 0, prepare: 0, interview: 0 };
export default function DailyTracker({ daily = {} }) {
  const [today, setToday] = useState(localDay);
  useEffect(() => { const id = setInterval(() => setToday(localDay()), 30000); return () => clearInterval(id); }, []);
  const days = [...new Set([today, ...Object.keys(daily)])].sort().reverse();
  return <section className="daily-tracker" aria-label="Daily action tracker"><div className="section-heading flex justify-between items-center gap-3"><h2>Your daily steps</h2><span>Every effort, accounted for.</span></div>
    <div className="tracker-table"><div className="tracker-row tracker-head"><span>DAY</span><span>APPLICATIONS</span><span>PREPARATIONS</span><span>INTERVIEWS</span></div>
    {days.map(day => { const counts = daily[day] || empty; const date = new Date(`${day}T12:00:00`); return <div key={day} className="tracker-row" data-day={day}><span><b>{day === today ? 'Today' : date.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</b><small>{date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</small></span><strong data-count="apply">{counts.apply}</strong><strong data-count="prepare">{counts.prepare}</strong><strong data-count="interview">{counts.interview}</strong></div>; })}</div>
    <p className="tracker-note">Counts follow your local date. Undo restores the last action and its count.</p>
  </section>;
}
