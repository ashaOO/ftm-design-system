import './DecisionButton.css';

const LABELS = { approve: 'Approve', flag: 'Flag', freeze: 'Freeze' };
const STATE_TEXT = { selected: 'selected', correct: 'correct answer', wrong: 'not the right call' };

/**
 * The three compliance decisions used at the Showroom deal desk.
 * Colour is never the only signal: every state also changes the label or an icon.
 */
export function DecisionButton({ decision = 'approve', state = 'idle', shortcut, disabled = false, onClick, ...rest }) {
  const label = LABELS[decision];
  const stateText = STATE_TEXT[state];
  const cls = ['ftm-decision', `ftm-decision--${decision}`, state !== 'idle' && `is-${state}`].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      aria-pressed={state === 'selected' || state === 'correct' || state === 'wrong'}
      aria-label={stateText ? `${label}, ${stateText}` : label}
      aria-keyshortcuts={shortcut}
      data-key={shortcut && state === 'idle' ? shortcut : undefined}
      onClick={onClick}
      {...rest}
    >
      <span className="ftm-decision__swatch" aria-hidden="true" />
      <span className="ftm-decision__label">{label}</span>
      {state === 'correct' && <span className="ftm-decision__mark" aria-hidden="true">✓</span>}
      {state === 'wrong' && <span className="ftm-decision__mark" aria-hidden="true">✕</span>}
    </button>
  );
}

/** Group of all three decisions, in the fixed order learners see in the game. */
export function DecisionGroup({ value, result, onChange, disabled = false, showShortcuts = true }) {
  const order = ['approve', 'flag', 'freeze'];
  return (
    <div className="ftm-decision-group" role="group" aria-label="Your decision">
      {order.map((d, i) => {
        let state = 'idle';
        if (result && d === result.correct) state = 'correct';
        else if (result && d === value) state = 'wrong';
        else if (d === value) state = 'selected';
        return (
          <DecisionButton
            key={d}
            decision={d}
            state={state}
            shortcut={showShortcuts ? String(i + 1) : undefined}
            disabled={disabled || Boolean(result)}
            onClick={() => onChange && onChange(d)}
          />
        );
      })}
    </div>
  );
}
