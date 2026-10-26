import AdventurerAvatar from './AdventurerAvatar.jsx';
import { levelOf } from '../game.js';
export default function ProgressPanel({ progress, effect }) {
  return <section className="progress-panel" aria-label="Adventurer progress">
    <div className="adventurer-identity"><div className="avatar-tile" aria-hidden="true"><AdventurerAvatar/></div><div><h2>Adventurer</h2><p>Level <span data-testid="level">{levelOf(progress.totalXp)}</span> · Little beginnings</p></div></div>
    <div className="adventurer-xp"><div className="xp-caption"><strong data-testid="xp">{progress.totalXp % 100} / 100 XP</strong><span data-testid="total-xp">{progress.totalXp} total XP</span></div><div className="xp-track" role="progressbar" aria-label="Experience to next level" aria-valuenow={progress.totalXp % 100} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${progress.totalXp % 100}%` }} /></div></div>
    <div className="hearts-group"><div className="heart-icons" aria-label={`${progress.hearts} of 3 hearts`}>{[0,1,2].map(i=><svg key={i} className={`${i < progress.hearts ? 'heart filled' : 'heart'} ${effect?.type === 'heartbreak' && i === progress.hearts ? 'heart-just-lost' : ''}`} viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21 2 11C-4 3 5-4 12 4 19-4 28 3 22 11Z" /></svg>)}</div><p className="tiny">Courage, on your own terms.</p></div>
  </section>;
}
