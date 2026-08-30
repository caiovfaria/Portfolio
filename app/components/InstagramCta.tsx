import { hasInstagramUrl, INSTAGRAM_URL } from "../contact";

type InstagramCtaProps = {
  className?: string;
  label?: string;
  pendingLabel?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle className="instagram-icon-dot" cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

export default function InstagramCta({
  className = "",
  label = "Ver Instagram",
  pendingLabel = "Instagram em breve",
}: InstagramCtaProps) {
  const classes = `instagram-cta ${className}`.trim();
  const content = <><InstagramIcon /><span>{hasInstagramUrl ? label : pendingLabel}</span></>;

  if (hasInstagramUrl) {
    return <a className={classes} href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{content}</a>;
  }

  return (
    <span
      className={`${classes} instagram-pending`}
      role="link"
      aria-disabled="true"
      title="O perfil profissional será conectado em breve"
    >
      {content}
    </span>
  );
}
