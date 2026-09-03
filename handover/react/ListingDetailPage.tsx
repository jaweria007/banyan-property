'use client';

/*
 * ListingDetailPage
 * Copy to: app/(app)/master/[id]/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ListingDetailPage() {
  return (
    <>
      <a className="detail-back" href="listings.html">← Back to listings</a>

              <div className="detail-head">
                <h1 className="detail-title">Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud</h1>
                <p className="detail-sub"><span className="detail-sub__id">BUY-1301</span> · Sale</p>
              </div>

              {/* The two statuses an agent changes most often belong at the top */}
              <div className="detail-actions">
                <div className="detail-status">
                  <label className="field field--inline">
                    <span className="field__label">Operational status</span>
                    <select className="select-field" id="opStatusSel">
                      <option defaultValue="draft" defaultSelected>Draft</option>
                      <option defaultValue="published">Published</option>
                      <option defaultValue="hold">On Hold</option>
                      <option defaultValue="archived">Archived</option>
                    </select>
                  </label>
                  <label className="field field--inline">
                    <span className="field__label">Marketing status</span>
                    <select className="select-field" id="mktStatusSel">
                      <option defaultValue="available" defaultSelected>Available</option>
                      <option defaultValue="negotiation">Under Negotiation</option>
                      <option defaultValue="request">Upon Request</option>
                      <option defaultValue="rented">Rented</option>
                      <option defaultValue="sold">Sold</option>
                    </select>
                  </label>
                </div>
                <div className="detail-actions__btns">
                  <span className="detail-actions__saved" id="saveState" hidden></span>
                  <button type="button" className="btn detail-btn detail-btn--primary" id="saveChangesBtn">Save changes</button>
                  <button type="button" className="btn detail-btn detail-btn--ghost">Cancel</button>
                </div>
              </div>

              <nav className="detail-tabs" aria-label="Listing detail">
                <button type="button" className="detail-tab is-active" data-tab="Overview">Overview</button>
                <button type="button" className="detail-tab" data-tab="Content">Content</button>
                <button type="button" className="detail-tab" data-tab="Media">Media</button>
                <button type="button" className="detail-tab" data-tab="Operations">Operations</button>
                <button type="button" className="detail-tab" data-tab="Connections">Connections</button>
                <button type="button" className="detail-tab" data-tab="Timeline">Timeline</button>
                <button type="button" className="detail-tab" data-tab="Marketing Profile">Marketing Profile</button>
                <button type="button" className="detail-tab" data-tab="Intelligence">Intelligence</button>
                <button type="button" className="detail-tab" data-tab="Resources">Resources</button>
              </nav>

              {/* ================= OVERVIEW ================= */}
              <section className="detail-panel" id="panelOverview">

              <section className="card readiness" aria-label="Listing readiness">
                <div className="readiness__top">
                  <div className="readiness__score">
                    <div className="readiness__ring" style={{ '--pct': '64' }}>
                      <svg viewBox="0 0 120 120" aria-hidden="true">
                        <circle className="readiness__ring-track" cx="60" cy="60" r="52"></circle>
                        <circle className="readiness__ring-bar" cx="60" cy="60" r="52"></circle>
                      </svg>
                      <div className="readiness__ring-label">64%</div>
                    </div>
                    <p className="readiness__score-count"><b>7 of 11</b> requirements complete</p>
                  </div>

                  <div className="readiness__blockers">
                    <div className="readiness__blockers-head">
                      <h2 className="section-title">4 things blocking publication</h2>
                      <span className="badge badge--high">High priority</span>
                    </div>
                    <ol className="readiness__list">
                      <li className="readiness__item">
                        <span className="readiness__num">1</span>
                        <span className="readiness__item-text">
                          <b>Add at least 5 photos</b>
                          <span className="readiness__hint">No photos uploaded yet</span>
                        </span>
                      </li>
                      <li className="readiness__item">
                        <span className="readiness__num">2</span>
                        <span className="readiness__item-text">
                          <b>Add video</b><em className="readiness__optional"> (optional but recommended)</em>
                          <span className="readiness__hint">No video link</span>
                        </span>
                      </li>
                      <li className="readiness__item">
                        <span className="readiness__num">3</span>
                        <span className="readiness__item-text">
                          <b>Add price</b>
                          <span className="readiness__hint">No asking price set</span>
                        </span>
                      </li>
                      <li className="readiness__item">
                        <span className="readiness__num">4</span>
                        <span className="readiness__item-text">
                          <b>Sign owner agreement</b>
                          <span className="readiness__hint">No signed agreement on file</span>
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="readiness__cta">
                    <button type="button" className="btn detail-btn detail-btn--primary detail-btn--block">Fix missing items →</button>
                    <a className="readiness__link" href="#">View all 11 requirements →</a>
                  </div>
                </div>

                <div className="readiness__cats" aria-label="Readiness by category">
                  <div className="readiness__cat">
                    <span className="readiness__cat-head">
                      <span className="readiness__cat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>
                      </span>
                      <span className="readiness__cat-name">Content</span>
                    </span>
                    <span className="readiness__cat-metrics"><b>80%</b><span>4 / 5</span></span>
                    <span className="readiness__cat-bar"><i style={{ width: '80%' }}></i></span>
                  </div>
                  <div className="readiness__cat">
                    <span className="readiness__cat-head">
                      <span className="readiness__cat-icon readiness__cat-icon--media">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      </span>
                      <span className="readiness__cat-name">Media</span>
                    </span>
                    <span className="readiness__cat-metrics"><b>40%</b><span>2 / 5</span></span>
                    <span className="readiness__cat-bar"><i style={{ width: '40%' }}></i></span>
                  </div>
                  <div className="readiness__cat">
                    <span className="readiness__cat-head">
                      <span className="readiness__cat-icon readiness__cat-icon--operations">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
                      </span>
                      <span className="readiness__cat-name">Operations</span>
                    </span>
                    <span className="readiness__cat-metrics"><b>70%</b><span>7 / 10</span></span>
                    <span className="readiness__cat-bar"><i style={{ width: '70%' }}></i></span>
                  </div>
                  <div className="readiness__cat">
                    <span className="readiness__cat-head">
                      <span className="readiness__cat-icon readiness__cat-icon--marketing">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
                      </span>
                      <span className="readiness__cat-name">Marketing</span>
                    </span>
                    <span className="readiness__cat-metrics"><b>50%</b><span>2 / 4</span></span>
                    <span className="readiness__cat-bar"><i style={{ width: '50%' }}></i></span>
                  </div>
                  <div className="readiness__cat">
                    <span className="readiness__cat-head">
                      <span className="readiness__cat-icon readiness__cat-icon--compliance">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                      </span>
                      <span className="readiness__cat-name">Compliance</span>
                    </span>
                    <span className="readiness__cat-metrics"><b>100%</b><span>1 / 1</span></span>
                    <span className="readiness__cat-bar"><i style={{ width: '100%' }}></i></span>
                  </div>
                </div>
              </section>

              <div className="detail-cols">
                <section className="card summary-card" aria-label="Listing summary">
                  <div className="card-head">
                    <h2 className="section-title">Listing summary</h2>
                    <button type="button" className="card-head__edit">✎ Edit details</button>
                  </div>
                  <div className="summary-card__body">
                    <div className="summary-card__img">
                      <div className="summary-card__img-inner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                        <span>Property image</span>
                      </div>
                    </div>
                    <dl className="summary-card__cols">
                      <div className="summary-card__col">
                        <div className="summary-card__row">
                          <dt>Status</dt>
                          <dd><span className="status-badge status-badge--draft">Draft</span></dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Property type</dt>
                          <dd>Villa</dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Area</dt>
                          <dd>Ubud</dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Created</dt>
                          <dd>02 Aug 2026</dd>
                        </div>
                      </div>
                      <div className="summary-card__col">
                        <div className="summary-card__row">
                          <dt>Sales agent</dt>
                          <dd>Ratna</dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Listing agent</dt>
                          <dd>Berry</dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Co-broker</dt>
                          <dd>
                            <a className="summary-card__link" href="relationships.html">Wayan Adnyana</a>
                            <br />
                            <span className="rel-wa" data-wa="6287712340099">
                              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                              +62 877-1234-0099
                            </span>
                          </dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Last updated</dt>
                          <dd>10 Aug 2026 · 11:58 AM<br /><span className="summary-card__muted">by System</span></dd>
                        </div>
                      </div>
                      <div className="summary-card__col">
                        <div className="summary-card__row">
                          <dt>Visibility</dt>
                          <dd><span className="avail-pill">Available</span></dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Marketing channels</dt>
                          <dd>All marketing</dd>
                        </div>
                        <div className="summary-card__row">
                          <dt>Days on market</dt>
                          <dd>8 days</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </section>

                <section className="card activity-card" aria-label="Recent activity">
                  <div className="card-head">
                    <h2 className="section-title">Recent activity</h2>
                    <a className="card-head__more" href="#">View all activity →</a>
                  </div>
                  <ul className="activity-list">
                    <li className="activity-item">
                      <span className="activity-item__avatar">S</span>
                      <div className="activity-item__body">
                        <p className="activity-item__text">System archived this listing</p>
                        <p className="activity-item__meta">10 Aug 2026 · 11:58 AM</p>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              <section className="card tasks-card is-open" id="tasksCard" aria-label="Tasks">
                <div className="tasks-card__head">
                  <button type="button" className="tasks-card__toggle" id="tasksToggle" aria-expanded="true">
                    <span className="tasks-card__chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></span>
                    <span>Tasks</span>
                    <span className="tasks-card__count">0</span>
                  </button>
                  <button type="button" className="tasks-card__create">＋ Create task</button>
                </div>
                <div className="tasks-card__body" id="tasksBody">
                  <p className="tasks-card__empty">No tasks yet. Create a task to keep track of work on this listing.</p>
                </div>
              </section>

              </section>

              {/* ================= CONTENT ================= */}
              <section className="detail-panel" id="panelContent" hidden>

                <div className="detail-cols">
                  <div className="detail-col">

                    <section className="card op-block">
                      <h2 className="section-title">Property specs</h2>
                      <div className="op-grid">
                        <label className="field"><span className="field__label">Property type</span>
                          <select className="select-field" id="ldType"><option defaultValue="rent">Rent</option><option defaultValue="sale" defaultSelected>Villa (sale)</option><option defaultValue="land">Land</option><option defaultValue="commercial">Commercial</option></select></label>
                        <label className="field"><span className="field__label">Bedrooms</span><input type="number" className="input-field" defaultValue="4" /></label>
                        <label className="field"><span className="field__label">Bathrooms</span><input type="number" className="input-field" defaultValue="4" /></label>
                        <label className="field"><span className="field__label">Land size (m²)</span><input type="number" className="input-field" defaultValue="850" /></label>
                        <label className="field"><span className="field__label">Building size (m²)</span><input type="number" className="input-field" defaultValue="320" /></label>
                        <label className="field"><span className="field__label">Year built</span><input type="number" className="input-field" defaultValue="2019" /></label>
                      </div>

                      {/* Pricing lives with the specs, not down in Marketing & Notes */}
                      <h3 className="sb-h4">Pricing</h3>
                      <div className="op-grid">
                        <label className="field"><span className="field__label">Primary price</span>
                          <input type="text" className="input-field" id="ldPrimaryPrice" defaultValue="350000" /></label>
                        <label className="field"><span className="field__label">Primary currency</span>
                          <select className="select-field" id="ldCurrency">
                            <option defaultValue="USD" defaultSelected>USD</option>
                            <option defaultValue="EUR">EUR</option>
                            <option defaultValue="AUD">AUD</option>
                            <option defaultValue="IDR">IDR</option>
                          </select></label>
                        <label className="field"><span className="field__label">IDR display price</span>
                          <input type="text" className="input-field" id="ldIdrPrice" readOnly /></label>
                      </div>
                      <p className="field-hint" id="ldFxNote"></p>
                    </section>

                    <section className="card op-block" id="ldLeaseBlock">
                      <h2 className="section-title">Tenure &amp; lease</h2>
                      <div className="op-grid">
                        <label className="field"><span className="field__label">Tenure</span>
                          <select className="select-field"><option>Leasehold</option><option>Freehold</option></select></label>
                        <label className="field"><span className="field__label">Lease expiration</span>
                          <input type="date" className="input-field" id="ldLeaseEnd" defaultValue="2047-03-27" /></label>
                        <label className="field"><span className="field__label">Lease duration</span>
                          <input type="text" className="input-field" id="ldLeaseDuration" readOnly /></label>
                      </div>
                      <label className="field"><span className="field__label">Lease extension</span>
                        <input type="text" className="input-field" defaultValue="Yes, 25 years" /></label>
                      <p className="field-hint">Duration is calculated from the expiration date, so the two can never disagree.</p>
                    </section>

                    <section className="card op-block" id="ldInclusions" hidden>
                      <h2 className="section-title">Inclusions</h2>
                      <div className="tagset">
                        <label className="tag-check"><input type="checkbox" defaultChecked /><span>Electricity</span></label>
                        <label className="tag-check"><input type="checkbox" defaultChecked /><span>Water</span></label>
                        <label className="tag-check"><input type="checkbox" /><span>Internet</span></label>
                        <label className="tag-check"><input type="checkbox" defaultChecked /><span>Pool maintenance</span></label>
                        <label className="tag-check"><input type="checkbox" defaultChecked /><span>Garden maintenance</span></label>
                        <label className="tag-check"><input type="checkbox" /><span>Weekly cleaning</span></label>
                        <label className="tag-check"><input type="checkbox" /><span>Staff</span></label>
                        <label className="tag-check"><input type="checkbox" /><span>Taxes</span></label>
                      </div>
                      <p className="field-hint">Shown for Property Type — Rent.</p>
                    </section>

                    <section className="card op-block">
                      <h2 className="section-title">Features</h2>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Swimming pool</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Large Private Pool (&gt;10m)</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Private Pool (&lt;10m)</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Shared</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>None</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Living area</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" /><span>Enclosed</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Semi-Enclosed</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Private</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Semi-Open</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Open</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Outdoor</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Indoor</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>None</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">View</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Rice Field View</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Jungle View</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Mountain View</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>River &amp; Waterfall</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Beachfront</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Ocean View</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Garden &amp; Pool View</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Garden View</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Balinese Compound</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Street View</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Kitchen</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Enclosed Kitchen</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Open Kitchen</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Semi-Outdoor Kitchen</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Shared Kitchen</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>None</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Access</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Car Access</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Motorbike Access</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Walking Access only</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Basic comfort &amp; utility</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Wifi</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>AC</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Dedicated Workspace</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Oven</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Washing Machine</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Dryer</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Dish Washer</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Microwave</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Hot Water</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>TV</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Bathtub</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Security &amp; safety</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>CCTV</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Smart Lock</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Safe</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Carbon Monoxide Alarm</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Physical Security</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Family &amp; child</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" /><span>Outdoor Fireplace</span></label>
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Playground &amp; Play Area</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Toys &amp; Board Games</span></label>
                        </div>
                      </div>

                      <div className="op-tagblock">
                        <h3 className="sb-h4">Pets</h3>
                        <div className="tagset">
                          <label className="tag-check"><input type="checkbox" defaultChecked /><span>Pet Friendly</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Pets Allowed (extra deposit)</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Cat Only</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>No Pets</span></label>
                          <label className="tag-check"><input type="checkbox" /><span>Case by Case</span></label>
                        </div>
                      </div>
                    </section>

                    <section className="card op-block">
                      <h2 className="section-title">Marketing &amp; notes</h2>
                      <label className="field"><span className="field__label">Headline</span>
                        <input type="text" className="input-field" defaultValue="Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud" /></label>
                      <label className="field"><span className="field__label">Description</span>
                        <textarea className="input-field input-field--area" rows={5}>A generous four-bedroom villa on 850 m² in Singakerta, with a separate two-bedroom guest house, a 12-metre pool and uninterrupted rice field views to the north.</textarea></label>
                      <label className="field"><span className="field__label">Internal notes</span>
                        <textarea className="input-field input-field--area" rows={3}>Owner is flexible on the start date but firm on price until the end of the quarter.</textarea></label>
                    </section>

                    {/* Moved down here, out of the top header */}
                    <section className="card op-block">
                      <h2 className="section-title">Reason for closing</h2>
                      <div className="op-grid">
                        <label className="field"><span className="field__label">Reason</span>
                          <select className="select-field" id="ldClosingReason">
                            <option defaultValue="">Not closed</option>
                            <option defaultValue="sold">Sold</option>
                            <option defaultValue="rented">Rented</option>
                            <option defaultValue="withdrawn">Withdrawn by owner</option>
                            <option defaultValue="expired">Listing expired</option>
                            <option defaultValue="other">Other</option>
                          </select></label>
                        <label className="field"><span className="field__label">Closed on</span><input type="date" className="input-field" /></label>
                      </div>
                      <label className="field"><span className="field__label">Notes</span>
                        <textarea className="input-field input-field--area" rows={2} placeholder="Anything worth recording about why this listing closed…"></textarea></label>
                    </section>

                    <section className="card op-block">
                      <h2 className="section-title">Related tasks</h2>
                      <ul className="op-list">
                        <li className="op-listitem"><div><strong>Chase owner for lease extension documents</strong><span className="field-hint">Kashif · due 5 Sep</span></div><a href="my-work.html" className="record-pill">My Work</a></li>
                        <li className="op-listitem"><div><strong>New listing needs photos and marketing copy</strong><span className="field-hint">Unassigned · due 10 Sep</span></div><a href="my-work.html" className="record-pill">My Work</a></li>
                      </ul>
                    </section>
                  </div>

                  <aside className="detail-side">
                    <section className="card op-block">
                      <h2 className="section-title">Location</h2>
                      <label className="field"><span className="field__label">Primary location</span>
                        <select className="select-field" id="ldLocPrimary">
                          <option defaultValue="Ubud" defaultSelected>Ubud</option>
                          <option defaultValue="Canggu">Canggu</option>
                          <option defaultValue="Uluwatu">Uluwatu</option>
                          <option defaultValue="Seminyak">Seminyak</option>
                          <option defaultValue="Sanur">Sanur</option>
                        </select></label>
                      <label className="field"><span className="field__label">Secondary location</span>
                        <select className="select-field" id="ldLocSecondary"></select></label>
                      <p className="field-hint">Secondary locations are nested under their primary, so Ubud can never be paired with Uluwatu.</p>
                      <label className="field"><span className="field__label">Google Maps pin</span>
                        <input type="text" className="input-field" defaultValue="-8.5231, 115.2519" /></label>
                    </section>

                    {/* Sits below the Location table on the right, as requested */}
                    <section className="card op-block op-block--sensitive">
                      <h2 className="section-title">Private &amp; sensitive</h2>
                      <label className="field"><span className="field__label">Owner name</span><input type="text" className="input-field" defaultValue="Maria Santos" /></label>
                      <label className="field"><span className="field__label">Owner WhatsApp</span><input type="tel" className="input-field" defaultValue="+62 812-3456-7890" /></label>
                      <label className="field"><span className="field__label">Agreed commission</span>
                        <input type="text" className="input-field" placeholder="e.g. 5%, 10%" defaultValue="8%" /></label>
                      <label className="field"><span className="field__label">Owner expectations</span>
                        <textarea className="input-field input-field--area" rows={3}>Wants USD 350k net. Will consider 335k for a fast close.</textarea></label>
                      <p className="field-hint">Never shown on the public website or on a client shortlist.</p>
                    </section>
                  </aside>
                </div>
              </section>

              {/* ================= MEDIA ================= */}
              <section className="detail-panel" id="panelMedia" hidden>
                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Website media gallery</h2>
                    <button type="button" className="btn btn-ghost">Reorder</button>
                  </div>
                  <p className="field-hint">Images keep the order they have in Google Drive (1.jpg, 2.jpg …) unless you reorder them here.</p>
                  <div className="ld-gallery">
                    <span className="ld-thumb ld-thumb--cover">1 · Cover</span>
                    <span className="ld-thumb">2</span>
                    <span className="ld-thumb">3</span>
                    <span className="ld-thumb">4</span>
                    <span className="ld-thumb">5</span>
                    <span className="ld-thumb">6</span>
                  </div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Videos</h2>
                    <button type="button" className="btn btn-ghost" id="ldAddVideo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                      Add YouTube video
                    </button>
                  </div>
                  <div className="op-list" id="ldVideoList">
                    <div className="op-listitem">
                      <input type="url" className="input-field" defaultValue="https://youtube.com/watch?v=example1" />
                      <button type="button" className="btn btn-ghost ld-video-remove">Remove</button>
                    </div>
                  </div>
                </section>

                <section className="card op-block">
                  <h2 className="section-title">Source</h2>
                  <label className="field"><span className="field__label">GDrive IMG folder</span>
                    <input type="url" className="input-field" defaultValue="https://drive.google.com/drive/folders/example" /></label>
                  <p className="field-hint">Reference only. Used once to seed the gallery during the transition; the OMS gallery is the source of truth from then on.</p>
                </section>
              </section>

              {/* ================= OPERATIONS ================= */}
              <section className="detail-panel" id="panelOperations" hidden>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Bookings</h2>
                    <div className="op-block__actions">
                      <a href="#" className="btn btn-ghost" target="_blank" rel="noopener">Open Bookings folder ↗</a>
                      <button type="button" className="btn btn-primary">Add booking</button>
                    </div>
                  </div>
                  <p className="field-hint">The Google Drive link is view-only here; edit it in Resources.</p>
                  <div className="work-list">
                    <table className="data-table">
                      <thead><tr><th>Customer name</th><th>Date of entry</th><th>Date of exit</th><th>Status</th><th className="th-edit"></th></tr></thead>
                      <tbody>
                        <tr><td>Sarah Wilson</td><td>01 Oct 2026</td><td>01 Oct 2027</td><td><span className="opp-chip opp-chip--stage">Upcoming</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Booking currency</span><select className="select-field"><option>IDR</option><option>USD</option><option>EUR</option><option>AUD</option></select></label>
                            <label className="field"><span className="field__label">Booking value</span><input type="text" className="input-field" defaultValue="31,000,000" /></label>
                            <label className="field"><span className="field__label">Gross commission</span><input type="text" className="input-field" defaultValue="2,480,000" /></label>
                            <label className="field"><span className="field__label">Sales agent</span><select className="select-field"><option>Ratna</option><option>Berry</option><option>Andries</option><option>Kashif</option></select></label>
                          </div>
                        </td></tr>
                        <tr><td>Tom Bradley</td><td>12 Mar 2026</td><td>12 Sep 2026</td><td><span className="opp-chip opp-chip--stage">Ongoing</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Booking currency</span><select className="select-field"><option>IDR</option><option>USD</option></select></label>
                            <label className="field"><span className="field__label">Booking value</span><input type="text" className="input-field" defaultValue="18,000,000" /></label>
                            <label className="field"><span className="field__label">Gross commission</span><input type="text" className="input-field" defaultValue="1,440,000" /></label>
                            <label className="field"><span className="field__label">Sales agent</span><select className="select-field"><option>Berry</option></select></label>
                          </div>
                        </td></tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Routine maintenance</h2>
                    <div className="op-block__actions">
                      <a href="#" className="btn btn-ghost" target="_blank" rel="noopener">Open Maintenance folder ↗</a>
                      <button type="button" className="btn btn-primary">Add job</button>
                    </div>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead><tr><th>Description</th><th>Date</th><th>Job rating</th><th>Status</th><th className="th-edit"></th></tr></thead>
                      <tbody>
                        <tr><td>Pool pump service</td><td>18 Aug 2026</td><td><span className="ld-stars">★★★★☆</span></td><td><span className="opp-chip opp-chip--stage">Done</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Provider name</span><input type="text" className="input-field" defaultValue="Made Renovations" /></label>
                            <label className="field"><span className="field__label">Provider WhatsApp</span><input type="tel" className="input-field" defaultValue="+62 817-4433-2211" /></label>
                            <label className="field"><span className="field__label">Ops agent</span><select className="select-field"><option>Kashif</option><option>Ratna</option></select></label>
                          </div>
                          <label className="field"><span className="field__label">Notes</span><textarea className="input-field input-field--area" rows={2}>Impeller replaced, filter cleaned.</textarea></label>
                        </td></tr>
                        <tr><td>Garden trim &amp; replanting</td><td>02 Sep 2026</td><td><span className="ld-stars">—</span></td><td><span className="opp-chip opp-chip--stage">Pending</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Provider name</span><input type="text" className="input-field" placeholder="Optional" /></label>
                            <label className="field"><span className="field__label">Provider WhatsApp</span><input type="tel" className="input-field" placeholder="Optional" /></label>
                            <label className="field"><span className="field__label">Ops agent</span><select className="select-field"><option>Unassigned</option><option>Kashif</option></select></label>
                          </div>
                          <label className="field"><span className="field__label">Notes</span><textarea className="input-field input-field--area" rows={2}></textarea></label>
                        </td></tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Inspections</h2>
                    <div className="op-block__actions">
                      <a href="#" className="btn btn-ghost" target="_blank" rel="noopener">Open Inspections folder ↗</a>
                      <button type="button" className="btn btn-primary">Add inspection</button>
                    </div>
                  </div>
                  <div className="work-list">
                    <table className="data-table">
                      <thead><tr><th>Type</th><th>Date</th><th>Job rating</th><th>Status</th><th className="th-edit"></th></tr></thead>
                      <tbody>
                        <tr><td>Move-in</td><td>01 Oct 2026</td><td><span className="ld-stars">—</span></td><td><span className="opp-chip opp-chip--stage">Pending</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Ops agent</span><select className="select-field"><option>Unassigned</option><option>Kashif</option><option>Ratna</option></select></label>
                          </div>
                          <label className="field"><span className="field__label">Notes</span><textarea className="input-field input-field--area" rows={2}></textarea></label>
                        </td></tr>
                        <tr><td>Move-Out</td><td>12 Sep 2026</td><td><span className="ld-stars">★★★☆☆</span></td><td><span className="opp-chip opp-chip--stage">Settlement Required</span></td><td><button type="button" className="icon-action ld-expand" aria-label="Show more">▾</button></td></tr>
                        <tr className="ld-more" hidden><td colSpan={5}>
                          <div className="op-grid">
                            <label className="field"><span className="field__label">Ops agent</span><select className="select-field"><option>Kashif</option></select></label>
                          </div>
                          <label className="field"><span className="field__label">Notes</span><textarea className="input-field input-field--area" rows={2}>Two broken tiles on the terrace; deposit deduction pending.</textarea></label>
                        </td></tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="card op-block">
                  <div className="op-block__head">
                    <h2 className="section-title">Issue log</h2>
                    <button type="button" className="btn btn-primary">Log issue</button>
                  </div>
                  <p className="field-hint">Status is driven by the linked task in My Work, so it cannot drift out of date here.</p>
                  <div className="work-list">
                    <table className="data-table">
                      <thead><tr><th>Issue</th><th>Date</th><th>Ops agent</th><th>Urgency</th><th>Status</th></tr></thead>
                      <tbody>
                        <tr><td>Water pressure low in guest house</td><td>28 Aug 2026</td><td>Kashif</td><td><span className="opp-chip opp-chip--high">Critical</span></td><td><a href="my-work.html" className="record-pill">My Work</a></td></tr>
                        <tr><td>Gate motor intermittent</td><td>22 Aug 2026</td><td>Ratna</td><td><span className="opp-chip opp-chip--med">Medium</span></td><td><a href="my-work.html" className="record-pill">My Work</a></td></tr>
                        <tr><td>Repaint north wall</td><td>14 Aug 2026</td><td>Unassigned</td><td><span className="opp-chip opp-chip--low">Low</span></td><td><a href="my-work.html" className="record-pill">My Work</a></td></tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </section>

    </>
  );
}
