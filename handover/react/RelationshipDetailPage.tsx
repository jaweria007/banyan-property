'use client';

/*
 * RelationshipDetailPage
 * Copy to: app/(app)/relationships/[id]/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function RelationshipDetailPage() {
  return (
    <>
      <a className="sb-back" href="relationships.html">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                Back to Relationships
              </a>

              {/* Header mirrors the card: WHO -> TYPE -> how to reach them */}
              <section className="rd-head">
                <div className="rd-head__who">
                  <div className="rd-head__title">
                    <h1 className="page-title" id="rdName">—</h1>
                    <span className="rel-type" id="rdType">—</span>
                    <span className="rel-id" id="rdId">—</span>
                  </div>
                  <p className="rd-head__company" id="rdCompany"></p>
                  <div className="rd-head__contact">
                    <span className="rel-wa" id="rdWa" data-wa="">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 8 8 0 0 0 2.9.7 2.5 2.5 0 0 0 1.7-.8 2.1 2.1 0 0 0 .4-1.4c0-.2-.1-.2-.3-.3z" /></svg>
                      <span id="rdWaLabel">—</span>
                    </span>
                    <a className="rd-mail" id="rdEmail" href="#">—</a>
                    <span className="rd-assigned">Assigned to <strong id="rdAgent">—</strong></span>
                  </div>
                </div>

                <div className="rd-head__actions">
                  <button type="button" className="btn btn-primary" id="rdNewTask">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    Create Task
                  </button>
                </div>
              </section>

              {/* Same four facts as the card, so the two never disagree */}
              <section className="rd-facts" id="rdFacts"></section>

              <div className="rd-cols">
                <div className="rd-main">

                  {/* The workspace: what needs doing, then what has happened */}
                  <section className="card op-block">
                    <div className="op-block__head">
                      <h2 className="section-title">Open tasks</h2>
                      <a href="my-work.html" className="record-pill">My Work</a>
                    </div>
                    <ul className="op-list" id="rdTasks"></ul>
                    <p className="list-empty" id="rdTasksEmpty" hidden>Nothing open. Nice.</p>
                  </section>

                  <section className="card op-block">
                    <h2 className="section-title">Activity history</h2>
                    <ol className="op-timeline" id="rdHistory"></ol>
                  </section>

                  <section className="card op-block">
                    <div className="op-block__head">
                      <h2 className="section-title">Notes</h2>
                    </div>
                    <label className="field">
                      <span className="field__label">Add a note</span>
                      <textarea className="input-field input-field--area" id="rdNoteText" rows={2} placeholder="Preferences, context, anything the next person should know…"></textarea>
                    </label>
                    <div className="rd-noterow">
                      <button type="button" className="btn btn-primary" id="rdAddNote">Add note</button>
                    </div>
                    <ul className="op-list" id="rdNotes"></ul>
                  </section>

                  <section className="card op-block">
                    <h2 className="section-title">Connected records</h2>
                    <ul className="op-list" id="rdConnections"></ul>
                    <p className="field-hint">Named, not coded — the internal IDs stay out of the way.</p>
                  </section>
                </div>

                <aside className="rd-side">

                  <section className="card op-block">
                    <h2 className="section-title">Contact details</h2>
                    <dl className="rd-kv" id="rdContact"></dl>
                  </section>

                  {/* Where applicable, per the feedback */}
                  <section className="card op-block" id="rdBrokerCard" hidden>
                    <h2 className="section-title">Referring broker / partner</h2>
                    <a className="rd-broker" id="rdBrokerLink" href="relationships.html">
                      <span className="rd-broker__name" id="rdBrokerName">—</span>
                      <span className="rd-broker__meta" id="rdBrokerMeta">—</span>
                    </a>
                  </section>

                  <section className="card op-block">
                    <h2 className="section-title">Activity with Banyan</h2>
                    <dl className="rd-kv" id="rdActivity"></dl>
                  </section>

                  <section className="card op-block">
                    <h2 className="section-title">Documents</h2>
                    <ul className="op-list" id="rdDocs"></ul>
                    <p className="field-hint">Documents belong to the property, booking or contract that owns them — Google Drive stays the source of truth.</p>
                  </section>
                </aside>
              </div>

              {/* Deeper CRM detail, out of the way until it is wanted */}
              <details className="rd-deeper">
                <summary className="rd-deeper__summary">Marketing attribution &amp; CRM detail</summary>
                <div className="rd-deeper__body">
                  <section className="card op-block">
                    <h2 className="section-title">First touch</h2>
                    <dl className="rd-kv rd-kv--wide" id="rdFirstTouch"></dl>
                  </section>
                  <section className="card op-block">
                    <h2 className="section-title">Lifecycle</h2>
                    <dl className="rd-kv rd-kv--wide" id="rdLifecycle"></dl>
                    <p className="field-hint">Derived from the relationship's event stream on every read — never stored, so it cannot go stale.</p>
                  </section>
                  <section className="card op-block">
                    <h2 className="section-title">Preferences</h2>
                    <div className="op-grid">
                      <label className="field"><span className="field__label">Acquisition source</span>
                        <select className="select-field"><option>Unset</option><option>Website</option><option>Referral</option><option>Scout</option><option>Walk-in</option></select></label>
                      <label className="field"><span className="field__label">Preferred channel</span>
                        <select className="select-field"><option>Unset</option><option>WhatsApp</option><option>Email</option><option>Phone</option></select></label>
                      <label className="field"><span className="field__label">Communication frequency</span>
                        <select className="select-field"><option>Unset</option><option>Weekly</option><option>Monthly</option><option>Only when relevant</option></select></label>
                      <label className="field"><span className="field__label">Newsletter</span>
                        <select className="select-field"><option>Unset</option><option>Subscribed</option><option>Unsubscribed</option></select></label>
                    </div>
                  </section>
                </div>
              </details>

              {/* Create Task, consistent with My Work and the Opportunity page */}
              <button className="drawer-backdrop" id="rdTaskBackdrop" aria-label="Close" hidden></button>
              <aside className="drawer" id="rdTaskDrawer" aria-labelledby="rdTaskTitle" aria-hidden="true">
                <header className="drawer__head">
                  <h2 className="drawer__title" id="rdTaskTitle">Create task</h2>
                  <button type="button" className="icon-btn drawer__close" id="rdTaskClose" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                  </button>
                </header>
                <div className="drawer__body">
                  <label className="field">
                    <span className="field__label">Task Description</span>
                    <textarea className="input-field input-field--area" id="rdTaskDesc" rows={3} placeholder="Call about the lease renewal"></textarea>
                  </label>
                  <div className="drawer-row drawer-row--2">
                    <label className="field"><span className="field__label">Status</span>
                      <select className="select-field"><option>Inbox</option><option defaultSelected>To Do</option><option>In Progress</option><option>Waiting</option><option>Done</option></select></label>
                    <label className="field"><span className="field__label">Assignee</span>
                      <select className="select-field"><option>Ratna</option><option>Berry</option><option>Andries</option><option>Kashif</option><option>Unassigned</option></select></label>
                  </div>
                  <label className="field"><span className="field__label">Due date</span><input type="date" className="input-field" /></label>
                  <p className="field-hint">Linked to <strong id="rdTaskLink">this relationship</strong> · appears in My Work and drives the Actions status.</p>
                </div>
                <footer className="drawer__foot">
                  <button type="button" className="btn btn-ghost" id="rdTaskCancel">Cancel</button>
                  <button type="button" className="btn btn-primary" id="rdTaskSave">Create task</button>
                </footer>
              </aside>

              <div className="cs-toast" id="rdToast" hidden></div>
    </>
  );
}
