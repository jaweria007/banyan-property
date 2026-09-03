'use client';

/*
 * SupplyAnalysisPage
 * Copy to: app/(app)/master/supply/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function SupplyAnalysisPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Supply Analysis</h1>
                  <p className="page-subtitle">
                    Live inventory summary — all counts computed from current listings.
                    <a href="listings.html" className="subtle-link">← Back to Listings</a>
                  </p>
                </div>
              </section>

              <section className="supply-summary" aria-label="Inventory summary">

                <article className="supply-card">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
                    </span>
                    <h2 className="supply-card__title">Inventory by Property Type</h2>
                  </div>
                  <div className="supply-card__body">
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Rent</span><b>207</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '100%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Buy</span><b>153</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--gold" style={{ width: '74%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Land</span><b>33</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--olive" style={{ width: '16%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Commercial</span><b>10</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--slate" style={{ width: '5%' }}></span></div>
                    </div>
                  </div>
                  <div className="supply-card__total"><span>Total listings</span><b>403</b></div>
                </article>

                <article className="supply-card">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </span>
                    <h2 className="supply-card__title">Workflow Distribution</h2>
                  </div>
                  <div className="supply-card__body">
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Inbox</span><b>3</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '1%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Enrich</span><b>33</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--gold" style={{ width: '15%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Review</span><b>0</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--olive" style={{ width: '0%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Live</span><b>222</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--slate" style={{ width: '100%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>Closed</span><b>145</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '65%' }}></span></div>
                    </div>
                  </div>
                  <div className="supply-card__total"><span>Total listings</span><b>403</b></div>
                </article>

                <article className="supply-card">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M15 9a4 4 0 1 0 0 6" /></svg>
                    </span>
                    <h2 className="supply-card__title">Rentals — Price Bands</h2>
                    <span className="supply-card__unit">monthly IDR</span>
                  </div>
                  <div className="supply-card__body">
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&lt; IDR 25M</span><b>36</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '100%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>IDR 25M–50M</span><b>35</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--gold" style={{ width: '97%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>IDR 50M–100M</span><b>18</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--olive" style={{ width: '50%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>IDR 100M–200M</span><b>5</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--slate" style={{ width: '14%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&gt; IDR 200M</span><b>6</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '17%' }}></span></div>
                    </div>
                    <div className="supply-row supply-row--muted">
                      <div className="supply-row__label"><span>No price</span><b>2</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--faded" style={{ width: '6%' }}></span></div>
                    </div>
                  </div>
                  <div className="supply-card__total"><span>Total</span><b>102</b></div>
                </article>

                <article className="supply-card">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1" fill="currentColor" /></svg>
                    </span>
                    <h2 className="supply-card__title">Villa Sales — Price Bands</h2>
                    <span className="supply-card__unit">USD</span>
                  </div>
                  <div className="supply-card__body">
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&lt; $250k</span><b>12</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '92%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>$250–500k</span><b>13</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--gold" style={{ width: '100%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>$500k–1M</span><b>1</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--olive" style={{ width: '8%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&gt; $1M</span><b>3</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--slate" style={{ width: '23%' }}></span></div>
                    </div>
                    <div className="supply-row supply-row--muted">
                      <div className="supply-row__label"><span>No price</span><b>85</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--faded" style={{ width: '0%' }}></span></div>
                    </div>
                  </div>
                  <div className="supply-card__total"><span>Total</span><b>114</b></div>
                </article>

              </section>

              <section className="supply-lower" aria-label="Inventory by area and land price bands">

                <article className="supply-card supply-areas">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 20l-5.4-5.4a2 2 0 0 1 0-2.8L9 6.4a2 2 0 0 1 2.8 0l5.4 5.4" /><path d="M3 20h18" /></svg>
                    </span>
                    <h2 className="supply-card__title">Inventory by Area</h2>
                  </div>
                  <p className="supply-note">Click a primary area to see its secondary areas.</p>

                  <div className="supply-area-list" id="areaList">

                    <div className="supply-area is-open">
                      <button type="button" className="supply-area__head" aria-expanded="true">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                        <span className="supply-area__name">Ubud</span>
                        <span className="supply-area__count">229</span>
                      </button>
                      <div className="supply-area__body">
                        <div className="supply-area__inner">
                          <div className="supply-area__sub">
                            <span className="supply-area__sub-name">(area only)</span>
                            <span className="supply-area__sub-count">229</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="supply-area">
                      <button type="button" className="supply-area__head" aria-expanded="false">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                        <span className="supply-area__name">Sanur</span>
                        <span className="supply-area__count">1</span>
                      </button>
                      <div className="supply-area__body">
                        <div className="supply-area__inner">
                          <div className="supply-area__sub">
                            <span className="supply-area__sub-name">(area only)</span>
                            <span className="supply-area__sub-count">1</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="supply-area">
                      <button type="button" className="supply-area__head" aria-expanded="false">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                        <span className="supply-area__name">Bukit</span>
                        <span className="supply-area__count">17</span>
                      </button>
                      <div className="supply-area__body">
                        <div className="supply-area__inner">
                          <div className="supply-area__sub">
                            <span className="supply-area__sub-name">(area only)</span>
                            <span className="supply-area__sub-count">17</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="supply-area">
                      <button type="button" className="supply-area__head" aria-expanded="false">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                        <span className="supply-area__name">Tanah Lot – Canggu</span>
                        <span className="supply-area__count">2</span>
                      </button>
                      <div className="supply-area__body">
                        <div className="supply-area__inner">
                          <div className="supply-area__sub">
                            <span className="supply-area__sub-name">(area only)</span>
                            <span className="supply-area__sub-count">2</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="supply-area">
                      <button type="button" className="supply-area__head" aria-expanded="false">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                        <span className="supply-area__name">Nusa &amp; Gili Islands</span>
                        <span className="supply-area__count">2</span>
                      </button>
                      <div className="supply-area__body">
                        <div className="supply-area__inner">
                          <div className="supply-area__sub">
                            <span className="supply-area__sub-name">(area only)</span>
                            <span className="supply-area__sub-count">2</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="supply-area supply-area--unmapped">
                      <div className="supply-area__head">
                        <span className="supply-area__chev">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z" /></svg>
                        </span>
                        <span className="supply-area__name">Unmapped</span>
                        <span className="supply-area__count">7</span>
                      </div>
                    </div>

                  </div>
                </article>

                <article className="supply-card">
                  <div className="supply-card__head">
                    <span className="supply-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </span>
                    <h2 className="supply-card__title">Land — Price Bands</h2>
                    <span className="supply-card__unit">USD</span>
                  </div>
                  <div className="supply-card__body">
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&lt; $150k</span><b>3</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar" style={{ width: '100%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>$150–300k</span><b>2</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--gold" style={{ width: '67%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>$300–750k</span><b>2</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--olive" style={{ width: '67%' }}></span></div>
                    </div>
                    <div className="supply-row">
                      <div className="supply-row__label"><span>&gt; $750k</span><b>0</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--slate" style={{ width: '0%' }}></span></div>
                    </div>
                    <div className="supply-row supply-row--muted">
                      <div className="supply-row__label"><span>No price</span><b>25</b></div>
                      <div className="supply-row__track"><span className="supply-row__bar supply-row__bar--faded" style={{ width: '0%' }}></span></div>
                    </div>
                  </div>
                  <div className="supply-card__total"><span>Total</span><b>32</b></div>
                </article>

              </section>

              <section className="supply-detail" aria-label="Detailed inventory by secondary area and price band">

                <div className="supply-section-head">
                  <h2 className="supply-section-title">Secondary Area × Price Band</h2>
                  <p className="supply-section-note">Mapped and unmapped listings across areas, broken down by asking price.</p>
                </div>

                <div className="supply-tables">

                  <div className="supply-table-card">
                    <div className="supply-table-head">
                      <h3>Rentals — Secondary Area × Price Band</h3>
                      <span className="supply-table-unit">monthly IDR</span>
                    </div>
                    <div className="supply-table-wrap">
                      <table className="supply-table">
                        <thead>
                          <tr>
                            <th scope="col">Secondary Area</th>
                            <th scope="col">&lt; IDR 25M</th>
                            <th scope="col">IDR 25M–50M</th>
                            <th scope="col">IDR 50M–100M</th>
                            <th scope="col">IDR 100M–200M</th>
                            <th scope="col">&gt; IDR 200M</th>
                            <th scope="col">No price</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Ubud</th>
                            <td>36</td><td>35</td><td>18</td><td>5</td><td>5</td><td>2</td>
                            <td className="supply-table__total-cell">101</td>
                          </tr>
                          <tr>
                            <th scope="row">Unmapped</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td>1</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="supply-table-card">
                    <div className="supply-table-head">
                      <h3>Villa Sales — Secondary Area × Price Band</h3>
                      <span className="supply-table-unit">USD</span>
                    </div>
                    <div className="supply-table-wrap">
                      <table className="supply-table">
                        <thead>
                          <tr>
                            <th scope="col">Secondary Area</th>
                            <th scope="col">&lt; $250k</th>
                            <th scope="col">$250–500k</th>
                            <th scope="col">$500k–1M</th>
                            <th scope="col">&gt; $1M</th>
                            <th scope="col">No price</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Ubud</th>
                            <td>10</td><td>10</td><td>1</td><td>3</td><td>69</td>
                            <td className="supply-table__total-cell">93</td>
                          </tr>
                          <tr>
                            <th scope="row">Bukit</th>
                            <td>2</td><td>3</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>11</td>
                            <td className="supply-table__total-cell">16</td>
                          </tr>
                          <tr>
                            <th scope="row">Nusa &amp; Gili Islands</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>2</td>
                            <td className="supply-table__total-cell">2</td>
                          </tr>
                          <tr>
                            <th scope="row">Sanur</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                          <tr>
                            <th scope="row">Tanah Lot – Canggu</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                          <tr>
                            <th scope="row">Unmapped</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="supply-table-card">
                    <div className="supply-table-head">
                      <h3>Land — Secondary Area × Price Band</h3>
                      <span className="supply-table-unit">USD</span>
                    </div>
                    <div className="supply-table-wrap">
                      <table className="supply-table">
                        <thead>
                          <tr>
                            <th scope="col">Secondary Area</th>
                            <th scope="col">&lt; $150k</th>
                            <th scope="col">$150–300k</th>
                            <th scope="col">$300–750k</th>
                            <th scope="col">&gt; $750k</th>
                            <th scope="col">No price</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Ubud</th>
                            <td>3</td><td>2</td><td>2</td>
                            <td className="supply-table__zero">&middot;</td><td>22</td>
                            <td className="supply-table__total-cell">29</td>
                          </tr>
                          <tr>
                            <th scope="row">Bukit</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                          <tr>
                            <th scope="row">Tanah Lot – Canggu</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                          <tr>
                            <th scope="row">Unmapped</th>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td>
                            <td className="supply-table__zero">&middot;</td><td>1</td>
                            <td className="supply-table__total-cell">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </section>


    </>
  );
}
