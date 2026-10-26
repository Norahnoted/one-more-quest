import { useEffect, useRef } from 'react';
export default function OfferCelebration({ open, close }) {
  const dialog=useRef(null);
  useEffect(()=>{
    if(!open) return;
    const previous=document.activeElement;
    const element=dialog.current;
    element.showModal();
    return ()=>{element.close();if(previous instanceof HTMLElement)previous.focus();};
  },[open]);
  return <dialog className="offer-dialog" ref={dialog} aria-labelledby="offer-title" onCancel={event=>{event.preventDefault();close();}}>
    <div className="offer-confetti" aria-hidden="true">{Array.from({length:32},(_,i)=><i key={i} style={{'--x':`${(i*37)%100}%`,'--delay':`${(i%8)*.11}s`,'--turn':`${i*47}deg`,'--drift':`${(i%5-2)*30}px`,'--piece': ['#d9ae38','#e98185','#8dac60','#90b9ac'][i%4]}}/>)}</div>
    <div className="offer-content"><p className="eyebrow">LOOK HOW FAR YOU CAME</p><div className="offer-envelope" aria-hidden="true"><svg viewBox="0 0 96 90"><path d="M12 29h72v49H12z" fill="#e9c56b"/><path d="m12 29 36 26 36-26" fill="#ffedb1"/><path d="m12 78 27-24m45 24L57 54" fill="none" stroke="#d1a849" strokeWidth="2"/><g className="offer-letter"><rect x="25" y="7" width="46" height="48" rx="3" fill="#fffdf2"/><path d="m37 28 8 8 15-17" fill="none" stroke="#80a250" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="M35 43h27" stroke="#d8dfc1" strokeWidth="3"/></g><path d="m12 29 36 26 36-26v49H12z" fill="#edcc78"/><path d="m12 29 36 26 36-26M12 78l26-24m46 24L58 54" fill="none" stroke="#d8b25a" strokeWidth="2"/></svg><span>✦</span></div>
    <h2 id="offer-title">You gooooot<br/>the offer!</h2><p className="offer-copy">Every little step brought you here.<br/>This moment is yours. Let it sink in.</p><button className="offer-close" onClick={close} autoFocus>I did it! ✧</button><p className="offer-footnote">Your journey and everything you earned stay with you.</p></div>
  </dialog>;
}
