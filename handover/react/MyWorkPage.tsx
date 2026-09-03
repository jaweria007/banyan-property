'use client';

/*
 * MyWorkPage
 * Copy to: app/(app)/tasks/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function MyWorkPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">My Work</h1>
                  <p className="page-subtitle">Your work queue — what needs doing, who owns it and when it is due.</p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-primary" id="newTaskBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    New Task
                  </button>
                </div>
              </section>

              {/* Queue summary — the visual guide for the day */}
              <section className="queue-stats" aria-label="Work summary">
                <button type="button" className="queue-stat is-active" data-queue="all">
                  <span className="queue-stat__value">18</span>
                  <span className="queue-stat__label">All open</span>
                </button>
                <button type="button" className="queue-stat" data-queue="todo">
                  <span className="queue-stat__value queue-stat__value--amber">6</span>
                  <span className="queue-stat__label">To Do</span>
                </button>
                <button type="button" className="queue-stat" data-queue="progress">
                  <span className="queue-stat__value queue-stat__value--blue">3</span>
                  <span className="queue-stat__label">In Progress</span>
                </button>
                <button type="button" className="queue-stat" data-queue="waiting">
                  <span className="queue-stat__value queue-stat__value--green">5</span>
                  <span className="queue-stat__label">Waiting</span>
                </button>
                <button type="button" className="queue-stat" data-queue="today">
                  <span className="queue-stat__value">2</span>
                  <span className="queue-stat__label">Due today</span>
                </button>
                <button type="button" className="queue-stat" data-queue="overdue">
                  <span className="queue-stat__value queue-stat__value--red">4</span>
                  <span className="queue-stat__label">Overdue</span>
                </button>
              </section>

              <div className="work-bar">
                <div className="view-toggle" role="group" aria-label="My Work view">
                  <button type="button" className="view-link is-active" data-workview="board" aria-pressed="true">Board</button>
                  <button type="button" className="view-link" data-workview="list" aria-pressed="false">List</button>
                </div>

                <div className="work-filters">
                  <label className="search-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input type="search" id="taskSearch" placeholder="Search tasks…" aria-label="Search tasks" />
                  </label>
                  <label className="select-wrap">
                    <span className="sr-only">Filter by record type</span>
                    <select className="select-field" id="taskHub">
                      <option defaultValue="all">All hubs</option>
                      <option defaultValue="Sales">Sales</option>
                      <option defaultValue="Listings">Listings</option>
                      <option defaultValue="Relationships">Relationships</option>
                      <option defaultValue="Marketing">Marketing</option>
                    </select>
                  </label>
                  <label className="select-wrap">
                    <span className="sr-only">Filter by assignee</span>
                    <select className="select-field" id="taskAssignee">
                      <option defaultValue="all">All team members</option>
                      <option defaultValue="Ratna">Ratna</option>
                      <option defaultValue="Berry">Berry</option>
                      <option defaultValue="Andries">Andries</option>
                      <option defaultValue="Kashif">Kashif</option>
                    </select>
                  </label>
                  <label className="select-wrap">
                    <span className="sr-only">Filter by due date</span>
                    <select className="select-field" id="taskDue">
                      <option defaultValue="all">Any due date</option>
                      <option defaultValue="overdue">Overdue</option>
                      <option defaultValue="today">Due today</option>
                      <option defaultValue="week">Due this week</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* ============ BOARD VIEW ============ */}
              {/* Status is the source of truth: dropping a card into a column sets its Status. */}
              <section className="board" id="taskBoard" aria-label="Task board">

                <div className="board-col" data-status="inbox">
                  <header className="board-col__head">
                    <h2 className="board-col__title">Inbox <span className="board-col__count">4</span></h2>
                    <p className="board-col__hint">Arrived, nobody has picked it up</p>
                  </header>
                  <div className="board-col__body" data-dropzone>

                    <article className="task-card" draggable data-task="t1" data-status="inbox" data-assignee="Unassigned" data-due="2026-09-04" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Viewing enquiry from Andries — 3-Bedroom Eco-Luxury Home in Taman Petanu</p>
                      <div className="task-card__meta">
                        <span className="task-chip task-chip--unassigned">Unassigned</span>
                        <span className="task-due">4 Sep</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales" title="Open linked Opportunity">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t2" data-status="inbox" data-assignee="Unassigned" data-due="2026-09-02" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Shortlist comment from Andries — 4-Bedroom Family Villa near Green School</p>
                      <div className="task-card__meta">
                        <span className="task-chip task-chip--unassigned">Unassigned</span>
                        <span className="task-due">2 Sep</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales" title="Open linked Opportunity">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t3" data-status="inbox" data-assignee="Unassigned" data-due="2026-08-08" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Contract signed — 2-Story Villa with Garden, Nyuh Kuning</p>
                      <div className="task-card__meta">
                        <span className="task-chip task-chip--unassigned">Unassigned</span>
                        <span className="task-due is-overdue">8 Aug</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales" title="Open linked Contract">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t4" data-status="inbox" data-assignee="Unassigned" data-due="2026-09-10" data-hub="Listings" tabIndex={0}>
                      <p className="task-card__desc">New listing needs photos and marketing copy — Bali Moons Shop</p>
                      <div className="task-card__meta">
                        <span className="task-chip task-chip--unassigned">Unassigned</span>
                        <span className="task-due">10 Sep</span>
                        <a href="listings.html" className="record-pill" data-hub="Listings" title="Open linked Listing">Listings</a>
                      </div>
                    </article>

                  </div>
                </div>

                <div className="board-col" data-status="todo">
                  <header className="board-col__head">
                    <h2 className="board-col__title">To Do <span className="board-col__count">3</span></h2>
                    <p className="board-col__hint">Someone needs to do it</p>
                  </header>
                  <div className="board-col__body" data-dropzone>

                    <article className="task-card" draggable data-task="t5" data-status="todo" data-assignee="Andries" data-due="2026-08-31" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Send contract to Umar Hassan</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Andries</span>
                        <span className="task-due is-overdue">31 Aug</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t6" data-status="todo" data-assignee="Ratna" data-due="2026-09-01" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Review new matches — Umar / 3BR Ubud Family Home</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Ratna</span>
                        <span className="task-due is-today">Today</span>
                        <a href="shortlist.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t7" data-status="todo" data-assignee="Kashif" data-due="2026-09-05" data-hub="Listings" tabIndex={0}>
                      <p className="task-card__desc">Chase owner for lease extension documents</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Kashif</span>
                        <span className="task-due">5 Sep</span>
                        <a href="listing-detail.html" className="record-pill" data-hub="Listings">Listings</a>
                      </div>
                    </article>

                  </div>
                </div>

                <div className="board-col" data-status="progress">
                  <header className="board-col__head">
                    <h2 className="board-col__title">In Progress <span className="board-col__count">3</span></h2>
                    <p className="board-col__hint">Actively being worked on</p>
                  </header>
                  <div className="board-col__body" data-dropzone>

                    <article className="task-card" draggable data-task="t8" data-status="progress" data-assignee="Berry" data-due="2026-09-01" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Prepare shortlist for M. Samo — Ubud family homes</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Berry</span>
                        <span className="task-due is-today">Today</span>
                        <a href="shortlist.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t9" data-status="progress" data-assignee="Ratna" data-due="2026-09-03" data-hub="Relationships" tabIndex={0}>
                      <p className="task-card__desc">Verify landlord contact details — Maria Santos</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Ratna</span>
                        <span className="task-due">3 Sep</span>
                        <a href="relationships.html" className="record-pill" data-hub="Relationships">Relationships</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t10" data-status="progress" data-assignee="Kashif" data-due="2026-09-06" data-hub="Marketing" tabIndex={0}>
                      <p className="task-card__desc">Publish September blog post — Ubud rental guide</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Kashif</span>
                        <span className="task-due">6 Sep</span>
                        <a href="#" className="record-pill" data-hub="Marketing">Marketing</a>
                      </div>
                    </article>

                  </div>
                </div>

                <div className="board-col" data-status="waiting">
                  <header className="board-col__head">
                    <h2 className="board-col__title">Waiting <span className="board-col__count">3</span></h2>
                    <p className="board-col__hint">Blocked / waiting on someone else</p>
                  </header>
                  <div className="board-col__body" data-dropzone>

                    <article className="task-card" draggable data-task="t11" data-status="waiting" data-assignee="Ratna" data-due="2026-08-30" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Follow up with Umar after viewing</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Ratna</span>
                        <span className="task-due is-overdue">30 Aug</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t12" data-status="waiting" data-assignee="Berry" data-due="2026-09-08" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Awaiting client decision on Villa A offer</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Berry</span>
                        <span className="task-due">8 Sep</span>
                        <a href="opportunities.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card" draggable data-task="t13" data-status="waiting" data-assignee="Andries" data-due="2026-09-12" data-hub="Listings" tabIndex={0}>
                      <p className="task-card__desc">Waiting on notary for freehold certificate</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Andries</span>
                        <span className="task-due">12 Sep</span>
                        <a href="listing-detail.html" className="record-pill" data-hub="Listings">Listings</a>
                      </div>
                    </article>

                  </div>
                </div>

                <div className="board-col" data-status="done">
                  <header className="board-col__head">
                    <h2 className="board-col__title">Done <span className="board-col__count">2</span></h2>
                    <p className="board-col__hint">Completed</p>
                  </header>
                  <div className="board-col__body" data-dropzone>

                    <article className="task-card is-done" draggable data-task="t14" data-status="done" data-assignee="Ratna" data-due="2026-08-28" data-hub="Sales" tabIndex={0}>
                      <p className="task-card__desc">Publish shortlist — Umar / Ubud Family Homes</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Ratna</span>
                        <span className="task-due">28 Aug</span>
                        <a href="shortlist.html" className="record-pill" data-hub="Sales">Sales</a>
                      </div>
                    </article>

                    <article className="task-card is-done" draggable data-task="t15" data-status="done" data-assignee="Berry" data-due="2026-08-26" data-hub="Relationships" tabIndex={0}>
                      <p className="task-card__desc">Log viewing for Sarah Wilson</p>
                      <div className="task-card__meta">
                        <span className="task-chip">Berry</span>
                        <span className="task-due">26 Aug</span>
                        <a href="relationships.html" className="record-pill" data-hub="Relationships">Relationships</a>
                      </div>
                    </article>

                  </div>
                </div>

              </section>

              {/* ============ LIST VIEW ============ */}
              {/* Four columns only. The [Sales] pill sits at the end of the description. */}
              <section className="work-list" id="taskList" hidden aria-label="Task list">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col" className="th-sort" data-sort="desc">Task Description</th>
                      <th scope="col" className="th-sort" data-sort="status">Status</th>
                      <th scope="col" className="th-sort" data-sort="assignee">Assignee</th>
                      <th scope="col" className="th-sort" data-sort="due">Due</th>
                    </tr>
                  </thead>
                  <tbody id="taskListBody"></tbody>
                </table>
                <p className="list-empty" id="taskListEmpty" hidden>No tasks match your filters.</p>
              </section>

              {/* Task detail / edit drawer */}
              <button className="drawer-backdrop" id="taskBackdrop" aria-label="Close task" hidden></button>
              <aside className="drawer" id="taskDrawer" aria-labelledby="taskDrawerTitle" aria-hidden="true">
                <header className="drawer__head">
                  <h2 className="drawer__title" id="taskDrawerTitle">Task</h2>
                  <button type="button" className="icon-btn drawer__close" id="taskDrawerClose" aria-label="Close task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                  </button>
                </header>

                <div className="drawer__body">
                  <label className="field">
                    <span className="field__label">Task Description</span>
                    <textarea className="input-field input-field--area" id="tdDesc" rows={3}></textarea>
                  </label>

                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Status</span>
                      <select className="select-field" id="tdStatus">
                        <option defaultValue="inbox">Inbox</option>
                        <option defaultValue="todo">To Do</option>
                        <option defaultValue="progress">In Progress</option>
                        <option defaultValue="waiting">Waiting</option>
                        <option defaultValue="done">Done</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Assignee</span>
                      <select className="select-field" id="tdAssignee">
                        <option defaultValue="Unassigned">Unassigned</option>
                        <option defaultValue="Ratna">Ratna</option>
                        <option defaultValue="Berry">Berry</option>
                        <option defaultValue="Andries">Andries</option>
                        <option defaultValue="Kashif">Kashif</option>
                      </select>
                    </label>
                  </div>

                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Due date</span>
                      <input type="date" className="input-field" id="tdDue" />
                    </label>
                    <label className="field">
                      <span className="field__label">Priority</span>
                      <select className="select-field" id="tdPriority">
                        <option defaultValue="normal">Normal</option>
                        <option defaultValue="high">High</option>
                        <option defaultValue="critical">Critical</option>
                      </select>
                    </label>
                  </div>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Linked record</h3>
                    <label className="field">
                      <span className="field__label">Search by name, WhatsApp, shortlist, listing or record ID</span>
                      <input type="search" className="input-field" id="tdLink" list="recordOptions" placeholder="e.g. Umar Hassan, REL-00124, 0812…" />
                      <datalist id="recordOptions">
                        <option defaultValue="Umar Hassan · REL-00124 · Buyer"></option>
                        <option defaultValue="Sarah Wilson · REL-00318 · Tenant"></option>
                        <option defaultValue="Maria Santos · REL-00072 · Landlord"></option>
                        <option defaultValue="3BR Villa — Nyuh Kuning · LST-0421"></option>
                        <option defaultValue="Bali Moons Shop · LST-0388"></option>
                        <option defaultValue="Umar — Ubud Family Homes · SHL-0091"></option>
                      </datalist>
                    </label>
                    <p className="field-hint" id="tdLinkCurrent">Currently linked to <a href="opportunities.html">Sales · Opportunity</a></p>
                  </section>

                  <label className="field">
                    <span className="field__label">Notes</span>
                    <textarea className="input-field input-field--area" id="tdNotes" rows={4} placeholder="Anything the next person needs to know…"></textarea>
                  </label>
                </div>

                <footer className="drawer__foot">
                  <button type="button" className="btn btn-ghost" id="tdDelete">Delete</button>
                  <button type="button" className="btn btn-primary" id="tdSave">Save task</button>
                </footer>
              </aside>



    </>
  );
}
