import { useEffect, useRef, useState } from 'react';
export default function ReflectionDialog({ open, close, begin }) {
  const dialog = useRef(null);
  const [direction, setDirection] = useState(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    setDirection(null);
    const element = dialog.current;
    element.showModal();
    return () => {
      element.close();
      if (previousFocus instanceof HTMLElement && !previousFocus.matches(':disabled')) previousFocus.focus();
      else document.querySelector('.action:not(:disabled)')?.focus();
    };
  }, [open]);
  return <dialog ref={dialog} className="reflection-dialog" aria-labelledby="reflection-title" aria-describedby="reflection-description" onCancel={event=>{event.preventDefault();close();}}>
    <div className="reflection-content"><p className="eyebrow">A PAUSE, NOT A GAME OVER</p><div className="reflection-hearts" aria-hidden="true">♡ ♡ ♡</div><h2 id="reflection-title">What comes next is yours.</h2><p id="reflection-description">Three hard moments. And still, everything you learned and every step you took belong to you.</p><p>You do not have to decide your next chapter today.</p>
    <div className="reflection-options"><button onClick={()=>begin('retry')}>Try another run<span>I have the courage to begin again.</span></button><button onClick={()=>setDirection('different')}>Explore a different direction<span>Another path can be an adventure, too.</span></button></div>
    {direction === 'different' && <div className="direction-note" role="status"><h3>A new direction.</h3><p>Nothing you learned is lost. Keep your level, weapons, keepsakes, and daily steps. Begin with three hearts again.</p><button className="begin-chapter" onClick={()=>begin('different')}>Begin a new chapter</button></div>}
    <button className="reflection-close" onClick={close} autoFocus>For now, back to my desk</button><p className="reflection-footnote">Both paths restore three hearts and keep your progress. You can also return to your desk and decide later.</p></div>
  </dialog>;
}
