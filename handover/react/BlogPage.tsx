'use client';

/*
 * BlogPage
 * Copy to: app/(app)/marketing/blog/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function BlogPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Blog</h1>
                  <p className="page-subtitle">The article pipeline for the public website — drafts, review and what is live.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-primary" id="blNew">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    New article
                  </button>
                </div>
              </section>

              <section className="queue-stats" aria-label="Article summary">
                <button type="button" className="queue-stat is-active" data-blstatus="all">
                  <span className="queue-stat__value">12</span><span className="queue-stat__label">All</span>
                </button>
                <button type="button" className="queue-stat" data-blstatus="Draft">
                  <span className="queue-stat__value">4</span><span className="queue-stat__label">Draft</span>
                </button>
                <button type="button" className="queue-stat" data-blstatus="In review">
                  <span className="queue-stat__value queue-stat__value--amber">2</span><span className="queue-stat__label">In review</span>
                </button>
                <button type="button" className="queue-stat" data-blstatus="Scheduled">
                  <span className="queue-stat__value queue-stat__value--blue">2</span><span className="queue-stat__label">Scheduled</span>
                </button>
                <button type="button" className="queue-stat" data-blstatus="Published">
                  <span className="queue-stat__value queue-stat__value--green">4</span><span className="queue-stat__label">Published</span>
                </button>
              </section>

              <div className="work-bar">
                <label className="search-field search-field--wide">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                  <input type="search" id="blSearch" placeholder="Search title, slug or author…" aria-label="Search articles" />
                </label>
                <div className="work-filters">
                  <label className="select-wrap">
                    <span className="sr-only">Filter by category</span>
                    <select className="select-field" id="blCategory">
                      <option defaultValue="all">All categories</option>
                      <option defaultValue="Living in Bali">Living in Bali</option>
                      <option defaultValue="Buying guide">Buying guide</option>
                      <option defaultValue="Renting guide">Renting guide</option>
                      <option defaultValue="Market update">Market update</option>
                      <option defaultValue="Community">Community</option>
                    </select>
                  </label>
                  <label className="select-wrap">
                    <span className="sr-only">Filter by author</span>
                    <select className="select-field" id="blAuthor">
                      <option defaultValue="all">All authors</option>
                      <option defaultValue="Ratna">Ratna</option>
                      <option defaultValue="Berry">Berry</option>
                      <option defaultValue="Andries">Andries</option>
                      <option defaultValue="Kashif">Kashif</option>
                    </select>
                  </label>
                </div>
              </div>

              <section className="card op-block">
                <div className="work-list">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col" className="th-sort" data-sort="id">ID</th>
                        <th scope="col" className="th-sort is-asc" data-sort="title">Title</th>
                        <th scope="col" className="th-sort" data-sort="category">Category</th>
                        <th scope="col" className="th-sort" data-sort="author">Author</th>
                        <th scope="col" className="th-sort" data-sort="status">Status</th>
                        <th scope="col" className="th-sort" data-sort="featured">Featured</th>
                        <th scope="col" className="th-sort" data-sort="date">Updated</th>
                        <th scope="col" className="th-edit">Edit</th>
                      </tr>
                    </thead>
                    <tbody id="blBody"></tbody>
                  </table>
                </div>
                <p className="list-empty" id="blEmpty" hidden>No articles match your filters.</p>
              </section>

              <p className="field-hint">SEO settings and the PostHog analytics that used to sit alongside the blog have moved — SEO is under <a href="marketing-website-settings.html">Website Settings</a>, analytics under <a href="reporting-website.html">Website Dashboard</a>.</p>




    </>
  );
}
