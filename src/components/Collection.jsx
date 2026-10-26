import { CATALOG } from '../catalog.js';
import Stationery from './Stationery.jsx';
export default function Collection({ collection }) {
  const discovered = CATALOG.filter(boss=>collection[boss.id]);
  return <section className="collection-section"><div className="flex justify-between items-center gap-4"><p className="eyebrow">DESK KEEPSAKES</p><span className="collection-count">{discovered.length} / {CATALOG.length} DISCOVERED</span></div>
    {!discovered.length ? <p className="collection-empty">Your first interview will leave a little keepsake here.</p> : <div className="keepsake-grid grid grid-cols-1 sm:grid-cols-3 gap-3">{discovered.map(boss=><div className="keepsake-item flex items-center gap-3" key={boss.id}><Stationery id={boss.id}/><div><b>{boss.name}</b><span>Collected ×{collection[boss.id]}</span></div></div>)}</div>}
  </section>;
}
