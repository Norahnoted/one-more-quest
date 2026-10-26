export default function Feedback({ message, warning, tone }) {
  return <><p className={`feedback ${tone === 'heartbreak' ? 'feedback-heartbreak' : ''}`} role="status" aria-live="polite"><span aria-hidden="true">{tone === 'heartbreak' ? '☁' : '✦'}</span> {message}</p>{warning && <p className="save-warning" role="alert">{warning}</p>}</>;
}

export function RewardCard({ boss, dismiss }) {
  if (!boss) return null;
  return <section className="reward-card" aria-label="Interview reward" role="status"><div><p className="eyebrow">INTERVIEW COMPLETE</p><h2>You showed up.</h2><p>+30 XP · {boss.weapon}</p><p>{boss.name} joined your desk collection.</p></div><button className="text-button" onClick={dismiss}>Got it</button></section>;
}
