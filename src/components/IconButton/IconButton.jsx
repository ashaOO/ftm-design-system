import './IconButton.css';

const ICONS = {
  sound: <path d="M4 10v4h4l5 4V6L8 10H4zm12.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />,
  mute: <path d="M4 10v4h4l5 4V6L8 10H4zm11.3-1.7L14 9.6 16.4 12 14 14.4l1.3 1.3 2.4-2.4 2.4 2.4 1.3-1.3-2.4-2.4 2.4-2.4-1.3-1.3-2.4 2.4z" />,
  menu: <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />,
  close: <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" />,
};

/** Round glass icon button for the HUD (sound, menu). `label` is required: it is the only text a screen reader gets. */
export function IconButton({ icon = 'menu', label, pressed, ...rest }) {
  if (!label) throw new Error('IconButton needs a `label` for screen readers.');
  return (
    <button type="button" className="ftm-ibtn" aria-label={label} aria-pressed={pressed} {...rest}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">{ICONS[icon]}</svg>
    </button>
  );
}
