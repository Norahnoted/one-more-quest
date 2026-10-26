import { weaponName } from '../catalog.js';
export default function WeaponPanel({ progress, effect }) {
  const blade = { starter: '#c9b18f', eraser: '#d9a1bc', stapler: '#91b4a6', sharpener: '#e9bd72' }[progress.weaponId];
  return <section className={`weapon-panel flex items-center gap-5 ${effect?.type === 'prepare' ? 'weapon-flash' : ''}`} aria-label="Weapon equipment">
    <div className="weapon-slot" aria-hidden="true"><svg viewBox="0 0 32 32" shapeRendering="crispEdges"><path d="M23 2h7v7L13 26l-7-7z" fill={blade}/><path d="M23 2h7L10 22l-4-3z" fill="#f6faf9"/><path d="M8 17l7 7-3 3-7-7z" fill="#bb7a7b"/><path d="M5 22l5 5-5 5H0v-5z" fill="#9c7559"/></svg></div>
    <div className="grow"><p className="eyebrow">YOUR WEAPON</p><h2>{weaponName(progress.weaponId)}</h2><p className="weapon-help">Prepare to strengthen it. Interviews bring new weapons.</p></div>
    <div className="weapon-strength"><b data-testid="reinforcement">+{progress.reinforcement}</b><span>REINFORCEMENT</span></div>
  </section>;
}
