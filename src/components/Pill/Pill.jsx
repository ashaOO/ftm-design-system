import './Pill.css';

/**
 * Small status label: zone names, "Red flag", "N officers online", scores.
 * Set `live` to show the pulsing online dot. Keep text to 1 to 3 words.
 */
export function Pill({ tone = 'neutral', live = false, children, ...rest }) {
  return (
    <span className={`ftm-pill ftm-pill--${tone}`} {...rest}>
      {live && <span className="ftm-pill__live" aria-hidden="true" />}
      {children}
    </span>
  );
}
