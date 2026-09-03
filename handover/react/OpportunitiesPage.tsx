'use client';

/*
 * OpportunitiesPage
 * Copy to: app/(app)/opportunities/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function OpportunitiesPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Opportunities <span className="page-count" id="oppCount">16</span></h1>
                  <p className="page-subtitle">Every lead, contact and deal across your pipeline.</p>
                </div>
                <div className="page-head__actions">
                  <a href="#" className="btn btn-primary" id="newOppBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                    New Opportunity
                  </a>
                </div>
              </section>

              {/* Actions Overview — the visual guide the team works from.
                   Statuses are derived from the tasks linked to each Opportunity. */}
              <section className="queue-stats" aria-label="Actions overview">
                <button type="button" className="queue-stat is-active" data-action="all">
                  <span className="queue-stat__value">16</span>
                  <span className="queue-stat__label">All</span>
                </button>
                <button type="button" className="queue-stat" data-action="needs">
                  <span className="queue-stat__value queue-stat__value--amber">5</span>
                  <span className="queue-stat__label"><span className="action-dot action-dot--orange"></span>Needs Action</span>
                </button>
                <button type="button" className="queue-stat" data-action="waiting">
                  <span className="queue-stat__value queue-stat__value--green">4</span>
                  <span className="queue-stat__label"><span className="action-dot action-dot--green"></span>Waiting</span>
                </button>
                <button type="button" className="queue-stat" data-action="overdue">
                  <span className="queue-stat__value queue-stat__value--red">3</span>
                  <span className="queue-stat__label"><span className="action-dot action-dot--red"></span>Overdue</span>
                </button>
                <button type="button" className="queue-stat" data-action="triage">
                  <span className="queue-stat__value queue-stat__value--amber">2</span>
                  <span className="queue-stat__label"><span className="action-dot action-dot--yellow"></span>Triage</span>
                </button>
                <button type="button" className="queue-stat" data-action="none">
                  <span className="queue-stat__value">2</span>
                  <span className="queue-stat__label"><span className="action-dot action-dot--none"></span>No Action</span>
                </button>
              </section>

              {/* Only search + Channel remain up here; everything else is now a sortable column */}
              <div className="work-bar">
                <label className="search-field search-field--wide">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                  <input type="search" id="oppSearch" placeholder="Search name, phone or email…" aria-label="Search opportunities" />
                </label>
                <div className="work-filters">
                  <label className="select-wrap">
                    <span className="sr-only">Filter by channel</span>
                    <select className="select-field" id="channelSelect">
                      <option defaultValue="all">All channels</option>
                      <option defaultValue="Website">Website</option>
                      <option defaultValue="WhatsApp">WhatsApp</option>
                      <option defaultValue="Referral">Referral</option>
                      <option defaultValue="Scout">Scout</option>
                      <option defaultValue="Walk-in">Walk-in</option>
                    </select>
                  </label>
                  <button type="button" className="btn btn-ghost" id="oppResetBtn">Reset</button>
                </div>
              </div>

              <section className="work-list" aria-label="Opportunity list">
                <table className="data-table opp-grid">
                  <thead>
                    <tr>
                      <th scope="col" className="th-sort" data-sort="name">Name</th>
                      <th scope="col" className="th-sort" data-sort="action">Action</th>
                      <th scope="col" className="th-sort" data-sort="stage">Stage</th>
                      <th scope="col" className="th-sort" data-sort="type">Type</th>
                      <th scope="col" className="th-sort" data-sort="channel">Channel</th>
                      <th scope="col" className="th-sort" data-sort="priority">Priority</th>
                      <th scope="col" className="th-sort" data-sort="agent">Agent</th>
                      <th scope="col" className="th-sort" data-sort="updated">Last Updated</th>
                      <th scope="col" className="th-sort is-asc" data-sort="shortlist">Shortlist</th>
                      <th scope="col" className="th-edit">Edit</th>
                    </tr>
                  </thead>
                  <tbody id="oppBody"></tbody>
                </table>
                <p className="list-empty" id="oppEmpty" hidden>No opportunities match your filters.</p>
              </section>



      {/* ===== drawers / modals belonging to this page ===== */}
      {/* New Opportunity */}
            <button className="drawer-backdrop" id="oppBackdrop" aria-label="Close" hidden></button>
            <aside className="drawer" id="oppDrawer" aria-labelledby="oppDrawerTitle" aria-hidden="true">
              <header className="drawer__head">
                <h2 className="drawer__title" id="oppDrawerTitle">New Opportunity</h2>
                <button type="button" className="icon-btn drawer__close" id="oppDrawerClose" aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                </button>
              </header>

              <div className="drawer__body">
                <section className="drawer-group">
                  <h3 className="drawer-group__title">Client</h3>
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input type="text" className="input-field" id="noName" placeholder="Full name" />
                  </label>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">WhatsApp</span>
                      <input type="tel" className="input-field" id="noPhone" placeholder="+62 …" />
                    </label>
                    <label className="field">
                      <span className="field__label">Email</span>
                      <input type="email" className="input-field" id="noEmail" placeholder="name@example.com" />
                    </label>
                  </div>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Opportunity</h3>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Channel</span>
                      <select className="select-field" id="noChannel">
                        <option defaultValue="Website">Website</option>
                        <option defaultValue="WhatsApp">WhatsApp</option>
                        <option defaultValue="Referral">Referral</option>
                        <option defaultValue="Scout">Scout</option>
                        <option defaultValue="Walk-in">Walk-in</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Property Type</span>
                      <select className="select-field" id="noType">
                        <option defaultValue="Rent">Rent</option>
                        <option defaultValue="Villa">Villa</option>
                        <option defaultValue="Land">Land</option>
                        <option defaultValue="Commercial">Commercial</option>
                      </select>
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">Budget</span>
                    <input type="text" className="input-field" id="noBudget" placeholder="e.g. IDR 20m–50m per year, or USD 350k" />
                  </label>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Target Renter <span className="field-hint">(optional)</span></h3>
                  <div className="tagset">
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Budget Home (10-20m)" /><span>Budget Home (10–20m)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Lifestyle Home (20-35m)" /><span>Lifestyle Home (20–35m)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Premium Home (35-60m)" /><span>Premium Home (35–60m)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Executive Home (60m+)" /><span>Executive Home (60m+)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Perfect Home (Challenging Requirement)" /><span>Perfect Home (Challenging Requirement)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetRenter" defaultValue="Fit for Pets" /><span>Fit for Pets</span></label>
                  </div>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Target Buyer <span className="field-hint">(optional)</span></h3>
                  <div className="tagset">
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Family &amp; Lifestyle" /><span>Family &amp; Lifestyle</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Investor (Passive Income)" /><span>Investor (Passive Income)</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Retiree" /><span>Retiree</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Property Developer" /><span>Property Developer</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Land Banker" /><span>Land Banker</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Fix &amp; Flip" /><span>Fix &amp; Flip</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Fix &amp; Live" /><span>Fix &amp; Live</span></label>
                    <label className="tag-check"><input type="checkbox" name="targetBuyer" defaultValue="Collector (No ROI)" /><span>Collector (No ROI)</span></label>
                  </div>
                </section>

                <label className="field">
                  <span className="field__label">Client Requirements</span>
                  <textarea className="input-field input-field--area" id="noReq" rows={4} placeholder="In the client's own words — what are they looking for?"></textarea>
                </label>
              </div>

              <footer className="drawer__foot">
                <button type="button" className="btn btn-ghost" id="noCancel">Cancel</button>
                <button type="button" className="btn btn-primary" id="noSave">Create Opportunity</button>
              </footer>
            </aside>
    </>
  );
}
