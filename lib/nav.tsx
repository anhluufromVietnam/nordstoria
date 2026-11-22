export const studioNav = [
  { href: "/studio", label: "Studio" },
  { href: "/studio/dashboard", label: "Dashboard" },
  { href: "/studio/campaigns", label: "Campaigns" },
  { href: "/studio/brands", label: "Brands" },
  { href: "/studio/insights", label: "Insights" },
  { href: "/studio/knowledge", label: "Knowledge" },
  { href: "/studio/assets", label: "Assets" },
  { href: "/", label: "← Landing" },
];

export function CoverHeader({ active }: { active?: string }) {
  return (
    <nav className="cover-nav" aria-label="Studio">
      <a className="cover-logo" href="/">
        <svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="currentColor"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#a8bfc9"/></svg>
        NORD STORIA<span className="cover-r">®</span>
      </a>
      <ul>
        {studioNav.map((n) => (
          <li key={n.href}>
            <a href={n.href} style={active === n.href ? { textDecoration: "underline", textUnderlineOffset: 5 } : undefined}>{n.label}</a>
          </li>
        ))}
      </ul>
      <a className="cover-cta" href="/studio">Launch Studio →</a>
    </nav>
  );
}
