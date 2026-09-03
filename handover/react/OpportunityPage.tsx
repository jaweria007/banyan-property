'use client';

/*
 * OpportunityPage
 * Copy to: app/(app)/opportunities/[id]/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function OpportunityPage() {
  return (
    <>
      {/* Header: who, where they are, who owns it — then the action status */}
              <section className="op-head">
                <div className="op-head__main">
                  <p className="sb-crumb"><a href="opportunities.html">Opportunities</a> › Umar Hassan</p>
                  <h1 className="page-title">Umar Hassan</h1>
                  <div className="op-head__facts">
                    <span className="opp-chip opp-chip--stage">In Contact</span>
                    <span className="op-fact"><span className="op-fact__label">Type</span> Villa</span>
                    <span className="op-fact"><span className="op-fact__label">Urgency</span> High</span>
                    <span className="op-fact"><span className="op-fact__label">Agent</span> Ratna</span>
                  </div>
                  <p className="op-actionstatus">
                    <span className="action-dot action-dot--orange"></span>
                    <strong>Needs Action</strong>
                    <span className="field-hint">Follow up after Tuesday's viewing</span>
                  </p>
                </div>

                <div className="op-head__side">
                  {/* Contact affordance, not navigation */}
                  <a href="https://wa.me/6285678901234" target="_blank" rel="noopener" className="btn-whatsapp">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                    WhatsApp
                  </a>

                  {/* Everything that used to be a permanent button lives here */}
                  <div className="op-actionmenu">
                    <button type="button" className="btn btn-primary" id="opActionBtn" aria-expanded="false" aria-haspopup="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                      Action
                      <svg className="op-actionmenu__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <div className="op-actionmenu__list" id="opActionList" hidden role="menu">
                      <button type="button" role="menuitem" data-action="task">Create task</button>
                      <button type="button" role="menuitem" data-action="viewing">Log viewing</button>
                      <button type="button" role="menuitem" data-action="offer">Record offer</button>
                      <button type="button" role="menuitem" data-action="contract">Generate contract</button>
                      <button type="button" role="menuitem" data-action="waiting">Mark as waiting…</button>
                    </div>
                  </div>
                </div>
              </section>

              <nav className="op-tabs" role="tablist" aria-label="Opportunity sections">
                <button type="button" className="op-tab is-active" role="tab" aria-selected="true" data-tab="requirements">Requirements</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-tab="shortlist">Shortlist</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-tab="contract">Contract</button>
                <button type="button" className="op-tab" role="tab" aria-selected="false" data-tab="history">History</button>
              </nav>

              {/* ================= REQUIREMENTS ================= */}
              <section className="op-panel" id="tabRequirements" role="tabpanel">

                <section className="op-block">
                  <h2 className="op-h2">Client</h2>
                  <div className="op-grid">
                    <label className="field"><span className="field__label">Name</span><input type="text" className="input-field" defaultValue="Umar Hassan" /></label>
                    <label className="field"><span className="field__label">WhatsApp</span><input type="tel" className="input-field" defaultValue="+62 856-7890-1234" /></label>
                    <label className="field"><span className="field__label">Email</span><input type="email" className="input-field" defaultValue="umar@example.com" /></label>
                    <label className="field"><span className="field__label">Nationality</span><input type="text" className="input-field" defaultValue="Pakistani" /></label>
                    <label className="field"><span className="field__label">Channel</span>
                      <select className="select-field"><option>Website</option><option>WhatsApp</option><option>Referral</option><option>Scout</option><option>Walk-in</option></select></label>
                    <label className="field"><span className="field__label">Relationship</span>
                      <input type="text" className="input-field" defaultValue="REL-00124" readOnly /></label>
                  </div>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Search brief</h2>
                  <div className="op-grid">
                    <label className="field"><span className="field__label">Primary location</span>
                      <select className="select-field"><option>Ubud</option><option>Canggu</option><option>Uluwatu</option><option>Seminyak</option><option>Sanur</option></select></label>
                    <label className="field"><span className="field__label">Secondary locations</span>
                      <input type="text" className="input-field" defaultValue="Nyuh Kuning, Singakerta, Penestanan" /></label>
                    <label className="field"><span className="field__label">Bedrooms (minimum)</span><input type="number" className="input-field" defaultValue="3" /></label>
                    <label className="field"><span className="field__label">Budget</span><input type="text" className="input-field" defaultValue="IDR 20m–50m per year" /></label>
                    <label className="field"><span className="field__label">Duration</span>
                      <select className="select-field"><option>12 months</option><option>6 months</option><option>3 months</option><option>24 months+</option></select></label>
                    <label className="field"><span className="field__label">Move-in</span><input type="date" className="input-field" defaultValue="2026-10-01" /></label>
                  </div>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Detailed requirements</h2>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Pool</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Large Private Pool (&gt;10m)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Private Pool (&lt;10m)</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Shared</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>None</span></label>
                    </div>
                  </div>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Garden &amp; outdoor</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Private garden</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Shared garden</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Outdoor Fireplace</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Playground &amp; Play Area</span></label>
                    </div>
                  </div>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">View</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Rice Field View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Jungle View</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Ocean View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Garden View</span></label>
                    </div>
                  </div>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Kitchen &amp; living</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Enclosed Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Open Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Semi-Open living</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Enclosed living</span></label>
                    </div>
                  </div>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Access &amp; pets</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Car Access</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Motorbike Access</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Pet Friendly</span></label>
                    </div>
                  </div>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Notes</h2>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Our assessment — Target Renter</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" /><span>Budget Home (10–20m)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Lifestyle Home (20–35m)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Premium Home (35–60m)</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Executive Home (60m+)</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Perfect Home (Challenging Requirement)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Fit for Pets</span></label>
                    </div>
                  </div>

                  <div className="op-tagblock">
                    <h3 className="sb-h4">Our assessment — Target Buyer</h3>
                    <div className="tagset">
                      <label className="tag-check"><input type="checkbox" defaultChecked /><span>Family &amp; Lifestyle</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Investor (Passive Income)</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Retiree</span></label>
                      <label className="tag-check"><input type="checkbox" /><span>Land Banker</span></label>
                    </div>
                  </div>

                  <label className="field">
                    <span className="field__label">Client requirements, in their words</span>
                    <textarea className="input-field input-field--area" rows={3}>Wants somewhere the kids can run around, close enough to Nyuh Kuning to walk to the village. Would trade a bedroom for a bigger garden.</textarea>
                  </label>

                  <label className="field">
                    <span className="field__label">Team notes</span>
                    <textarea className="input-field input-field--area" rows={3}>Decisive once he has seen a place in person — get viewings booked early. Partner is the one to convince on the garden.</textarea>
                  </label>
                </section>
              </section>

              {/* ================= SHORTLIST ================= */}
              <section className="op-panel" id="tabShortlist" role="tabpanel" hidden>

                <section className="op-block">
                  <div className="op-block__head">
                    <div>
                      <h2 className="op-h2">Live shortlist</h2>
                      <p className="sb-hint">Umar — Ubud Family Homes · published 28 Aug</p>
                    </div>
                    <div className="op-block__actions">
                      <span className="sb-status" data-state="published">Published</span>
                      <a href="shortlist.html" className="btn btn-ghost">Edit shortlist</a>
                      <a href="client-shortlist.html" target="_blank" rel="noopener" className="btn btn-primary">Open client view</a>
                    </div>
                  </div>
                  <code className="sb-url">banyan.properties/s/k3f9d</code>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Client favourites <span className="page-count">3</span></h2>
                  <ul className="op-list">
                    <li className="op-listitem">
                      <div><strong>3-Bedroom Family Villa with Private Pool &amp; Garden</strong><span className="field-hint">Singakerta, Ubud · IDR 32m</span></div>
                      <span className="op-when">Favourited 2 Sep</span>
                    </li>
                    <li className="op-listitem">
                      <div><strong>3-Bedroom Eco-Luxury Home, Taman Petanu</strong><span className="field-hint">Pejeng, Ubud · IDR 36m</span></div>
                      <span className="op-when">Favourited 2 Sep</span>
                    </li>
                    <li className="op-listitem">
                      <div><strong>4-Bedroom Family Villa Near Green School</strong><span className="field-hint">Sibang, Bali · IDR 47m</span></div>
                      <span className="op-when">Favourited 1 Sep</span>
                    </li>
                  </ul>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Recommended for this brief</h2>
                  <ul className="op-list">
                    <li className="op-listitem">
                      <div><strong>Alke Villa — Quiet Lane, Walk to Centre</strong><span className="field-hint">Penestanan, Ubud · IDR 35m · matches 6 of 7 criteria</span></div>
                      <div className="op-listitem__actions">
                        <a href="shortlist.html" className="btn btn-ghost">Add to shortlist</a>
                        <button type="button" className="btn btn-ghost">Dismiss</button>
                      </div>
                    </li>
                    <li className="op-listitem">
                      <div><strong>Thoughtfully Designed 3BR Eco Villa, Sibang</strong><span className="field-hint">Sibang, Bali · IDR 29m · matches 6 of 7 criteria</span></div>
                      <div className="op-listitem__actions">
                        <a href="shortlist.html" className="btn btn-ghost">Add to shortlist</a>
                        <button type="button" className="btn btn-ghost">Dismiss</button>
                      </div>
                    </li>
                  </ul>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Viewings</h2>
                  <ul className="op-list">
                    <li className="op-listitem">
                      <div><strong>3-Bedroom Family Villa, Singakerta</strong><span className="field-hint">With Ratna · client attended</span></div>
                      <span className="op-when">26 Aug, 15:30</span>
                    </li>
                    <li className="op-listitem">
                      <div><strong>2-Story Villa with Garden, Nyuh Kuning</strong><span className="field-hint">With Berry · client attended</span></div>
                      <span className="op-when">21 Aug, 10:00</span>
                    </li>
                  </ul>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Shortlist activity</h2>
                  <ul className="op-list">
                    <li className="op-listitem"><div><strong>Client asked: “Is the pool private?”</strong><span className="field-hint">3-Bedroom Family Villa, Singakerta</span></div><span className="op-when">2 Sep, 16:35</span></li>
                    <li className="op-listitem"><div><strong>Client opened the shortlist</strong><span className="field-hint">4 properties viewed</span></div><span className="op-when">2 Sep, 16:30</span></li>
                    <li className="op-listitem"><div><strong>Shortlist published</strong><span className="field-hint">5 properties</span></div><span className="op-when">28 Aug, 14:20</span></li>
                  </ul>
                </section>
              </section>

              {/* ================= CONTRACT ================= */}
              <section className="op-panel" id="tabContract" role="tabpanel" hidden>
                <section className="op-block">
                  <div className="op-block__head">
                    <h2 className="op-h2">Transaction</h2>
                    <span className="opp-chip opp-chip--stage">Negotiating</span>
                  </div>
                  <div className="op-grid">
                    <label className="field"><span className="field__label">Property</span><input type="text" className="input-field" defaultValue="3-Bedroom Family Villa, Singakerta" /></label>
                    <label className="field"><span className="field__label">Agreed price</span><input type="text" className="input-field" defaultValue="IDR 31,000,000 / year" /></label>
                    <label className="field"><span className="field__label">Start date</span><input type="date" className="input-field" defaultValue="2026-10-01" /></label>
                    <label className="field"><span className="field__label">Term</span><input type="text" className="input-field" defaultValue="12 months" /></label>
                    <label className="field"><span className="field__label">Deposit</span><input type="text" className="input-field" defaultValue="IDR 5,000,000" /></label>
                    <label className="field"><span className="field__label">Agreed commission</span><input type="text" className="input-field" defaultValue="8%" /></label>
                  </div>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Contracts</h2>
                  <ul className="op-list">
                    <li className="op-listitem">
                      <div><strong>Rental agreement — draft v2</strong><span className="field-hint">Sent to client 30 Aug · awaiting signature</span></div>
                      <div className="op-listitem__actions"><a href="#" className="btn btn-ghost">Open</a></div>
                    </li>
                    <li className="op-listitem">
                      <div><strong>Booking form</strong><span className="field-hint">Signed 28 Aug</span></div>
                      <div className="op-listitem__actions"><a href="#" className="btn btn-ghost">Open</a></div>
                    </li>
                  </ul>
                </section>

                <section className="op-block">
                  <h2 className="op-h2">Offers</h2>
                  <ul className="op-list">
                    <li className="op-listitem"><div><strong>IDR 31,000,000 / year</strong><span className="field-hint">Accepted by owner</span></div><span className="op-when">29 Aug</span></li>
                    <li className="op-listitem"><div><strong>IDR 29,000,000 / year</strong><span className="field-hint">Declined — owner countered at 32m</span></div><span className="op-when">27 Aug</span></li>
                  </ul>
                </section>
              </section>

              {/* ================= HISTORY ================= */}
              {/* The place to answer "what happened with this lead?" */}
              <section className="op-panel" id="tabHistory" role="tabpanel" hidden>
                <section className="op-block">
                  <h2 className="op-h2">History</h2>
                  <ol className="op-timeline">
                    <li className="op-tl"><span className="op-tl__when">03 Sep · 10:21</span><span className="op-tl__who">Ratna</span><p className="op-tl__what">Reviewed 5 new matches</p></li>
                    <li className="op-tl"><span className="op-tl__when">02 Sep · 16:35</span><span className="op-tl__who op-tl__who--client">Client</span><p className="op-tl__what">Asked: “Is the pool private?”</p></li>
                    <li className="op-tl"><span className="op-tl__when">02 Sep · 16:32</span><span className="op-tl__who op-tl__who--client">Client</span><p className="op-tl__what">Favourited “3BR Villa — Nyuh Kuning”</p></li>
                    <li className="op-tl"><span className="op-tl__when">01 Sep · 09:15</span><span className="op-tl__who">Ratna</span><p className="op-tl__what">Added Villa A to shortlist</p></li>
                    <li className="op-tl"><span className="op-tl__when">29 Aug · 11:40</span><span className="op-tl__who">Ratna</span><p className="op-tl__what">Offer recorded — IDR 31m accepted by owner</p></li>
                    <li className="op-tl"><span className="op-tl__when">28 Aug · 14:20</span><span className="op-tl__who op-tl__who--system">System</span><p className="op-tl__what">Shortlist published</p></li>
                    <li className="op-tl"><span className="op-tl__when">27 Aug · 11:00</span><span className="op-tl__who">Ratna</span><p className="op-tl__what">Search “3BR Ubud Family Home” generated — 12 matches</p></li>
                    <li className="op-tl"><span className="op-tl__when">26 Aug · 15:30</span><span className="op-tl__who">Ratna</span><p className="op-tl__what">Viewing logged — 3-Bedroom Family Villa, Singakerta</p></li>
                    <li className="op-tl"><span className="op-tl__when">21 Aug · 10:00</span><span className="op-tl__who">Berry</span><p className="op-tl__what">Viewing logged — 2-Story Villa with Garden</p></li>
                    <li className="op-tl"><span className="op-tl__when">18 Aug · 09:02</span><span className="op-tl__who op-tl__who--system">System</span><p className="op-tl__what">Stage changed New → In Contact</p></li>
                    <li className="op-tl"><span className="op-tl__when">17 Aug · 18:44</span><span className="op-tl__who op-tl__who--system">System</span><p className="op-tl__what">Opportunity created from Website enquiry</p></li>
                  </ol>
                </section>
              </section>



      {/* ===== drawers / modals belonging to this page ===== */}
      {/* Tasks are a layer across the Opportunity, not a tab */}
            <button className="drawer-backdrop" id="opTaskBackdrop" aria-label="Close" hidden></button>
            <aside className="drawer" id="opTaskDrawer" aria-labelledby="opTaskTitle" aria-hidden="true">
              <header className="drawer__head">
                <h2 className="drawer__title" id="opTaskTitle">Create task</h2>
                <button type="button" className="icon-btn drawer__close" id="opTaskClose" aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                </button>
              </header>
              <div className="drawer__body" id="opTaskBody">
                <label className="field">
                  <span className="field__label">Task Description</span>
                  <textarea className="input-field input-field--area" id="opTaskDesc" rows={3} placeholder="Follow up with Umar after viewing"></textarea>
                </label>
                <div className="drawer-row drawer-row--2">
                  <label className="field"><span className="field__label">Status</span>
                    <select className="select-field"><option>Inbox</option><option defaultSelected>To Do</option><option>In Progress</option><option>Waiting</option><option>Done</option></select></label>
                  <label className="field"><span className="field__label">Assignee</span>
                    <select className="select-field"><option>Ratna</option><option>Berry</option><option>Andries</option><option>Kashif</option><option>Unassigned</option></select></label>
                </div>
                <label className="field"><span className="field__label">Due date</span><input type="date" className="input-field" /></label>
                <p className="field-hint">Linked to <strong>Umar Hassan</strong> · this task appears in My Work and drives the Action status.</p>
              </div>
              <footer className="drawer__foot">
                <button type="button" className="btn btn-ghost" id="opTaskCancel">Cancel</button>
                <button type="button" className="btn btn-primary" id="opTaskSave">Create task</button>
              </footer>
            </aside>

            <div className="cs-toast" id="opToast" hidden></div>
    </>
  );
}
