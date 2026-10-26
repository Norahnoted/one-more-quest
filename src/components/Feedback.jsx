export default function Feedback({ message, warning }) {
  return <><p className="feedback" role="status" aria-live="polite"><span aria-hidden="true">✦</span> {message}</p>{warning && <p className="save-warning" role="alert">{warning}</p>}</>;
}
