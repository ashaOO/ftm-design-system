import './ProgressBar.css';

/**
 * Progress through loading, the film or a zone. Always give it a visible or aria label.
 */
export function ProgressBar({ value = 0, max = 100, label, showValue = false, size = 'md' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`ftm-progress ftm-progress--${size}`}>
      {(label || showValue) && (
        <div className="ftm-progress__meta">
          {label && <span>{label}</span>}
          {showValue && <span className="ftm-progress__value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className="ftm-progress__track"
        role="progressbar"
        aria-label={label || 'Progress'}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <b style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
