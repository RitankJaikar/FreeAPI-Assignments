import React from "react";

export const CardArticle = ({
  title,
  subtitle,
  description,
  metadata,
  children,
  image,
  isClickable = false,
  clickHref,
  icon: Icon,
}) => {
  const containerClasses =
    isClickable && clickHref
      ? "cursor-pointer group relative overflow-hidden"
      : "overflow-hidden";

  const innerContent = (
    <>
      {image && (
        <div
          className={`relative h-56 w-full overflow-hidden ${isClickable && clickHref ? "group-hover:scale-105 transition-transform duration-300" : ""}`}
        >
          <img className="h-full w-full object-cover" src={image} alt={title} />
          {isClickable && clickHref && Icon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
              <div className="scale-0 group-hover:scale-100 transition-transform duration-300">
                {Icon}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>

        {description && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Description
            </p>
            <p className="line-clamp-5 whitespace-pre-line text-sm leading-6 text-slate-200">
              {description}
            </p>
          </div>
        )}

        {metadata && (
          <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
            {metadata.map((item, idx) => (
              <p key={idx}>
                <strong>{item.label}:</strong> {item.value}
              </p>
            ))}
          </div>
        )}

        {children}
      </div>
    </>
  );

  if (isClickable && clickHref) {
    return (
      <a
        href={clickHref}
        target="_blank"
        rel="noreferrer"
        className={`${containerClasses} rounded-3xl border border-zinc-800 bg-zinc-950/80 shadow-[0_20px_100px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 block`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <article
      className={`${containerClasses} rounded-3xl border border-zinc-800 bg-zinc-950/80 shadow-[0_20px_100px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5`}
    >
      {innerContent}
    </article>
  );
};
