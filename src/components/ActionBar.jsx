export default function ActionBar({ act, blocked, canUndo }) {
  return <><div className="actions grid grid-cols-1 sm:grid-cols-3 gap-3">
    <button className="action" onClick={()=>act('apply')} disabled={blocked}><span className="action-icon" aria-hidden="true">↗</span><span><strong>Apply</strong><small>Knock on a new door</small></span><span className="action-value">+10 XP</span></button>
    <button className="action" onClick={()=>act('prepare')} disabled={blocked}><span className="action-icon" aria-hidden="true">✧</span><span><strong>Prepare</strong><small>Sharpen your courage</small></span><span className="action-value">+1 ATK</span></button>
    <button className="action upcoming" disabled title="Coming in the next build step"><span className="action-icon" aria-hidden="true">⚑</span><span><strong>Interview</strong><small>Face a stationery boss</small></span><span className="action-value">SOON</span></button>
  </div><div className="utility-row flex flex-wrap justify-between items-center gap-4"><button disabled className="text-button" title="Coming in the final build step">♡ Mark a heartbreak <span className="tiny">· soon</span></button><button className="text-button" disabled={!canUndo || blocked} onClick={()=>act('undo')}>↶ Undo last action</button></div></>;
}
