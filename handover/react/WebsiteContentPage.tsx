'use client';

/*
 * WebsiteContentPage
 * Copy to: app/(app)/website-content/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function WebsiteContentPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Website Content</h1>
                  <p className="page-subtitle">Everything the public website reads from — navigation, page content and search settings, in one place.</p>
                </div>
                <div className="page-head__actions">
                  <a href="https://banyan.properties" target="_blank" rel="noopener" className="btn btn-ghost">View website ↗</a>
                </div>
              </section>

              {/* Site Content came from Site Settings, SEO came from Blog & SEO */}
              <nav className="op-tabs" role="tablist" aria-label="Website settings sections">
                <button type="button" className="op-tab is-active" role="tab" aria-selected="true" data-wstab="navigation">Navigation</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-wstab="content">Site Content</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-wstab="seo">SEO</button>
              </nav>

              {/* ============ NAVIGATION ============ */}
              <section className="op-panel" id="wsNavigation" role="tabpanel">
                <div className="work-bar">
                  <label className="search-field search-field--wide">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input type="search" id="wsNavSearch" placeholder="Search label or slug…" aria-label="Search navigation items" />
                  </label>
                  <div className="work-filters">
                    <label className="select-wrap">
                      <span className="sr-only">Filter by category</span>
                      <select className="select-field" id="wsNavCategory">
                        <option defaultValue="all">All categories</option>
                        <option defaultValue="Top Main Nav">Top Main Nav</option>
                        <option defaultValue="Top Left Nav">Top Left Nav</option>
                        <option defaultValue="Top Right Nav">Top Right Nav</option>
                        <option defaultValue="Rent">Rent</option>
                        <option defaultValue="Buy">Buy</option>
                        <option defaultValue="Land">Land</option>
                        <option defaultValue="Commercial">Commercial</option>
                        <option defaultValue="Footer">Footer</option>
                      </select>
                    </label>
                    <button type="button" className="btn btn-primary" id="wsNavAdd">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                      Add nav item
                    </button>
                  </div>
                </div>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Navigation items <span className="page-count" id="wsNavCount">0</span></h2>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th scope="col" className="th-sort" data-sort="category">Category</th>
                          <th scope="col" className="th-sort" data-sort="type">Type</th>
                          <th scope="col" className="th-sort is-asc" data-sort="primary">Primary</th>
                          <th scope="col" className="th-sort" data-sort="secondary">Secondary</th>
                          <th scope="col">Slug</th>
                          <th scope="col" className="th-sort" data-sort="sort">Sort</th>
                          <th scope="col" className="th-edit">Edit</th>
                        </tr>
                      </thead>
                      <tbody id="wsNavBody"></tbody>
                    </table>
                  </div>
                  <p className="list-empty" id="wsNavEmpty" hidden>No navigation items match your filters.</p>
                </section>
              </section>

              {/* ============ SITE CONTENT ============ */}
              <section className="op-panel" id="wsContent" role="tabpanel" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Price sliders</h2>
                      <p className="sb-hint">The min and max on each search slider on the public website.</p>
                    </div>
                    <button type="button" className="btn btn-primary" id="wsSaveSliders">Save price sliders</button>
                  </div>
                  <div className="ws-sliders" id="wsSliders"></div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Site text</h2>
                      <p className="sb-hint">Copy blocks the website renders. Grouped by the page they appear on.</p>
                    </div>
                    <label className="search-field">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                      <input type="search" id="wsTextSearch" placeholder="Find a text block…" aria-label="Search site text" />
                    </label>
                  </div>
                  <div id="wsTextGroups"></div>
                  <p className="list-empty" id="wsTextEmpty" hidden>No text blocks match that search.</p>
                  <div className="rd-noterow">
                    <button type="button" className="btn btn-primary" id="wsSaveText">Save site text</button>
                  </div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Website images <span className="page-count" id="wsImgCount">0</span></h2>
                      <p className="sb-hint">Reference list — read-only for now.</p>
                    </div>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead>
                        <tr><th scope="col">Section</th><th scope="col">Label</th><th scope="col">URL</th></tr>
                      </thead>
                      <tbody id="wsImgBody"></tbody>
                    </table>
                  </div>
                </section>
              </section>

              {/* ============ SEO ============ */}
              <section className="op-panel" id="wsSeo" role="tabpanel" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Crawler files</h2>
                      <p className="sb-hint">Stored here; the website serves <code>/robots.txt</code>, <code>/llms.txt</code> and a dynamic <code>/sitemap.xml</code> that always reflects published listings.</p>
                    </div>
                    <button type="button" className="btn btn-primary" id="wsSaveSeo">Save SEO content</button>
                  </div>
                  <label className="field">
                    <span className="field__label">robots.txt</span>
                    <textarea className="input-field input-field--area ws-mono" id="wsRobots" rows={8}>User-agent: *
      Allow: /
      Disallow: /admin
      Sitemap: https://banyan.properties/sitemap.xml</textarea>
                  </label>
                  <label className="field">
                    <span className="field__label">llms.txt</span>
                    <textarea className="input-field input-field--area ws-mono" id="wsLlms" rows={8}># Banyan Properties
      Villa rentals and property sales in Ubud, Bali.

      ## Pages
      - /villas-for-rent
      - /villas-for-sale
      - /land-for-sale
      - /blog</textarea>
                  </label>
                </section>

                <section className="card op-block">
                  <h2 className="section-title">Default meta</h2>
                  <div className="op-grid">
                    <label className="field"><span className="field__label">Site title</span><input type="text" className="input-field" defaultValue="Banyan Properties — Villas in Bali" /></label>
                    <label className="field"><span className="field__label">Title separator</span><input type="text" className="input-field" defaultValue="·" /></label>
                    <label className="field"><span className="field__label">Canonical domain</span><input type="url" className="input-field" defaultValue="https://banyan.properties" /></label>
                  </div>
                  <label className="field">
                    <span className="field__label">Meta description</span>
                    <textarea className="input-field input-field--area" rows={2}>Long-term villa rentals and property sales in Ubud and across Bali, handled by a team that lives here.</textarea>
                  </label>
                </section>
              </section>

              <div className="cs-toast" id="wsToast" hidden></div>




    </>
  );
}
