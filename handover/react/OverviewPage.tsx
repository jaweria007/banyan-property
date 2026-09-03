'use client';

/*
 * OverviewPage
 * Copy to: app/(app)/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function OverviewPage() {
  return (
    <>
      {/* Dashboard header */}
              <section className="dash-header">
                <div className="dash-header__greet">
                  <h1 className="dash-greeting">Good morning, Admin <span className="dash-greeting__wave" aria-hidden="true">👋</span></h1>
                  <p className="dash-sub">Here's what needs your attention today.</p>
                </div>
                <div className="dash-header__meta">
                  <span className="dash-date" id="dashDate">Sat, Aug 7, 2026</span>
                  <button type="button" className="icon-btn dash-calbtn" id="headerCalendarBtn" aria-label="Jump to calendar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width={18} height={18} rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  </button>
                </div>
              </section>

              {/* Needs attention + Recent activity side by side */}
              <div className="dash-cols">

              {/* Needs attention */}
              <section className="attention" aria-labelledby="attentionTitle">
                <h2 className="section-title" id="attentionTitle">Needs attention</h2>
                <div className="attention-grid">
                  <article className="attention-card">
                    <span className="attention-card__icon attention-card__icon--blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </span>
                    <p className="attention-card__value">12</p>
                    <p className="attention-card__label">Candidates awaiting review</p>
                    <a href="#" className="attention-card__cta">
                      Review
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </article>

                  <article className="attention-card">
                    <span className="attention-card__icon attention-card__icon--red">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg>
                    </span>
                    <p className="attention-card__value">7</p>
                    <p className="attention-card__label">Listings stagnant &gt;48h</p>
                    <a href="#" className="attention-card__cta">
                      Review
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </article>

                  <article className="attention-card">
                    <span className="attention-card__icon attention-card__icon--purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15h6M9 11h2" /></svg>
                    </span>
                    <p className="attention-card__value">5</p>
                    <p className="attention-card__label">Drafts almost ready</p>
                    <a href="#" className="attention-card__cta">
                      Publish
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </article>

                  <article className="attention-card">
                    <span className="attention-card__icon attention-card__icon--green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    </span>
                    <p className="attention-card__value">4</p>
                    <p className="attention-card__label">Monitors requiring action</p>
                    <a href="#" className="attention-card__cta">
                      Check
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </article>
                </div>
              </section>

              {/* Recent activity + Upcoming */}
              <section className="duo-grid">
                <div className="card activity-card">
                  <div className="panel-head">
                    <h2 className="panel-title">Recent activity</h2>
                    <a href="#" className="panel-link">
                      View all
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                  <div className="activity__list">
                    <div className="activity__row">
                      <span className="activity__dot activity__dot--blue"></span>
                      <p className="activity__text">New viewing scheduled for 456 Oak Ave</p>
                      <span className="activity__time">2h ago</span>
                    </div>
                    <div className="activity__row">
                      <span className="activity__dot activity__dot--green"></span>
                      <p className="activity__text">5a Check-in completed at 123 Maple St</p>
                      <span className="activity__time">3h ago</span>
                    </div>
                    <div className="activity__row">
                      <span className="activity__dot activity__dot--purple"></span>
                      <p className="activity__text">Draft listing updated for 789 Pine Rd</p>
                      <span className="activity__time">5h ago</span>
                    </div>
                    <div className="activity__row">
                      <span className="activity__dot activity__dot--orange"></span>
                      <p className="activity__text">Contract sent for 234 Palm St</p>
                      <span className="activity__time">Yesterday</span>
                    </div>
                    <div className="activity__row">
                      <span className="activity__dot activity__dot--red"></span>
                      <p className="activity__text">5a Check-out completed at 321 Cedar Ln</p>
                      <span className="activity__time">Yesterday</span>
                    </div>
                  </div>
                </div>

                <div className="card upcoming-card">
                  <div className="panel-head">
                    <h2 className="panel-title">Upcoming</h2>
                  </div>
                  <div className="upcoming-list">
                    <div className="upcoming-item">
                      <span className="upcoming-dot upcoming-dot--green"></span>
                      <div className="upcoming-info">
                        <p className="upcoming-name">5a Check-in</p>
                        <p className="upcoming-addr">123 Maple St, Unit 5A</p>
                        <p className="upcoming-meta">Today · 9:00 AM</p>
                      </div>
                    </div>
                    <div className="upcoming-item">
                      <span className="upcoming-dot upcoming-dot--blue"></span>
                      <div className="upcoming-info">
                        <p className="upcoming-name">Viewing</p>
                        <p className="upcoming-addr">456 Oak Ave</p>
                        <p className="upcoming-meta">Today · 11:00 AM</p>
                      </div>
                    </div>
                    <div className="upcoming-item">
                      <span className="upcoming-dot upcoming-dot--orange"></span>
                      <div className="upcoming-info">
                        <p className="upcoming-name">Contract signing</p>
                        <p className="upcoming-addr">789 Pine Rd</p>
                        <p className="upcoming-meta">Tomorrow · 2:00 PM</p>
                      </div>
                    </div>
                    <div className="upcoming-item">
                      <span className="upcoming-dot upcoming-dot--red"></span>
                      <div className="upcoming-info">
                        <p className="upcoming-name">5a Check-out</p>
                        <p className="upcoming-addr">321 Cedar Ln</p>
                        <p className="upcoming-meta">Sat · 10:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="upcoming-cta">
                    View full schedule
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </section>

              </div>

              {/* Calendar */}
              <section className="card cal-card" id="calendarSection">
                <div className="cal-head">
                  <h2 className="cal-title">Calendar</h2>
                  <div className="cal-toolbar">
                    <button type="button" className="cal-today-btn" id="calToday">Today</button>
                    <button type="button" className="icon-btn" id="prevMonth" aria-label="Previous">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <span className="cal-month" id="calMonth">August 2026</span>
                    <button type="button" className="icon-btn" id="nextMonth" aria-label="Next">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                    </button>
                    <div className="seg" role="group" aria-label="Calendar view">
                      <button type="button" className="seg__btn is-active" data-view="week">Week</button>
                      <button type="button" className="seg__btn" data-view="month">Month</button>
                      <button type="button" className="seg__btn" data-view="list">List</button>
                    </div>
                    <label className="cal-filter">
                      <span className="cal-filter__label">Event</span>
                      <select id="calFilter" aria-label="Filter calendar events">
                        <option defaultValue="all">All events</option>
                        <option defaultValue="viewing">Viewing</option>
                        <option defaultValue="checkin">Check-in</option>
                        <option defaultValue="checkout">Check-out</option>
                        <option defaultValue="contract">Contract</option>
                        <option defaultValue="other">Other</option>
                      </select>
                    </label>
                  </div>
                  <div className="cal-picker" id="calPicker" hidden></div>
                </div>
                <div className="cal-body" id="calBody" aria-live="polite"></div>
                <div className="cal-legend">
                  <span className="cal-legend__item"><span className="cal-legend__dot cal-legend__dot--viewing"></span>Viewing</span>
                  <span className="cal-legend__item"><span className="cal-legend__dot cal-legend__dot--checkin"></span>Check-in</span>
                  <span className="cal-legend__item"><span className="cal-legend__dot cal-legend__dot--checkout"></span>Check-out</span>
                  <span className="cal-legend__item"><span className="cal-legend__dot cal-legend__dot--contract"></span>Contract</span>
                  <span className="cal-legend__item"><span className="cal-legend__dot cal-legend__dot--other"></span>Other</span>
                </div>
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
