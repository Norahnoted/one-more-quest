import Stationery from './Stationery.jsx';
import { CATALOG } from '../catalog.js';
const pixels = [
'....hhhhhh......','...hhhhhhhh.....','..hhhhhhhrrh....','..hhssssehh.....','..hhssssshhh....','..hhhssshhhh....','..hhgggggghh....','...gggggggg.....','...sggggggs.....','...sggggggs.....','....gggggg......','...gggggggg.....','...gggggggg.....','....ll..ll......','....ll..ll......','...bbb..bbb.....',
];
const colors = { h:'#574034',s:'#ebc3a3',e:'#423c32',r:'#c28b92',g:'#8eaa81',l:'#e6d8bd',b:'#685144' };
export function Character({ weaponId = 'starter', avatar = false }) { return <svg viewBox="0 0 16 16" className={avatar ? 'avatar-sprite' : 'character-sprite'} aria-hidden="true" shapeRendering="crispEdges">{pixels.flatMap((row,y)=>[...row].map((p,x)=>colors[p] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[p]}/> : null))}<rect x="14" y="7" width="1" height="7" fill={{starter:'#a7774f',eraser:'#ce87a5',stapler:'#7d9d8e',sharpener:'#cba15b'}[weaponId]}/><rect x="12" y="10" width="4" height="1" fill="#65523b"/></svg>; }
function TreasureChest({ open, boss }) {
  return <div className={`treasure-reveal ${open ? 'chest-is-open' : ''}`} role="status" aria-label={open ? `Treasure chest opened: ${boss.weapon}` : 'A treasure chest appears'}>
    <div className="treasure-rays" aria-hidden="true">✧ ✦ ✧</div>
    <svg viewBox="0 0 72 66" className="treasure-chest" aria-hidden="true" shapeRendering="crispEdges">
      <g className="chest-loot"><path d="M42 0h5v6L31 24l-5-5z" fill="#d6debb"/><path d="M25 17l9 9-3 3-9-9z" fill="#c4a052"/><path d="M23 23l5 5-6 7-5-5z" fill="#87734d"/></g>
      <g className="chest-lid"><path d="M10 31V20h6v-5h40v5h6v11z" fill="#ae7e48"/><path d="M16 19h40v5H16z" fill="#d2a565"/><path d="M14 18h5v13h-5zm39 0h5v13h-5z" fill="#e1c078"/><path d="M10 29h52v5H10z" fill="#715638"/></g>
      <path d="M10 33h52v26H10z" fill="#aa7846"/><path d="M14 37h44v17H14z" fill="#bd8d51"/><path d="M10 33h6v26h-6zm46 0h6v26h-6zM10 55h52v5H10z" fill="#ddbe77"/><path d="M31 30h11v15H31z" fill="#efd088"/><path d="M35 35h3v6h-3z" fill="#795d3d"/>
    </svg>
    <p>{open ? boss.weapon : 'A little treasure for showing up…'}</p>
  </div>;
}
export default function DeskScene({ effect, encounter, collection = {}, weaponId = 'starter' }) {
  return <section className={`desk-scene ${encounter ? `in-battle phase-${encounter.phase}` : ''}`} aria-label="A pixel adventurer wandering on a quiet Japanese-inspired desk">
    <div className="scene-heading"><span className="scene-dot"/> YOUR LITTLE CORNER OF THE WORLD</div>
    <svg className="room-art" viewBox="0 0 960 410" preserveAspectRatio="xMidYMid slice" aria-hidden="true" shapeRendering="crispEdges">
      <defs><pattern id="wood" width="180" height="42" patternUnits="userSpaceOnUse"><rect width="180" height="42" fill="#d4b98e"/><path d="M0 41h180M18 13h42m48 13h55M3 30h31" stroke="#c5a779" strokeWidth="2"/><path d="M80 0v42" stroke="#c7ac81"/></pattern></defs>
      <rect width="960" height="410" fill="#e5dfcc"/><rect x="50" y="20" width="220" height="145" fill="#aa9c7e"/><rect x="58" y="28" width="204" height="129" fill="#d2ddc9"/><rect x="66" y="36" width="188" height="113" fill="#c5d3bb"/><path d="M66 110h188v39H66z" fill="#b0c2a2"/><path d="M66 135l43-45 40 45 30-25 35 39H66" fill="#9fb38e"/><path d="M155 28v129M58 92h204" stroke="#aa9c7e" strokeWidth="8"/><rect x="40" y="159" width="240" height="10" fill="#9c8e72"/>
      <rect x="714" y="66" width="142" height="93" fill="#c1b599"/><rect x="721" y="73" width="128" height="79" fill="#f3eddc"/><path d="M739 91h47m-47 14h89m-89 14h69m-69 14h43" stroke="#c7c2ab" strokeWidth="3"/><rect x="777" y="62" width="28" height="13" fill="#b7a97b"/>
      <path d="M0 200h960v210H0z" fill="url(#wood)"/><path d="M0 200h960" stroke="#9a7c55" strokeWidth="6"/><path d="M0 393h960v17H0z" fill="#b09164"/><path d="M0 393h960" stroke="#9b7c51" strokeWidth="4"/>
      <path d="M65 186h55v15H65z" fill="#8b9171"/><path d="M75 164h35v22H75z" fill="#a1a484"/><path d="M86 111h12v53H86zM74 121h12v30H74zM98 125h13v27H98zM65 113h12v16H65zM107 114h12v17h-12z" fill="#6f855c"/>
      <path d="M308 189h94v11h-94z" fill="#9a7259"/><path d="M315 177h87v12h-87z" fill="#eee5cf"/><path d="M309 164h89v13h-89z" fill="#83927d"/><path d="M315 168h77" stroke="#aab29b" strokeWidth="3"/>
      <path d="M850 170h58v51h-58z" fill="#b39772"/><path d="M860 140h5v53h-5z" fill="#57685b"/><path d="M876 131h6v64h-6z" fill="#a3654e"/><path d="M893 144h5v49h-5z" fill="#dbbd78"/>
      <path d="M89 270h108v63H89z" fill="#ad926c"/><path d="M85 265h108v63H85z" fill="#f0ead9"/><path d="M95 278h70m-70 12h84m-84 12h53" stroke="#cbc4ac" strokeWidth="3"/><path d="M85 265v63" stroke="#7f927a" strokeWidth="6"/>
      <path d="M764 274h45v33h-45z" fill="#efe9d7"/><path d="M809 280h13v18h-13" fill="none" stroke="#efe9d7" strokeWidth="5"/><path d="M770 275h33v5h-33z" fill="#7d6750"/><rect x="756" y="310" width="65" height="5" fill="#b39975"/>
      <path d="M424 354h123v5H424z" fill="#b69b73"/><rect x="425" y="349" width="108" height="5" fill="#dfbd77"/><path d="M533 349h13v5h-13z" fill="#5b6557"/>
    </svg>
    {effect?.type === 'heartbreak' && <div key={effect.id} className="heartbreak-effect" role="status"><div className="broken-heart" aria-hidden="true"><span>♥</span><span>♥</span></div><p>A hard moment. Your progress stays.</p></div>}
    {effect && effect.type !== 'heartbreak' && <div key={effect.id} className={`scene-reward effect-${effect.type}`} role="status">{effect.type === 'level' ? `Level Up! · Level ${effect.level}` : effect.type === 'apply' ? '+10 XP' : effect.type === 'interview' ? 'Interview complete! +30 XP' : effect.type === 'chapter' ? 'A new chapter. Three hearts restored.' : 'Weapon reinforced +1'}</div>}
    <div className={`character-wander ${effect?.type === 'level' ? 'level-up' : ''}`}><div className="character-bob"><Character weaponId={weaponId}/></div><div className="character-shadow"/></div>
    {encounter && <><div className="boss-label">{['stars','chest','open'].includes(encounter.phase) ? 'YOU SHOWED UP.' : encounter.boss.name.toUpperCase()}</div>{['approach','strike','stars'].includes(encounter.phase) && <div className={`boss-sprite boss-${encounter.phase}`}><Stationery id={encounter.boss.id}/></div>}{['chest','open'].includes(encounter.phase) && <TreasureChest boss={encounter.boss} open={encounter.phase === 'open'}/>}{encounter.phase === 'stars' && <div className="battle-stars" aria-hidden="true">✦ · ✧ · ✦</div>}</>}
    <div className="desk-collectibles" aria-hidden="true">{CATALOG.filter(b=>collection[b.id]).map(b=><div className="desk-collectible" key={b.id}><Stationery id={b.id}/><span>×{collection[b.id]}</span></div>)}</div>
  </section>;
}
