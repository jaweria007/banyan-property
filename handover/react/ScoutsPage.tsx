'use client';

/*
 * ScoutsPage
 * Copy to: app/(app)/marketing/scouts/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ScoutsPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Scouts</h1>
                  <p className="page-subtitle">Inbound — data-collection campaigns watching co-broker channels. Nothing reaches an Opportunity or a Listing without a human qualifying it first.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-primary" id="scNewCampaign">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    Create campaign
                  </button>
                </div>
              </section>

              {/* The Monitors / Promotion / Blog strip is gone: the left nav does that job */}
              <nav className="op-tabs" role="tablist" aria-label="Scouts sections">
                <button type="button" className="op-tab is-active" role="tab" aria-selected="true" data-sctab="campaigns">Campaigns</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-sctab="quarantine">Quarantine <span className="page-count" id="scQCount">3</span></button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-sctab="groups">Groups</button>
              </nav>

              {/* ============ CAMPAIGNS ============ */}
              <section className="op-panel" id="scCampaigns" role="tabpanel">
                <div className="sc-grid" id="scCampaignList"></div>
              </section>

              {/* ============ QUARANTINE ============ */}
              <section className="op-panel" id="scQuarantine" role="tabpanel" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Quarantine</h2>
                      <p className="sb-hint">Messages the Guard held back. Nothing here has touched an Opportunity or a Listing.</p>
                    </div>
                    <label className="select-wrap">
                      <span className="sr-only">Filter by platform</span>
                      <select className="select-field" id="scQPlatform">
                        <option defaultValue="all">All platforms</option>
                        <option defaultValue="WhatsApp">WhatsApp</option>
                        <option defaultValue="Telegram">Telegram</option>
                        <option defaultValue="Facebook">Facebook</option>
                      </select>
                    </label>
                  </div>
                  <div className="work-list">
                    <table className="data-table sc-qtable">
                      <thead>
                        <tr>
                          <th scope="col">Message</th>
                          <th scope="col">Reasons</th>
                          <th scope="col">Platform</th>
                          <th scope="col">Received</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="scQBody"></tbody>
                    </table>
                  </div>
                  <p className="list-empty" id="scQEmpty" hidden>Nothing in Quarantine.</p>
                </section>
              </section>

              {/* ============ GROUPS ============ */}
              <section className="op-panel" id="scGroups" role="tabpanel" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Monitored groups</h2>
                      <p className="sb-hint">The channels the scouts listen to. Pausing a group stops collection without losing its history.</p>
                    </div>
                    <button type="button" className="btn btn-ghost" id="scAddGroup">Add group</button>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th scope="col" className="th-sort is-asc" data-sort="name">Group</th>
                          <th scope="col" className="th-sort" data-sort="platform">Platform</th>
                          <th scope="col" className="th-sort" data-sort="members">Members</th>
                          <th scope="col" className="th-sort" data-sort="messages">Messages / 24h</th>
                          <th scope="col" className="th-sort" data-sort="status">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody id="scGBody"></tbody>
                    </table>
                  </div>
                  <p className="list-empty" id="scGEmpty" hidden>No groups match this filter.</p>
                </section>
              </section>

              {/* Create campaign */}
              <button className="drawer-backdrop" id="scBackdrop" aria-label="Close" hidden></button>
              <aside className="drawer" id="scDrawer" aria-labelledby="scDrawerTitle" aria-hidden="true">
                <header className="drawer__head">
                  <h2 className="drawer__title" id="scDrawerTitle">Create campaign</h2>
                  <button type="button" className="icon-btn drawer__close" id="scClose" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                  </button>
                </header>
                <div className="drawer__body">
                  <label className="field">
                    <span className="field__label">New campaign name</span>
                    <input type="text" className="input-field" id="scName" placeholder="e.g. Ubud Rental Listings" />
                  </label>
                  <label className="field">
                    <span className="field__label">Category</span>
                    <select className="select-field" id="scCategory">
                      <option defaultValue="Rental Listing">Rental Listing</option>
                      <option defaultValue="Rental Lead">Rental Lead</option>
                      <option defaultValue="Sale Listing">Sale Listing</option>
                      <option defaultValue="Buyer Lead">Buyer Lead</option>
                    </select>
                  </label>
                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Groups to watch</h3>
                    <div className="tagset" id="scGroupPick"></div>
                  </section>
                  <p className="field-hint">Everything a campaign collects lands in review first — it never reaches an Opportunity or a Listing on its own.</p>
                </div>
                <footer className="drawer__foot">
                  <button type="button" className="btn btn-ghost" id="scCancel">Cancel</button>
                  <button type="button" className="btn btn-primary" id="scSave">Create campaign</button>
                </footer>
              </aside>

              <div className="cs-toast" id="scToast" hidden></div>




    </>
  );
}
