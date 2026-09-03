'use client';

/*
 * ShortlistBuilderPage
 * Copy to: app/(app)/opportunities/[id]/shortlist/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ShortlistBuilderPage() {
  return (
    <>
      <section className="page-head sb-head">
                <div>
                  <p className="sb-crumb"><a href="opportunities.html">Opportunities</a> › Umar Hassan</p>
                  <h1 className="page-title">Shortlist Builder</h1>
                  <p className="page-subtitle">Define what the client wants, find matching properties, select them, publish.</p>
                </div>

                {/* The two things that always matter: what I picked, and what I should review */}
                <div className="sb-head__meta">
                  <span className="sb-status" id="sbStatus" data-state="draft">Draft</span>
                  <button type="button" className="sb-counter" id="sbCounter" title="Open the shortlist draft">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    Shortlist <span className="sb-counter__num" id="sbCount">0</span>
                  </button>
                  <button type="button" className="sb-newpill" id="sbNewPill" hidden>
                    <span className="sb-newpill__dot"></span>
                    <span id="sbNewCount">0</span> new to review
                  </button>
                  <button type="button" className="btn btn-primary" id="sbPublishTop">Publish shortlist</button>
                </div>
              </section>

              {/* Search Criteria → Selection → Shortlist Draft */}
              <nav className="sb-steps" aria-label="Shortlist workflow">
                <button type="button" className="sb-step is-active" data-step="criteria">
                  <span className="sb-step__num">1</span>
                  <span className="sb-step__label">Search Criteria</span>
                </button>
                <button type="button" className="sb-step" data-step="selection">
                  <span className="sb-step__num">2</span>
                  <span className="sb-step__label">Selection</span>
                  <span className="sb-step__count" id="sbSelCount">0</span>
                  <span className="sb-newbadge sb-step__new" id="sbSelNew" hidden>+0 NEW</span>
                </button>
                <button type="button" className="sb-step" data-step="draft">
                  <span className="sb-step__num">3</span>
                  <span className="sb-step__label">Shortlist Draft</span>
                  <span className="sb-step__count" id="sbDraftCount">0</span>
                </button>
              </nav>

              {/* ================= STEP 1 — SEARCH CRITERIA ================= */}
              <section className="sb-panel" id="stepCriteria" aria-label="Search criteria">
                <div className="sb-panel__head">
                  <div>
                    <h2 className="sb-h2">Search criteria for Umar</h2>
                    <p className="sb-hint">Save more than one brief — clients often want a stretch option and a safer one.</p>
                  </div>
                  <button type="button" className="btn btn-ghost" id="sbAddCriteria">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    Add search criteria
                  </button>
                </div>

                <div className="sb-criteria-list" id="sbCriteriaList"></div>
              </section>

              {/* ================= STEP 2 — SELECTION ================= */}
              <section className="sb-panel" id="stepSelection" hidden aria-label="Selection">
                <div className="sb-panel__head">
                  <div>
                    <button type="button" className="sb-back" data-goto="criteria">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                      Back to criteria
                    </button>
                    <h2 className="sb-h2">Selection</h2>
                    <p className="sb-hint">Your searches feed this list. Review each one and either add it to the shortlist or set it aside — nothing reaches the client until you add it.</p>
                  </div>
                  <div className="sb-selstats">
                    <span className="sb-selstat"><strong id="sbOptionCount">0</strong> to review</span>
                    <span className="sb-selstat sb-selstat--new" id="sbNewStat" hidden><strong id="sbNewStatNum">0</strong> new</span>
                    <button type="button" className="btn btn-ghost" id="sbMarkSeen" hidden>Mark all reviewed</button>
                  </div>
                </div>

                <div className="sb-selfilter" id="sbSelFilter" hidden>
                  <button type="button" className="seg__btn is-active" data-selfilter="all">All</button>
                  <button type="button" className="seg__btn" data-selfilter="new">New only</button>
                </div>

                <div className="sb-cards" id="sbOptions"></div>
                <p className="list-empty" id="sbOptionsEmpty" hidden>You have reviewed every option for this search.</p>

                {/* Rejected properties stay out of this shortlist's future searches */}
                <details className="sb-rejected" id="sbRejectedWrap" hidden>
                  <summary className="sb-rejected__summary">
                    Not for client · <span id="sbRejectedCount">0</span>
                  </summary>
                  <ul className="sb-rejected__list" id="sbRejectedList"></ul>
                </details>
              </section>

              {/* ================= STEP 3 — SHORTLIST DRAFT ================= */}
              <section className="sb-panel" id="stepDraft" hidden aria-label="Shortlist draft">
                <div className="sb-panel__head">
                  <div>
                    <button type="button" className="sb-back" data-goto="selection">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                      Back to Selection
                    </button>
                    <h2 className="sb-h2">Shortlist draft</h2>
                    <p className="sb-hint">This is close to what the client will see. Removing returns a property to Selection — it is not rejected.</p>
                  </div>
                </div>

                <div className="sb-cards" id="sbDraft"></div>
                <p className="list-empty" id="sbDraftEmpty">Nothing selected yet. Generate options and pick the properties you like.</p>

                {/* Publish */}
                <section className="sb-publish" id="sbPublish">
                  <div className="sb-publish__draft" id="sbPublishDraft">
                    <div>
                      <h3 className="sb-h3">Publish shortlist</h3>
                      <p className="sb-hint">The client gets a link — no account needed.</p>
                    </div>
                    <div className="sb-publish__row">
                      <label className="field sb-publish__name">
                        <span className="field__label">Shortlist name</span>
                        <input type="text" className="input-field" id="sbName" defaultValue="Umar — Ubud Family Homes" placeholder="e.g. Umar — Ubud Family Homes" />
                      </label>
                      <button type="button" className="btn btn-primary" id="sbPublishBtn">Publish shortlist</button>
                      <a href="client-shortlist.html" target="_blank" rel="noopener" className="btn btn-ghost" id="sbPreview">Preview</a>
                    </div>
                    <p className="field-hint" id="sbPublishHint"></p>
                  </div>

                  <div className="sb-publish__live" id="sbPublishLive" hidden>
                    <p className="sb-published">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      Shortlist published
                    </p>
                    <code className="sb-url" id="sbUrl">banyan.properties/s/xxxxx</code>
                    <div className="sb-publish__row">
                      <button type="button" className="btn btn-ghost" id="sbCopy">Copy link</button>
                      <a href="client-shortlist.html" target="_blank" rel="noopener" className="btn btn-ghost" id="sbPreview2">Preview as client</a>
                      <a href="client-shortlist.html" target="_blank" rel="noopener" className="btn btn-primary" id="sbOpen">Open shortlist</a>
                    </div>
                    <p className="sb-hint" id="sbLiveHint">This shortlist is live. Anything you add now appears for the client straight away — the link never changes.</p>
                  </div>
                </section>
              </section>


    </>
  );
}
