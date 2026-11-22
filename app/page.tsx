"use client";

import { useEffect, useRef, useState } from "react";
import { dict, LANG_KEY, type Lang } from "../lib/i18n";

const collections = [
  { label: "Tokyo Night", tag: "Neon · cinematic", img: "/campaigns/tokyo-night.jpg", metric: "Live · 4 channels · +18%" },
  { label: "Urban Street", tag: "Raw · expressive", img: "/campaigns/urban-street.jpg", metric: "Planning · 3 creatives A/B" },
  { label: "Quiet Luxury", tag: "Soft · elevated", img: "/campaigns/quiet-luxury.jpg", metric: "Testing · +24% vs benchmark" },
  { label: "Summer Escape", tag: "Sunlit · free", img: "/campaigns/summer-escape.jpg", metric: "Live · localised per store" },
];

const toolsHref = [
  "/studio", "/studio", "/studio", "/studio/dashboard", "/studio/knowledge",
];

const workflowImgs = ["/Demo/Jacket.jpg", "/campaigns/tokyo-night.jpg", "/campaigns/quiet-luxury.jpg"];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={`spin-star ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="currentColor" />
    </svg>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [sent, setSent] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const rootRef = useRef<HTMLElement>(null);
  const t = dict[lang];

  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem(LANG_KEY)) as Lang | null;
    if (saved === "vn" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function switchLang(next: Lang) {
    setLang(next);
    if (typeof window !== "undefined") window.localStorage.setItem(LANG_KEY, next);
  }

  const indexRows = [
    { n: "01", t: t.index.mock, href: "#mock" },
    { n: "02", t: t.index.platform, href: "#platform" },
    { n: "03", t: t.index.ecosystem, href: "#ecosystem" },
    { n: "04", t: t.index.usecases, href: "#usecases" },
    { n: "05", t: t.index.how, href: "#how" },
    { n: "06", t: t.index.collections, href: "#collections" },
    { n: "07", t: t.index.tools, href: "#tools" },
    { n: "08", t: t.index.roadmap, href: "#roadmap" },
    { n: "09", t: t.index.demo, href: "#demo" },
  ];

  return (
    <main className="landing" ref={rootRef} data-lang={lang}>
      <nav className="cover-nav" aria-label="Primary">
        <a className="cover-logo" href="/">
          <svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="currentColor"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#a8bfc9"/></svg>
          NORD STORIA<span className="cover-r">®</span>
        </a>
        <ul>
          <li><a href="#platform">{t.nav.platform}</a></li>
          <li><a href="#mock">{t.nav.studio}</a></li>
          <li><a href="#ecosystem">{t.nav.ecosystem}</a></li>
          <li><a href="#collections">{t.nav.work}</a></li>
          <li><a href="#demo">{t.nav.demo}</a></li>
        </ul>
        <div className="nav-end">
          <div className="lang-switch" role="group" aria-label="Language">
            <button className={lang === "en" ? "lang-btn lang-on" : "lang-btn"} onClick={() => switchLang("en")}>EN</button>
            <button className={lang === "vn" ? "lang-btn lang-on" : "lang-btn"} onClick={() => switchLang("vn")}>VN</button>
          </div>
          <a className="cover-cta" href="/studio">{t.nav.launch}</a>
        </div>
      </nav>

      {/* Cover hero */}
      <header className="cover" id="top">
        <div className="cover-grid">
          <div className="cover-copy">
            <p className="cover-kicker reveal">{t.hero.kicker}</p>
            <h1 className="reveal">
              {t.hero.h1a}<br /><em>{t.hero.h1b}</em>
            </h1>
            <p className="cover-intro reveal">
              {t.hero.intro}<b>{t.hero.introB}</b>{t.hero.introEnd}
            </p>
            <div className="cover-actions reveal">
              <a className="btn solid" href="/studio">{t.hero.cta1}</a>
              <a className="btn ghost" href="#demo">{t.hero.cta2}</a>
            </div>
            <div className="needs reveal">
              <p className="needs-k">{t.hero.needsK}</p>
              <ul>
                {t.tools.items.map((tool) => (
                  <li key={tool.t}>{tool.t}</li>
                ))}
              </ul>
            </div>
          </div>
          <figure className="cover-media reveal">
            <img src="/campaigns/tokyo-night.jpg" alt="Tokyo Night campaign — sculpted jacket under neon city light" />
            <span className="media-badge" aria-hidden="true"><Star /></span>
            <figcaption className="media-caption">
              <span>{t.hero.mediaCaption}</span>
              <i>{t.hero.mediaSub}</i>
            </figcaption>
          </figure>
        </div>
        <div className="cover-meta reveal">
          <div><span>{t.meta.eco}</span>{t.meta.ecoV}</div>
          <div><span>{t.meta.engine}</span>{t.meta.engineV}</div>
          <div><span>{t.meta.studio}</span>{t.meta.studioV}</div>
        </div>
      </header>

      {/* Index */}
      <div className="landing-index reveal" aria-label="Page index">
        {indexRows.map((i) => (
          <a href={i.href} key={i.n}><span className="t">{i.n} — {i.t}</span><span className="n">↗</span></a>
        ))}
      </div>

      {/* Marquee */}
      <div className="brand-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>{t.marquee.repeat(2)}</span>
          ))}
        </div>
      </div>

      {/* App UI simulation */}
      <section className="block" id="mock">
        <div className="label reveal">{t.mock.label}</div>
        <h2 className="sec reveal">{t.mock.h2a}<br /><em>{t.mock.h2b}</em></h2>
        <p className="lead reveal">{t.mock.lead}</p>
        <div className="app-mock reveal" role="img" aria-label="Simulated VyIQ studio interface">
          <div className="mock-chrome" aria-hidden="true">
            <span /><span /><span />
            <em>app.vyiq.studio</em>
          </div>
          <div className="mock-body">
            <div className="mock-sidebar" aria-hidden="true">
              <p className="mock-side-title">{t.mock.workspace}</p>
              {["Product", "Try-On", "Campaign", "Dashboard", "Knowledge"].map((item, i) => (
                <span className={i === 0 ? "mock-nav mock-nav-active" : "mock-nav"} key={item}>{item}</span>
              ))}
              <span className="mock-user">TVQ team</span>
            </div>
            <div className="mock-main" aria-hidden="true">
              <div className="mock-controls">
                <p className="mock-label">{t.mock.product}</p>
                <div className="mock-chips">
                  <span className="mock-chip mock-on">Jacket</span>
                  <span className="mock-chip">Bag</span>
                  <span className="mock-chip">Sneakers</span>
                </div>
                <p className="mock-label">{t.mock.concept}</p>
                <div className="mock-chips">
                  <span className="mock-chip mock-on">Tokyo Night</span>
                  <span className="mock-chip">Urban</span>
                  <span className="mock-chip">Luxury</span>
                </div>
                <p className="mock-label">{t.mock.prompt}</p>
                <p className="mock-prompt">{t.mock.promptV}</p>
                <span className="mock-generate">{t.mock.generate}</span>
              </div>
              <div className="mock-stage">
                <img src="/campaigns/urban-street.jpg" alt="" className="mock-stage-img" />
                <p className="mock-stage-tag">{t.mock.stageTag}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform narrative */}
      <section className="block dark" id="platform">
        <div className="label reveal">{t.platform.label}</div>
        <h2 className="sec reveal">{t.platform.h2a}<br /><em>{t.platform.h2b}</em></h2>
        <p className="lead reveal">{t.platform.lead}</p>
        <div className="story-grid">
          {[
            { k: t.platform.problemK, b: t.platform.problem },
            { k: t.platform.approachK, b: t.platform.approach },
            { k: t.platform.optimK, b: t.platform.optim },
            { k: t.platform.goalK, b: t.platform.goal },
          ].map((col) => (
            <div className="story-col reveal" key={col.k}>
              <p className="story-k">{col.k}</p>
              <p className="story-body">{col.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem across TVQ */}
      <section className="block" id="ecosystem">
        <div className="label reveal">{t.eco.label}</div>
        <h2 className="sec reveal">{t.eco.h2a}<br /><em>{t.eco.h2b}</em></h2>
        <div className="eco-rows reveal">
          {t.eco.pillars.map((p, i) => (
            <article className="eco-row" key={p.name}>
              <span className="eco-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="eco-body">
                <p className="eco-tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="block" id="usecases">
        <div className="label reveal">{t.usecases.label}</div>
        <h2 className="sec reveal">{t.usecases.h2a}<br /><em>{t.usecases.h2b}</em></h2>
        <div className="story-grid">
          {t.usecases.items.map((u) => (
            <div className="story-col reveal" key={u.title}>
              <p className="story-k">{t.usecases.uk}</p>
              <h3 className="story-h">{u.title}</h3>
              <p className="story-body">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="block dark" id="how">
        <div className="label reveal">{t.how.label}</div>
        <h2 className="sec reveal">{t.how.h2a}<br /><em>{t.how.h2b}</em></h2>
        <div className="workflow-grid">
          {t.how.steps.map((s, i) => (
            <article className="workflow-card reveal" key={s.t}>
              <img src={workflowImgs[i]} alt="" loading="lazy" className="workflow-img" />
              <p className="workflow-n">{String(i + 1).padStart(2, "0")}</p>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="block" id="collections">
        <div className="label reveal">{t.collections.label}</div>
        <h2 className="sec reveal">{t.collections.h2a}<br /><em>{t.collections.h2b}</em></h2>
        <div className="visual-grid">
          {collections.map((c) => (
            <article className="visual-card reveal" key={c.label}>
              <img src={c.img} alt={`${c.label} — ${c.tag}`} className="visual-img" loading="lazy" />
              <div className="visual-copy">
                <p className="visual-label">{c.label} — {c.tag}</p>
                <h3 className="visual-title">{c.label}</h3>
                <p className="visual-metric">{c.metric}</p>
                <a className="visual-link" href="/studio">{t.collections.make}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="block" id="tools">
        <div className="label reveal">{t.tools.label}</div>
        <h2 className="sec reveal">{t.tools.h2a}<br /><em>{t.tools.h2b}</em></h2>
        <div className="tools-grid">
          {t.tools.items.map((tool, i) => (
            <a className="tool reveal" key={tool.t} href={toolsHref[i]}>
              <span className="tool-cat">{String(i + 1).padStart(2, "0")} — {t.tools.live}</span>
              <h3>{tool.t}</h3>
              <p>{tool.d}</p>
              <span className="tool-cta">{t.tools.open}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="block" id="metrics">
        <div className="label reveal">{t.metrics.label}</div>
        <h2 className="sec reveal">{t.metrics.h2a}<br /><em>{t.metrics.h2b}</em></h2>
        <div className="gates-grid">
          {t.metrics.cards.map((m) => (
            <div className="gate-card reveal" key={m.v}>
              <p className="gnum">{m.v}</p>
              <h3>{m.t}</h3>
              <p className="who">{m.who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap — features in development */}
      <section className="block dark" id="roadmap">
        <div className="label reveal">{t.roadmap.label}</div>
        <h2 className="sec reveal">{t.roadmap.h2a}<br /><em>{t.roadmap.h2b}</em></h2>
        <p className="lead reveal">{t.roadmap.lead}</p>
        <div className="roadmap-grid">
          {/* A — Campaign Planner */}
          <article className="road-card reveal">
            <div className="road-mock" aria-hidden="true">
              <div className="rm-header"><i>Campaign Planner</i><b>Q1 · 8 weeks</b></div>
              <div className="rm-gantt">
                {[["Creative", 0, 34, "blue"], ["Production", 22, 40, "amber"], ["Media", 55, 45, "glacier"]].map(([n, l, w, c]) => (
                  <div className="rm-row" key={n as string}>
                    <span>{n}</span>
                    <i className={`rm-bar rm-${c}`} style={{ left: `${l}%`, width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <div className="rm-dots"><span /><span /><span className="rm-on" /><span /></div>
            </div>
            <p className="road-badge">{t.roadmap.soon}</p>
            <h3>{t.roadmap.items[0].t}</h3>
            <p className="road-body">{t.roadmap.items[0].d}</p>
          </article>
          {/* B — Insight AI */}
          <article className="road-card reveal">
            <div className="road-mock" aria-hidden="true">
              <div className="rm-header"><i>Insight AI</i><b>+18%</b></div>
              <div className="rm-chart">
                {[42, 58, 49, 71, 66, 88].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} className={i === 5 ? "rm-hot" : ""} />
                ))}
              </div>
              <p className="rm-reco">→ Shift 15% budget: TikTok &gt; Meta</p>
            </div>
            <p className="road-badge">{t.roadmap.beta}</p>
            <h3>{t.roadmap.items[1].t}</h3>
            <p className="road-body">{t.roadmap.items[1].d}</p>
          </article>
          {/* C — Store Compare */}
          <article className="road-card reveal">
            <div className="road-mock" aria-hidden="true">
              <div className="rm-header"><i>Store Compare</i><b>12 stores</b></div>
              <div className="rm-table">
                {[["SG-01", 96], ["HN-03", 84], ["DN-02", 71]].map(([s, v]) => (
                  <div className="rm-tr" key={s as string}>
                    <span>{s}</span>
                    <div className="rm-track"><i style={{ width: `${v}%` }} /></div>
                    <b>+{v}%</b>
                  </div>
                ))}
              </div>
            </div>
            <p className="road-badge">{t.roadmap.soon}</p>
            <h3>{t.roadmap.items[2].t}</h3>
            <p className="road-body">{t.roadmap.items[2].d}</p>
          </article>
          {/* D — Brand Kit */}
          <article className="road-card reveal">
            <div className="road-mock" aria-hidden="true">
              <div className="rm-header"><i>Brand Kit</i><b>4 / 4 rules</b></div>
              <div className="rm-swatches">
                <span style={{ background: "#101012" }} /><span style={{ background: "#2036f5" }} />
                <span style={{ background: "#a8bfc9" }} /><span style={{ background: "#efebe3" }} />
              </div>
              <p className="rm-rule">✓ Palette locked · ✓ Type locked</p>
            </div>
            <p className="road-badge">{t.roadmap.beta}</p>
            <h3>{t.roadmap.items[3].t}</h3>
            <p className="road-body">{t.roadmap.items[3].d}</p>
          </article>
        </div>
      </section>

      {/* Demo signup */}
      <section className="block landing-signup" id="demo">
        <div className="signup-copy">
          <div className="label reveal">{t.demo.label}</div>
          <h2 className="sec reveal">{t.demo.h2a}<br /><em>{t.demo.h2b}</em></h2>
          <p className="lead reveal">{t.demo.lead}</p>
        </div>
        {sent ? (
          <div className="signup-done reveal" role="status">
            <p className="signup-done-title">{t.demo.done}</p>
            <p>{t.demo.doneBody}</p>
          </div>
        ) : (
          <form className="signup-form reveal" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label>
              {t.demo.name}
              <input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder={t.demo.namePh} autoComplete="name" />
            </label>
            <label>
              {t.demo.email}
              <input required type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="an@company.com" autoComplete="email" />
            </label>
            <label>
              {t.demo.company}
              <input value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} placeholder={t.demo.companyPh} autoComplete="organization" />
            </label>
            <button type="submit" className="btn solid">{t.demo.submit}</button>
            <p className="signup-fine">{t.demo.fine}<a href="/studio">/studio</a></p>
          </form>
        )}
      </section>

      <section className="tagline-band tagline-band--light" aria-label="Tagline">
        <p className="tagline-big">{t.tagline.vn} <span>{t.tagline.vn2}</span></p>
        <p className="tagline-en">{t.tagline.en}</p>
      </section>

      <footer className="cover-footer">
        <a className="big-mail" href="mailto:hello@nordstoria.com">{t.footer.mail}</a>
        <div className="footer-meta">
          <span>{t.footer.copy}</span>
          <span>{t.footer.flow}</span>
        </div>
      </footer>
    </main>
  );
}
