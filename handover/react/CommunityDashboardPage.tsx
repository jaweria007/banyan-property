'use client';

/*
 * CommunityDashboardPage
 * Copy to: app/(app)/reporting/communities/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function CommunityDashboardPage() {
  return (
    <>
      <a className="sb-back" href="reporting-growth.html">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                Back to Growth Dashboard
              </a>

              <section className="page-head">
                <div>
                  <h1 className="page-title">Community Dashboard</h1>
                  <p className="page-subtitle">Member counts per community from the daily sync, with weekly and monthly growth derived over the snapshot series.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-ghost" id="cdSync">Run sync now</button>
                  <button type="button" className="btn btn-primary" id="cdAdd">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    Add community
                  </button>
                </div>
              </section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">Totals — all communities</h2>
                    <p className="sb-hint">Feeds the Activation stage's Community Members KPI.</p>
                  </div>
                  <span className="rp-syncpill" id="cdSyncState">Synced 2 Sep, 04:00</span>
                </div>
                <section className="queue-stats">
                  <div className="queue-stat is-static">
                    <span className="queue-stat__value">4,812</span>
                    <span className="queue-stat__label">Members</span>
                  </div>
                  <div className="queue-stat is-static">
                    <span className="queue-stat__value queue-stat__value--green">+186</span>
                    <span className="queue-stat__label">Weekly growth</span>
                  </div>
                  <div className="queue-stat is-static">
                    <span className="queue-stat__value queue-stat__value--green">+742</span>
                    <span className="queue-stat__label">Monthly growth</span>
                  </div>
                  <div className="queue-stat is-static">
                    <span className="queue-stat__value">9</span>
                    <span className="queue-stat__label">Communities</span>
                  </div>
                </section>
              </section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">Communities</h2>
                    <p className="sb-hint" id="cdCount">9 configured · 8 with a snapshot</p>
                  </div>
                  <label className="select-wrap">
                    <span className="sr-only">Filter by platform</span>
                    <select className="select-field" id="cdPlatform">
                      <option defaultValue="all">All platforms</option>
                      <option defaultValue="WhatsApp">WhatsApp</option>
                      <option defaultValue="Telegram">Telegram</option>
                      <option defaultValue="Facebook">Facebook</option>
                    </select>
                  </label>
                </div>
                <div className="work-list">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col" className="th-sort is-asc" data-sort="name">Community</th>
                        <th scope="col" className="th-sort" data-sort="platform">Platform</th>
                        <th scope="col" className="th-sort" data-sort="members">Members</th>
                        <th scope="col" className="th-sort" data-sort="weekly">Weekly growth</th>
                        <th scope="col" className="th-sort" data-sort="monthly">Monthly growth</th>
                        <th scope="col">Last snapshot</th>
                      </tr>
                    </thead>
                    <tbody id="cdBody"></tbody>
                  </table>
                </div>
                <p className="list-empty" id="cdEmpty" hidden>No communities match this filter.</p>
              </section>




    </>
  );
}
