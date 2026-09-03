'use client';

/*
 * ClientInboxPage
 * Copy to: app/(app)/sales/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ClientInboxPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Client Inbox <span className="page-count" id="inboxCount">16</span></h1>
                  <p className="page-subtitle">
                    Every client, their journey and what needs attention.
                    <a href="listings.html" className="subtle-link">← Back to Listings</a>
                  </p>
                </div>
              </section>

              <section className="inbox-summary" aria-label="Pipeline summary">

                <article className="inbox-card inbox-card--overdue">
                  <span className="inbox-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  </span>
                  <div className="inbox-card__num">2</div>
                  <div className="inbox-card__label">Follow-up Overdue</div>
                </article>

                <article className="inbox-card inbox-card--high">
                  <span className="inbox-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V4a1 1 0 0 1 1-1h15l-3.5 4L20 11H5" /></svg>
                  </span>
                  <div className="inbox-card__num">1</div>
                  <div className="inbox-card__label">High Priority</div>
                </article>

                <article className="inbox-card inbox-card--new">
                  <span className="inbox-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                  </span>
                  <div className="inbox-card__num">12</div>
                  <div className="inbox-card__label">New</div>
                </article>

                <article className="inbox-card inbox-card--viewing">
                  <span className="inbox-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width={18} height={18} rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                  </span>
                  <div className="inbox-card__num">2</div>
                  <div className="inbox-card__label">Viewing</div>
                </article>

                <article className="inbox-card inbox-card--shortlist">
                  <span className="inbox-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                  </span>
                  <div className="inbox-card__num">1</div>
                  <div className="inbox-card__label">Shortlist Active</div>
                </article>

              </section>

              <div className="toolbar inbox-toolbar">
                <label className="search-field">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                  <input type="search" id="inboxSearch" placeholder="Search name, phone, email…" aria-label="Search clients" />
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Filter by stage</span>
                  <select className="select-field" id="journeySelect">
                    <option defaultValue="all">All stages</option>
                    <option defaultValue="New">New</option>
                    <option defaultValue="Viewing">Viewing</option>
                    <option defaultValue="Contracts">Contracts</option>
                    <option defaultValue="Shortlist Active">Shortlist Active</option>
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Filter by interest</span>
                  <select className="select-field" id="interestSelect">
                    <option defaultValue="all">All interest</option>
                    <option defaultValue="Rent">Rent</option>
                    <option defaultValue="Rent, Buy Villa">Rent &amp; Buy Villa</option>
                    <option defaultValue="none">No interest</option>
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Filter by objective</span>
                  <select className="select-field" id="objectiveSelect">
                    <option defaultValue="all">All objectives</option>
                    <option defaultValue="Unsure">Unsure</option>
                    <option defaultValue="Find Short-Term Accommodation">Find short-term accommodation</option>
                    <option defaultValue="Find Long-Term Home">Find long-term home</option>
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Filter by agent</span>
                  <select className="select-field" id="agentSelect">
                    <option defaultValue="all">All agents</option>
                    <option defaultValue="kashif">kashif</option>
                    <option defaultValue="none">Unassigned</option>
                  </select>
                </label>
                <button type="button" className="btn btn-primary btn-filter" id="inboxFilterBtn">Filter</button>
                <button type="button" className="btn btn-ghost" id="inboxResetBtn">Reset</button>
              </div>

              <section className="inbox-table" aria-label="Client list">
                <table className="inbox-table__grid">
                  <thead>
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Journey</th>
                      <th scope="col">Interest</th>
                      <th scope="col">Objective</th>
                      <th scope="col">Agent</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Needs Attention</th>
                    </tr>
                  </thead>
                  <tbody id="inboxBody">

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="Follow-up Overdue" data-query="unnamed">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">—</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td><span className="inbox-chip inbox-chip--status inbox-chip--overdue">Follow-up Overdue</span></td>
                    </tr>

                    <tr className="inbox-row" data-journey="Contracts" data-interest="" data-objective="Unsure" data-agent="kashif" data-priority="high" data-attention="Follow-up Overdue" data-query="umar 123">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">umar</p>
                            <p className="inbox-phone">123</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">Contracts</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td><span className="inbox-chip inbox-chip--agent">kashif</span></td>
                      <td><span className="inbox-chip inbox-chip--high">High priority</span></td>
                      <td><span className="inbox-chip inbox-chip--status inbox-chip--overdue">Follow-up Overdue</span></td>
                    </tr>

                    <tr className="inbox-row" data-journey="Viewing" data-interest="Rent" data-objective="Find Short-Term Accommodation" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">Viewing</span></td>
                      <td className="inbox-muted">Rent</td>
                      <td className="inbox-objective">Find Short-Term Accommodation</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="Rent, Buy Villa" data-objective="Find Short-Term Accommodation" data-agent="" data-priority="med" data-attention="" data-query="umar 123">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">umar</p>
                            <p className="inbox-phone">123</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">Rent, Buy Villa</td>
                      <td className="inbox-objective">Find Short-Term Accommodation</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="umar 123">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">umar</p>
                            <p className="inbox-phone">123</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="Viewing" data-interest="Rent" data-objective="Find Long-Term Home" data-agent="" data-priority="med" data-attention="" data-query="umar 123">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">umar</p>
                            <p className="inbox-phone">123</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">Viewing</span></td>
                      <td className="inbox-muted">Rent</td>
                      <td className="inbox-objective">Find Long-Term Home</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="New" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="unnamed 08123456789">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">Unnamed</p>
                            <p className="inbox-phone">08123456789</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">New</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                    <tr className="inbox-row" data-journey="Shortlist Active" data-interest="" data-objective="Unsure" data-agent="" data-priority="med" data-attention="" data-query="umar 123">
                      <td>
                        <div className="inbox-client">
                          <span className="inbox-avatar">U</span>
                          <div>
                            <p className="inbox-name">umar</p>
                            <p className="inbox-phone">123</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="inbox-chip inbox-chip--journey">Shortlist Active</span></td>
                      <td className="inbox-muted">—</td>
                      <td className="inbox-objective">Unsure</td>
                      <td className="inbox-muted">—</td>
                      <td><span className="inbox-chip inbox-chip--medium">Medium priority</span></td>
                      <td className="inbox-muted">—</td>
                    </tr>

                  </tbody>
                </table>
                <p className="inbox-empty" id="inboxEmpty" hidden>No clients match your filters.</p>
              </section>


    </>
  );
}
