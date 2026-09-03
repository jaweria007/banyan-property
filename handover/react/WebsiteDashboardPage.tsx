'use client';

/*
 * WebsiteDashboardPage
 * Copy to: app/(app)/reporting/website/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function WebsiteDashboardPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Website Dashboard</h1>
                  <p className="page-subtitle">PostHog analytics — page load speeds, event triggers and keyword-ranking insights.</p>
                </div>
                <div className="page-head__actions">
                  <a href="#" className="btn btn-ghost" id="wdOpenPosthog" target="_blank" rel="noopener">Open in PostHog ↗</a>
                  <button type="button" className="btn btn-primary" id="wdConfigure">Configure</button>
                </div>
              </section>

              {/* Connected: the embedded dashboard. Not connected: the empty state below. */}
              <section className="card op-block wd-embed" id="wdEmbed" hidden>
                <div className="wd-frame">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></svg>
                  <span>PostHog dashboard renders here</span>
                  <code id="wdUrlLabel">—</code>
                </div>
              </section>

              <section className="card op-block wd-empty" id="wdEmpty">
                <h2 className="section-title">Connect PostHog</h2>
                <p className="sb-hint">
                  PostHog houses the website analytics. Paste a shared dashboard URL below to embed it here —
                  in PostHog, open the dashboard and choose <strong>Share → Share publicly</strong> first.
                </p>
                <h3 className="sb-h4">PostHog configuration</h3>
                <div className="drawer-row drawer-row--2">
                  <label className="field">
                    <span className="field__label">Shared dashboard URL <span className="field-hint">(embedded above)</span></span>
                    <input type="url" className="input-field" id="wdShared" placeholder="https://eu.posthog.com/shared/…" />
                  </label>
                  <label className="field">
                    <span className="field__label">Project URL <span className="field-hint">(deep-link out, optional)</span></span>
                    <input type="url" className="input-field" id="wdProject" placeholder="https://eu.posthog.com/project/12345" />
                  </label>
                </div>
                <div className="rd-noterow">
                  <button type="button" className="btn btn-primary" id="wdSave">Save PostHog settings</button>
                </div>
              </section>

              <section className="op-block">
                <h2 className="section-title">What lives here</h2>
                <p className="sb-hint">Moved out of Blog &amp; SEO — website analytics belongs with the other dashboards, not with content.</p>
                <div className="rp-soon">
                  <article className="rp-sooncard"><div className="rp-sooncard__head"><h3>Traffic</h3></div><p>Sessions, sources and landing pages</p></article>
                  <article className="rp-sooncard"><div className="rp-sooncard__head"><h3>Performance</h3></div><p>Page load speed and Core Web Vitals</p></article>
                  <article className="rp-sooncard"><div className="rp-sooncard__head"><h3>Events</h3></div><p>Enquiries, saved searches and shortlist opens</p></article>
                  <article className="rp-sooncard"><div className="rp-sooncard__head"><h3>Keywords</h3></div><p>Ranking movement for the pages that matter</p></article>
                </div>
              </section>




    </>
  );
}
