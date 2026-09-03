'use client';

/*
 * GrowthDashboardPage
 * Copy to: app/(app)/reporting/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function GrowthDashboardPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Growth Dashboard</h1>
                  <p className="page-subtitle">The AARRR funnel at a glance. Every card and every row answers to the one time filter below.</p>
                </div>
                <div className="page-head__actions">
                  <a href="reporting-community.html" className="btn btn-ghost">Community Dashboard</a>
                </div>
              </section>

              {/* One filter drives every card and every KPI row */}
              <div className="work-bar">
                <div className="seg" role="group" aria-label="Time period" id="growthPeriod">
                  <button type="button" className="seg__btn" data-period="today">Today</button>
                  <button type="button" className="seg__btn" data-period="week">This Week</button>
                  <button type="button" className="seg__btn is-active" data-period="month">This Month</button>
                  <button type="button" className="seg__btn" data-period="quarter">This Quarter</button>
                  <button type="button" className="seg__btn" data-period="year">This Year</button>
                  <button type="button" className="seg__btn" data-period="custom">Custom range</button>
                </div>
                <p className="sb-hint" id="growthPeriodNote">Showing <strong>This Month</strong> · the URL keeps your selection.</p>
              </div>

              <div className="drawer-row drawer-row--2 rp-custom" id="growthCustom" hidden>
                <label className="field"><span className="field__label">From</span><input type="date" className="input-field" id="growthFrom" /></label>
                <label className="field"><span className="field__label">To</span><input type="date" className="input-field" id="growthTo" /></label>
              </div>

              {/* Acquisition -> Activation -> Retention -> Conversion -> Referral */}
              <section className="rp-funnel" id="growthFunnel" aria-label="Funnel stages"></section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">KPI table</h2>
                    <p className="sb-hint">Every KPI at once. Click a row to open the operational list behind it.</p>
                  </div>
                </div>
                <div className="work-list">
                  <table className="data-table rp-kpi">
                    <thead>
                      <tr>
                        <th scope="col" className="th-sort is-asc" data-sort="kpi">KPI</th>
                        <th scope="col" className="th-sort" data-sort="stage">Stage</th>
                        <th scope="col" className="th-sort" data-sort="current">Current</th>
                        <th scope="col" className="th-sort" data-sort="previous">Previous</th>
                        <th scope="col" className="th-sort" data-sort="change">% change</th>
                        <th scope="col" className="th-sort" data-sort="trend">Trend</th>
                        <th scope="col">Sync</th>
                      </tr>
                    </thead>
                    <tbody id="kpiBody"></tbody>
                  </table>
                </div>
                <p className="list-empty" id="kpiEmpty" hidden>No KPIs for this period.</p>
              </section>

              <section className="op-block">
                <h2 className="section-title">More report cards</h2>
                <p className="sb-hint">Listings, Sales, Operations and Finance dashboards are planned — each needs its own spec before it is built.</p>
                <div className="rp-soon">
                  <article className="rp-sooncard">
                    <div className="rp-sooncard__head"><h3>Listings</h3><span className="rp-soonpill">Coming soon</span></div>
                    <p>Listing performance and portfolio health</p>
                  </article>
                  <article className="rp-sooncard">
                    <div className="rp-sooncard__head"><h3>Sales</h3><span className="rp-soonpill">Coming soon</span></div>
                    <p>Opportunities, conversion and closed deals</p>
                  </article>
                  <article className="rp-sooncard">
                    <div className="rp-sooncard__head"><h3>Operations</h3><span className="rp-soonpill">Coming soon</span></div>
                    <p>Task, pipeline and workflow throughput</p>
                  </article>
                  <article className="rp-sooncard">
                    <div className="rp-sooncard__head"><h3>Finance</h3><span className="rp-soonpill">Coming soon</span></div>
                    <p>Revenue, fees and financial summaries</p>
                  </article>
                </div>
              </section>




    </>
  );
}
