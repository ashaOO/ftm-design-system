import './GlassCard.css';

/**
 * Frosted glass panel used for every briefing, question and result in the game.
 * `tone="flag"` adds a coral top edge for red-flag moments.
 */
export function GlassCard({ eyebrow, title, tone = 'default', width = 'md', actions, children, as: Tag = 'section', ...rest }) {
  const cls = ['ftm-card', `ftm-card--${tone}`, `ftm-card--${width}`].join(' ');
  return (
    <Tag className={cls} {...rest}>
      {eyebrow && <span className="ftm-card__eyebrow">{eyebrow}</span>}
      {title && <h2 className="ftm-card__title">{title}</h2>}
      {children && <div className="ftm-card__body">{children}</div>}
      {actions && <div className="ftm-card__actions">{actions}</div>}
    </Tag>
  );
}
