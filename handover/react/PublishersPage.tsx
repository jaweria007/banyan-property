'use client';

/*
 * PublishersPage
 * Copy to: app/(app)/marketing/publishers/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function PublishersPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Publishers</h1>
                  <p className="page-subtitle">Outbound — campaign broadcasts paced across your channels.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-primary" id="pbNew">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    <span id="pbNewLabel">Create campaign</span>
                  </button>
                </div>
              </section>

              <nav className="op-tabs" role="tablist" aria-label="Publishers sections">
                <button type="button" className="op-tab is-active" role="tab" aria-selected="true" data-pbtab="campaigns">Campaigns</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-pbtab="channels">Channels</button>
              </nav>

              {/* ============ CAMPAIGNS ============ */}
              <section className="op-panel" id="pbCampaigns" role="tabpanel">
                <section className="queue-stats" aria-label="Campaign summary">
                  <button type="button" className="queue-stat is-active" data-pbstatus="all">
                    <span className="queue-stat__value">6</span><span className="queue-stat__label">All</span>
                  </button>
                  <button type="button" className="queue-stat" data-pbstatus="Scheduled">
                    <span className="queue-stat__value queue-stat__value--blue">2</span><span className="queue-stat__label">Scheduled</span>
                  </button>
                  <button type="button" className="queue-stat" data-pbstatus="Sending">
                    <span className="queue-stat__value queue-stat__value--amber">1</span><span className="queue-stat__label">Sending</span>
                  </button>
                  <button type="button" className="queue-stat" data-pbstatus="Sent">
                    <span className="queue-stat__value queue-stat__value--green">2</span><span className="queue-stat__label">Sent</span>
                  </button>
                  <button type="button" className="queue-stat" data-pbstatus="Draft">
                    <span className="queue-stat__value">1</span><span className="queue-stat__label">Draft</span>
                  </button>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Campaigns</h2>
                    <label className="search-field search-field--wide">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                      <input type="search" id="pbSearch" placeholder="Search campaigns…" aria-label="Search campaigns" />
                    </label>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th scope="col" className="th-sort is-asc" data-sort="name">Campaign</th>
                          <th scope="col" className="th-sort" data-sort="bucket">Bucket</th>
                          <th scope="col" className="th-sort" data-sort="week">Week</th>
                          <th scope="col">Reference listing</th>
                          <th scope="col" className="th-sort" data-sort="channels">Channels</th>
                          <th scope="col" className="th-sort" data-sort="status">Status</th>
                          <th scope="col" className="th-edit">Edit</th>
                        </tr>
                      </thead>
                      <tbody id="pbBody"></tbody>
                    </table>
                  </div>
                  <p className="list-empty" id="pbEmpty" hidden>No campaigns match your filters.</p>
                </section>
              </section>

              {/* ============ CHANNELS ============ */}
              <section className="op-panel" id="pbChannels" role="tabpanel" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="section-title">Registered channels</h2>
                      <p className="sb-hint">Where campaigns are broadcast. A channel that loses its session has to be re-authenticated before the next send.</p>
                    </div>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th scope="col">Channel</th>
                          <th scope="col">Mechanism</th>
                          <th scope="col">Label</th>
                          <th scope="col">Status</th>
                          <th scope="col">Re-authenticate</th>
                        </tr>
                      </thead>
                      <tbody id="pbChBody"></tbody>
                    </table>
                  </div>
                  <p className="list-empty" id="pbChEmpty" hidden>No channels registered yet.</p>
                </section>
              </section>

              {/* Create campaign / Add channel */}
              <button className="drawer-backdrop" id="pbBackdrop" aria-label="Close" hidden></button>
              <aside className="drawer" id="pbDrawer" aria-labelledby="pbDrawerTitle" aria-hidden="true">
                <header className="drawer__head">
                  <h2 className="drawer__title" id="pbDrawerTitle">New campaign</h2>
                  <button type="button" className="icon-btn drawer__close" id="pbClose" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                  </button>
                </header>

                <div className="drawer__body" id="pbFormCampaign">
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input type="text" className="input-field" id="pbName" placeholder="e.g. September rice-field villas" />
                  </label>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Bucket</span>
                      <input type="text" className="input-field" id="pbBucket" placeholder="e.g. Rentals — Ubud" />
                    </label>
                    <label className="field">
                      <span className="field__label">Week number (1–8)</span>
                      <select className="select-field" id="pbWeek">
                        <option defaultValue="">—</option>
                        <option>1</option><option>2</option><option>3</option><option>4</option>
                        <option>5</option><option>6</option><option>7</option><option>8</option>
                      </select>
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">Reference listing <span className="field-hint">(optional)</span></span>
                    <select className="select-field" id="pbListing"></select>
                  </label>
                  <label className="field">
                    <span className="field__label">Caption</span>
                    <textarea className="input-field input-field--area" id="pbCaption" rows={4} placeholder="The post text, as the audience will read it…"></textarea>
                  </label>
                  <label className="field">
                    <span className="field__label">Media image key <span className="field-hint">(clean R2 key)</span></span>
                    <input type="text" className="input-field" id="pbMedia" placeholder="e.g. listings/buy-1301/cover.jpg" />
                  </label>
                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Channels</h3>
                    <div className="tagset" id="pbChannelPick"></div>
                  </section>
                </div>

                <div className="drawer__body" id="pbFormChannel" hidden>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Channel</span>
                      <select className="select-field" id="pbChType">
                        <option>Facebook Page</option>
                        <option>Instagram</option>
                        <option>Telegram</option>
                        <option>WhatsApp Groups</option>
                        <option>Facebook Groups</option>
                        <option>TikTok</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Mechanism</span>
                      <select className="select-field" id="pbChMech">
                        <option>Graph API</option>
                        <option>VPS session</option>
                      </select>
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">Label <span className="field-hint">(optional)</span></span>
                    <input type="text" className="input-field" id="pbChLabel" placeholder="e.g. Banyan Bali — main page" />
                  </label>
                  <p className="field-hint">VPS sessions expire and need re-authenticating; Graph API connections do not.</p>
                </div>

                <footer className="drawer__foot">
                  <button type="button" className="btn btn-ghost" id="pbCancel">Cancel</button>
                  <button type="button" className="btn btn-primary" id="pbSave">Save</button>
                </footer>
              </aside>

              <div className="cs-toast" id="pbToast" hidden></div>




    </>
  );
}
