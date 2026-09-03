'use client';

/*
 * AvailabilityPage
 * Copy to: app/(app)/master/availability/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function AvailabilityPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Availability</h1>
                  <p className="page-subtitle">Portfolio-wide lease expiries and upcoming availability.</p>
                </div>
              </section>

              <section className="avail-grid" aria-label="Availability overview">

                <article className="avail-card">
                  <div className="avail-card__head">
                    <span className="avail-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width={18} height={18} rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    </span>
                    <h2 className="avail-card__title">Upcoming Lease Events</h2>
                    <span className="avail-card__count" id="leaseCount">0</span>
                  </div>

                  <div className="filter-tabs" role="group" aria-label="Filter lease events">
                    <button type="button" className="filter-tab is-active" data-filter="all">All</button>
                    <button type="button" className="filter-tab" data-filter="7">Next 7 days</button>
                    <button type="button" className="filter-tab" data-filter="30">Next 30 days</button>
                    <button type="button" className="filter-tab" data-filter="60">Next 60 days</button>
                    <button type="button" className="filter-tab" data-filter="expired">Expired</button>
                  </div>

                  <div className="avail-body" id="leaseEvents">
                    <p className="avail-empty">No lease events match.</p>
                  </div>
                </article>

                <article className="avail-card">
                  <div className="avail-card__head">
                    <span className="avail-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
                    </span>
                    <h2 className="avail-card__title">Current Availability</h2>
                    <span className="avail-card__count" id="currentCount">0</span>
                  </div>

                  <div className="avail-body">
                    <p className="avail-empty">Nothing currently available.</p>
                  </div>
                </article>

                <article className="avail-card">
                  <div className="avail-card__head">
                    <span className="avail-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </span>
                    <h2 className="avail-card__title">Future Availability</h2>
                    <span className="avail-card__count" id="futureCount">0</span>
                  </div>

                  <div className="avail-body">
                    <p className="avail-empty">No upcoming availability.</p>
                  </div>
                </article>

              </section>

              <section className="card cal-card">
                <div className="cal-head">
                  <div className="cal-nav">
                    <button type="button" className="icon-btn" id="prevMonth" aria-label="Previous month">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button type="button" className="icon-btn" id="nextMonth" aria-label="Next month">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                    </button>
                    <h2 className="cal-month" id="calMonth">August 2026</h2>
                    <span className="cal-today" id="todayLabel">Today · Sat, Aug 7</span>
                  </div>
                  <div className="seg" role="group" aria-label="Calendar view">
                    <button type="button" className="seg__btn is-active" data-view="month">Month</button>
                    <button type="button" className="seg__btn" data-view="week">Week</button>
                  </div>
                </div>
                <div className="cal-body" id="calBody" aria-live="polite"></div>
              </section>


      {/* ===== drawers / modals belonging to this page ===== */}
      <div className="modal-overlay" id="dayModal" hidden>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dayModalTitle">
            <div className="modal__head">
              <h3 className="modal__title" id="dayModalTitle">August 2, 2026</h3>
              <button type="button" className="modal__close" id="dayModalClose" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="modal__body" id="dayModalBody"></div>
          </div>
        </div>
    </>
  );
}
