import { levelOf } from '../game.js';
export default function ProgressPanel({ progress }) {
  return <section className="progress-panel flex flex-wrap items-center justify-between gap-5" aria-label="Adventurer progress">
    <div className="level-group flex items-center gap-4"><div className="level-seal"><span>LV.</span><strong data-testid="level">{levelOf(progress.totalXp)}</strong></div><div><p className="eyebrow">A WORK IN PROGRESS</p><div className="xp-caption flex justify-between gap-8"><span>Little adventurer</span><span data-testid="xp">{progress.totalXp % 100} / 100 XP</span></div><div className="xp-track" role="progressbar" aria-label="Experience to next level" aria-valuenow={progress.totalXp % 100} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${progress.totalXp % 100}%` }} /></div></div></div>
    <div className="hearts-group"><div className="flex gap-2 justify-end" aria-label={`${progress.hearts} of 3 hearts`}>{[0,1,2].map(i=><svg key={i} className={i < progress.hearts ? 'heart filled' : 'heart'} viewBox="0 0 16 14" aria-hidden="true"><path d="M2 0h4v2h4V0h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2V8H0V2h2z" /></svg>)}</div><p className="tiny mt-2">Courage, on your own terms.</p></div>

  </section>;
}
