'use client';

/*
 * RelationshipsPage
 * Copy to: app/(app)/relationships/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function RelationshipsPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Relationships</h1>
                  <p className="page-subtitle">Everyone Banyan deals with — one record per person or organisation, however many roles they play.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-primary" id="relNewTask">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    Create Task
                  </button>
                </div>
              </section>

              {/* Relationship metrics double as quick filters */}
              <section className="queue-stats" aria-label="Relationship groups">
                <button type="button" className="queue-stat is-active" data-reltype="all">
                  <span className="queue-stat__value">893</span>
                  <span className="queue-stat__label">All</span>
                </button>
                <button type="button" className="queue-stat" data-reltype="buyer">
                  <span className="queue-stat__value">51</span>
                  <span className="queue-stat__label">Buyers</span>
                </button>
                <button type="button" className="queue-stat" data-reltype="tenant">
                  <span className="queue-stat__value">478</span>
                  <span className="queue-stat__label">Tenants</span>
                </button>
                <button type="button" className="queue-stat" data-reltype="landlord">
                  <span className="queue-stat__value">350</span>
                  <span className="queue-stat__label">Landlords</span>
                </button>
                <button type="button" className="queue-stat" data-reltype="broker">
                  <span className="queue-stat__value">14</span>
                  <span className="queue-stat__label">Brokers &amp; Partners</span>
                </button>
              </section>

              <div className="work-bar">
                <div className="view-toggle" role="group" aria-label="Relationships view">
                  <button type="button" className="view-link is-active" data-relview="cards" aria-pressed="true">Cards</button>
                  <button type="button" className="view-link" data-relview="list" aria-pressed="false">List</button>
                </div>

                <div className="work-filters">
                  <label className="search-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input type="search" id="relSearch" placeholder="Search name, company, WhatsApp or email…" aria-label="Search relationships" />
                  </label>
                  <label className="select-wrap">
                    <span className="sr-only">Relationship type</span>
                    <select className="select-field" id="relType">
                      <option defaultValue="all">All relationship types</option>
                      <option defaultValue="buyer">Buyer</option>
                      <option defaultValue="tenant">Tenant</option>
                      <option defaultValue="landlord">Landlord</option>
                      <option defaultValue="developer">Property Developer</option>
                      <option defaultValue="broker">Broker &amp; Partner</option>
                      <option defaultValue="contractor">Contractor</option>
                    </select>
                  </label>
                  <label className="select-wrap" id="relSortWrap" hidden>
                    <span className="sr-only">Sort by</span>
                    <select className="select-field" id="relSort">
                      <option defaultValue="recent">Sort: last contacted</option>
                      <option defaultValue="name">Sort: name</option>
                      <option defaultValue="actions">Sort: open actions</option>
                      <option defaultValue="type">Sort: relationship type</option>
                    </select>
                  </label>
                  <label className="tag-check"><input type="checkbox" id="relUnverified" /><span>Include unverified</span></label>
                </div>
              </div>

              {/* ============ CARD VIEW ============ */}
              {/* One consistent structure: WHO -> TYPE -> CONTACT/RECENCY/ACTION -> RELEVANT ACTIVITY */}
              <section className="rel-grid" id="relGrid" aria-label="Relationships">

                <a href="relationship-detail.html?id=REL-00072" className="rel-card" data-reltype="landlord" data-name="Maria Santos" data-actions="2" data-last="2026-08-26">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Maria Santos</h2>
                      <p className="rel-card__company">Santos Family Holdings</p>
                    </div>
                    <span className="rel-type rel-type--landlord">Landlord</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>8</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>26 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--red"></span>2 open tasks</dd></div>
                  </dl>

                  <dl className="rel-activity">
                    <div className="rel-metric"><dt>Listings</dt><dd>4</dd></div>
                    <div className="rel-metric"><dt>Enquiries</dt><dd>12</dd></div>
                    <div className="rel-metric"><dt>Viewings</dt><dd>7</dd></div>
                    <div className="rel-metric"><dt>Bookings</dt><dd>3</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00072</span>
                    <span className="rel-wa" data-wa="6281234567890">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 812-3456-7890
                    </span>
                  </footer>
                </a>

                <a href="relationship-detail.html?id=REL-00124" className="rel-card" data-reltype="buyer" data-name="Umar Hassan" data-actions="1" data-last="2026-08-24">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Umar Hassan</h2>
                      <p className="rel-card__company">—</p>
                    </div>
                    <span className="rel-type rel-type--buyer">Buyer</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>5</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>24 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--green"></span>1 waiting</dd></div>
                  </dl>

                  <dl className="rel-activity">
                    <div className="rel-metric"><dt>Shortlists</dt><dd>3</dd></div>
                    <div className="rel-metric"><dt>Viewings</dt><dd>2</dd></div>
                    <div className="rel-metric"><dt>Contracts</dt><dd>1</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00124</span>
                    <span className="rel-wa" data-wa="6285678901234">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 856-7890-1234
                    </span>
                  </footer>
                </a>

                <a href="relationship-detail.html?id=REL-00318" className="rel-card" data-reltype="tenant" data-name="Sarah Wilson" data-actions="0" data-last="2026-08-27">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Sarah Wilson</h2>
                      <p className="rel-card__company">—</p>
                    </div>
                    <span className="rel-type rel-type--tenant">Tenant</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>11</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>27 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--none"></span>No action</dd></div>
                  </dl>

                  <dl className="rel-activity">
                    <div className="rel-metric"><dt>Shortlists</dt><dd>1</dd></div>
                    <div className="rel-metric"><dt>Viewings</dt><dd>3</dd></div>
                    <div className="rel-metric"><dt>Contracts</dt><dd>1</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00318</span>
                    <span className="rel-wa" data-wa="6281199887766">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 811-9988-7766
                    </span>
                  </footer>
                </a>

                <a href="relationship-detail.html?id=REL-00009" className="rel-card" data-reltype="broker" data-name="Wayan Partners" data-actions="1" data-last="2026-08-21">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Wayan Adnyana</h2>
                      <p className="rel-card__company">Bali Estate Partners</p>
                    </div>
                    <span className="rel-type rel-type--broker">Broker &amp; Partner</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>6</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>21 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--red"></span>1 open task</dd></div>
                  </dl>

                  <dl className="rel-activity">
                    <div className="rel-metric"><dt>Listings</dt><dd>9</dd></div>
                    <div className="rel-metric"><dt>Listings in Shortlists</dt><dd>5</dd></div>
                    <div className="rel-metric"><dt>Viewings</dt><dd>4</dd></div>
                    <div className="rel-metric"><dt>Contracts</dt><dd>2</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00009</span>
                    <span className="rel-wa" data-wa="6287712340099">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 877-1234-0099
                    </span>
                  </footer>
                </a>

                <a href="relationship-detail.html?id=REL-00201" className="rel-card" data-reltype="developer" data-name="Nusa Development" data-actions="0" data-last="2026-08-14">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Putu Widiana</h2>
                      <p className="rel-card__company">Nusa Development</p>
                    </div>
                    <span className="rel-type rel-type--developer">Property Developer</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>3</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>14 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--none"></span>No action</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00201</span>
                    <span className="rel-wa" data-wa="6281355667788">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 813-5566-7788
                    </span>
                  </footer>
                </a>

                <a href="relationship-detail.html?id=REL-00455" className="rel-card" data-reltype="contractor" data-name="Made Renovations" data-actions="1" data-last="2026-08-29">
                  <header className="rel-card__head">
                    <div>
                      <h2 className="rel-card__name">Made Sujana</h2>
                      <p className="rel-card__company">Made Renovations</p>
                    </div>
                    <span className="rel-type rel-type--contractor">Contractor</span>
                  </header>

                  <dl className="rel-facts">
                    <div className="rel-fact"><dt>Contacts</dt><dd>14</dd></div>
                    <div className="rel-fact"><dt>Last contacted</dt><dd>29 Aug 2026</dd></div>
                    <div className="rel-fact"><dt>Actions</dt><dd><span className="action-dot action-dot--green"></span>1 waiting</dd></div>
                  </dl>

                  <footer className="rel-card__foot">
                    <span className="rel-id">REL-00455</span>
                    <span className="rel-wa" data-wa="6281744332211">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      +62 817-4433-2211
                    </span>
                  </footer>
                </a>

              </section>

              {/* ============ LIST VIEW ============ */}
              <section className="work-list" id="relList" hidden aria-label="Relationships list">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Name / Company</th>
                      <th scope="col">Type</th>
                      <th scope="col">Contacts</th>
                      <th scope="col">Last contacted</th>
                      <th scope="col">Actions</th>
                      <th scope="col">WhatsApp</th>
                      <th scope="col">ID</th>
                    </tr>
                  </thead>
                  <tbody id="relListBody"></tbody>
                </table>
                <p className="list-empty" id="relListEmpty" hidden>No relationships match your filters.</p>
              </section>

              <p className="list-empty" id="relEmpty" hidden>No relationships match your filters.</p>



    </>
  );
}
