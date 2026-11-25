import './Button.css';

/**
 * Primary action button from Follow the Money.
 * Use `primary` for the one main action on a screen, `ghost` for secondary, `danger` for destructive.
 */
export function Button({ variant = 'primary', size = 'md', fullWidth = false, disabled = false, type = 'button', children, ...rest }) {
  const cls = ['ftm-btn', `ftm-btn--${variant}`, `ftm-btn--${size}`, fullWidth && 'ftm-btn--full'].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
