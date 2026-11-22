import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — VyIQ Studio",
  description: "Studio settings: API, models and team.",
};

import { CoverHeader } from "@/lib/nav";

export default function SettingsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="landing-section">
        <p className="landing-kicker">Settings</p>
        <h2>Studio <em>configuration.</em></h2>
        <div className="app-grid">
          <article className="app-card"><h3>Image model</h3><p>muse-image-1.0 via Meta Model API (MODEL_API_KEY). Override with MUSE_IMAGE_MODEL.</p></article>
          <article className="app-card"><h3>Text model</h3><p>muse-spark-1.3 for captions and insights. Override with MUSE_TEXT_MODEL.</p></article>
          <article className="app-card"><h3>Backend</h3><p>FastAPI on :8001 (TryON/main.py). Next.js proxies via BACKEND_URL.</p></article>
          <article className="app-card"><h3>Team</h3><p>Internal teams, external agencies, regional branches and retail stores — managed per campaign.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
