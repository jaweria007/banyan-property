'use client';

/*
 * PortfolioPage
 * Copy to: app/(app)/master/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function PortfolioPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">Portfolio<span className="page-count" id="listingsCount">10</span></h1>
                  <p className="page-subtitle">
                    <span id="viewSubtitle">Manage your property listings. View performance, status and take action.</span>
                    <a href="#" className="subtle-link">Show empty/reserved rows</a>
                  </p>
                </div>
                <div className="page-head__actions">
                  <button type="button" className="btn btn-ghost btn-filters-toggle" id="filtersToggle" aria-expanded="true" aria-controls="listingsToolbar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></svg>
                    <span className="btn-filters-toggle__label">Hide filters</span>
                  </button>
                  <div className="view-toggle" role="group" aria-label="Listings view">
                    <button type="button" className="view-link is-active" data-view="cards" aria-pressed="true">Cards</button>
                    <button type="button" className="view-link" data-view="table" aria-pressed="false">Table</button>
                  </div>
                </div>
              </section>

              <nav className="cat-tabs" id="catTabs" aria-label="Listing filters">
                <button type="button" className="cat-tab is-active" data-category="all">All <span className="tab-count">10</span></button>
                <button type="button" className="cat-tab" data-category="rent">Rent <span className="tab-count">0</span></button>
                <button type="button" className="cat-tab" data-category="sale">Sale <span className="tab-count">1</span></button>
                <button type="button" className="cat-tab" data-category="land">Land <span className="tab-count">0</span></button>
                <button type="button" className="cat-tab" data-category="commercial">Commercial <span className="tab-count">10</span></button>
                <button type="button" className="cat-tab" data-stage="inbox">Inbox <span className="tab-count">0</span></button>
                <button type="button" className="cat-tab" data-stage="enrich">Enrich <span className="tab-count">10</span></button>
                <button type="button" className="cat-tab" data-stage="review">Review <span className="tab-count">0</span></button>
                <button type="button" className="cat-tab" data-stage="live">Live <span className="tab-count">0</span></button>
                <button type="button" className="cat-tab" data-stage="closed">Closed <span className="tab-count">0</span></button>
              </nav>

              <div className="toolbar" id="listingsToolbar">
                <label className="select-wrap">
                  <span className="sr-only">Filter by area</span>
                  <select className="select-field select-field--areas" id="areaSelect">
                    <option defaultValue="all">Areas — 5 mapped · 7 unmapped listings</option>
                    <option defaultValue="Ubud">Ubud</option>
                    <option defaultValue="unmapped">Unmapped</option>
                  </select>
                </label>
                <label className="search-field">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                  <input type="search" id="searchInput" placeholder="Search name, ID, location…" aria-label="Search listings" />
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Marketing status</span>
                  <select className="select-field" id="marketingSelect">
                    <option defaultValue="all">Marketing: all</option>
                    <option defaultValue="promoted">Promoted</option>
                    <option defaultValue="none">Not promoted</option>
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Availability status</span>
                  <select className="select-field" id="statusSelect">
                    <option defaultValue="all">All statuses</option>
                    <option defaultValue="available">Available</option>
                    <option defaultValue="negotiation">Under Negotiation</option>
                    <option defaultValue="upon-request">Upon Request</option>
                    <option defaultValue="rented">Rented</option>
                    <option defaultValue="sold">Sold</option>
                    <option defaultValue="archived">Archived</option>
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="sr-only">Sort listings</span>
                  <select className="select-field" id="sortSelect">
                    <option defaultValue="recent" defaultSelected>Sort: recently updated</option>
                    <option defaultValue="name">Sort: name</option>
                    <option defaultValue="price-asc">Price ↑</option>
                    <option defaultValue="price-desc">Price ↓</option>
                  </select>
                </label>
                <button type="button" className="btn btn-primary btn-filter" id="filterBtn" aria-controls="advSearch" aria-expanded="false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18" /><path d="M6 12h12" /><path d="M10 19h4" /></svg>
                  Advanced search
                  <span className="adv-count" id="advCount" hidden>0</span>
                </button>
                <button type="button" className="btn btn-ghost" id="resetBtn">Reset</button>
              </div>

              <section className="listings-grid" id="listingsGrid" aria-label="Property listings">

                <article className="list-card list-card--link" data-category="sale" data-stage="enrich" data-status="available" data-marketing="none" data-id="BUY-1301" data-name="Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud" data-location="Ubud" data-price="0" data-updated="2026-08-10" data-complete="64" data-tasks="0" data-health="64" data-detail="listing-detail.html" role="link" tabIndex={0} title="Open listing detail">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">BUY-1301</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 10 Aug 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price list-price--none">&mdash;</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>64%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">64% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '64%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1352" data-name="210m² Commercial Office Space in Campuhan" data-location="Ubud" data-price="5000000000" data-updated="2026-05-19" data-complete="100" data-tasks="0" data-health="54">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1352</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 19 May 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">210m² Commercial Office Space in Campuhan</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 5,000,000,000</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>54%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">100% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '100%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1351" data-name="6 Bedroom Boutique Leasehold Hotel for Sale" data-location="Ubud" data-price="5670000000" data-updated="2026-05-19" data-complete="100" data-tasks="0" data-health="62">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1351</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 19 May 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">6 Bedroom Boutique Leasehold Hotel for Sale</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 5,670,000,000</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>62%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">100% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '100%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1362" data-name="Alam Ubud Estate - TBD" data-location="" data-price="77173835885" data-updated="2026-06-08" data-complete="40" data-tasks="0" data-health="23">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1362</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 08 Jun 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Alam Ubud Estate - TBD</h3>
                    <div className="list-card__meta">
                      <span className="list-location list-location--none">No area mapped</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 77,173,835,885</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>23%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">40% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '40%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1361" data-name="Bali Moons Shop" data-location="Ubud" data-price="715400564" data-updated="2026-06-08" data-complete="100" data-tasks="0" data-health="62">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1361</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 08 Jun 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Bali Moons Shop</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 715,400,564</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>62%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">100% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '100%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1354" data-name="Freehold Boutique Hotel for Sale — 16 Rooms, Pool, Spa &amp; Rice Field Views in Ubud, Bali" data-location="Ubud" data-price="30000000000" data-updated="2026-05-19" data-complete="100" data-tasks="0" data-health="54">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1354</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 19 May 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Freehold Boutique Hotel for Sale — 16 Rooms, Pool, Spa &amp; Rice Field Views in Ubud, Bali</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 30,000,000,000</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>54%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">100% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '100%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1359" data-name="Kahayana Suites - to be changed" data-location="" data-price="0" data-updated="2026-06-08" data-complete="20" data-tasks="0" data-health="8">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1359</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 08 Jun 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Kahayana Suites - to be changed</h3>
                    <div className="list-card__meta">
                      <span className="list-location list-location--none">No area mapped</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price list-price--none">&mdash;</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>8%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">20% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '20%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1360" data-name="Lodtunduh Hotel - TBD" data-location="" data-price="0" data-updated="2026-06-08" data-complete="20" data-tasks="0" data-health="23">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1360</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 08 Jun 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Lodtunduh Hotel - TBD</h3>
                    <div className="list-card__meta">
                      <span className="list-location list-location--none">No area mapped</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price list-price--none">&mdash;</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>23%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">20% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '20%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1358" data-name="Max One Hotel - to be changed" data-location="" data-price="0" data-updated="2026-06-08" data-complete="20" data-tasks="0" data-health="15">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1358</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 08 Jun 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Max One Hotel - to be changed</h3>
                    <div className="list-card__meta">
                      <span className="list-location list-location--none">No area mapped</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price list-price--none">&mdash;</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>15%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">20% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '20%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

                <article className="list-card" data-category="commercial" data-stage="enrich" data-status="available" data-marketing="none" data-id="COMM-1355" data-name="Rare 3-Storey Heritage Cottage for Sale with Jungle Views and Balinese Character" data-location="Ubud" data-price="2400000000" data-updated="2026-05-19" data-complete="100" data-tasks="0" data-health="54">
                  <div className="list-card__thumb" aria-hidden="true">
                    <div className="list-card__thumb-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span>No image</span>
                    </div>
                  </div>
                  <div className="list-card__body">
                    <div className="list-card__top">
                      <span className="list-id">COMM-1355</span>
                      <div className="list-card__actions">
                        <span className="list-updated">Updated 19 May 2026</span>
                        <span className="status-badge status-badge--draft">Draft</span>
                        <div className="list-card__menu-wrap">
                          <button type="button" className="list-card__menu" aria-label="Listing actions" aria-expanded="false">
                            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                          </button>
                          <div className="list-card__dropdown">
                            <button type="button">View listing</button>
                            <button type="button">Edit</button>
                            <button type="button">Duplicate</button>
                            <button type="button" className="is-danger">Archive</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="list-card__title">Rare 3-Storey Heritage Cottage for Sale with Jungle Views and Balinese Character</h3>
                    <div className="list-card__meta">
                      <span className="list-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Ubud</span>
                    </div>
                    <div className="list-card__price-row">
                      <p className="list-price">IDR 2,400,000,000</p>
                    </div>
                    <div className="list-card__status-row">
                      <span className="avail-pill">Available</span>
                      <span className="list-card__rating"><span className="list-stars"></span><b>54%</b></span>
                    </div>
                    <div className="list-card__progress">
                      <span className="list-card__progress-label">100% Complete</span>
                      <span className="list-card__bar"><i style={{ width: '100%' }}></i></span>
                    </div>
                    <div className="list-card__pills">
                      <span className="info-pill info-pill--neutral">0 Tasks</span>
                      <span className="info-pill info-pill--neutral">0 Favourites</span>
                      <span className="info-pill info-pill--neutral">0 Shortlists</span>
                    </div>
                    <span className="info-pill info-pill--danger list-card__warn">⚠ Stagnant &gt;48h ↗</span>
                  </div>
                </article>

              </section>

              <section className="listings-table" id="listingsTable" aria-label="Property listings table" hidden>
                <table className="list-table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Listing</th>
                      <th scope="col">Location</th>
                      <th scope="col">Stage</th>
                      <th scope="col">Status</th>
                      <th scope="col">Price</th>
                      <th scope="col">Health</th>
                      <th scope="col">Updated</th>
                    </tr>
                  </thead>
                  <tbody id="listTableBody"></tbody>
                </table>
              </section>

              <nav className="list-pagination" aria-label="Listings pagination">
                <p className="list-pagination__info">Showing 1 – 10 of 403 listings</p>
                <div className="list-pagination__pages">
                  <button type="button" className="list-pagination__btn" disabled aria-label="Previous page">←</button>
                  <button type="button" className="list-pagination__btn is-active" aria-current="page">1</button>
                  <button type="button" className="list-pagination__btn">2</button>
                  <button type="button" className="list-pagination__btn">3</button>
                  <span className="list-pagination__dots">…</span>
                  <button type="button" className="list-pagination__btn">21</button>
                  <button type="button" className="list-pagination__btn" aria-label="Next page">→</button>
                </div>
                <label className="select-wrap">
                  <span className="sr-only">Rows per page</span>
                  <select className="select-field select-field--perpage" aria-label="Rows per page">
                    <option>20 per page</option>
                    <option>50 per page</option>
                    <option>100 per page</option>
                  </select>
                </label>
              </nav>

              <p className="list-empty" id="listEmpty" hidden>No listings match your filters.</p>



      {/* ===== drawers / modals belonging to this page ===== */}
      {/* Advanced search: right-hand slide-in panel */}
            <button className="drawer-backdrop" id="advBackdrop" aria-label="Close advanced search" hidden></button>
            <aside className="drawer" id="advSearch" aria-labelledby="advSearchTitle" aria-hidden="true">
              <header className="drawer__head">
                <h2 className="drawer__title" id="advSearchTitle">Advanced search</h2>
                <button type="button" className="icon-btn drawer__close" id="advClose" aria-label="Close advanced search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                </button>
              </header>

              <div className="drawer__body">

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Price</h3>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Min (IDR)</span>
                      <input type="text" className="input-field" data-adv="priceMin" placeholder="e.g. 500,000,000" />
                    </label>
                    <label className="field">
                      <span className="field__label">Max (IDR)</span>
                      <input type="text" className="input-field" data-adv="priceMax" placeholder="e.g. 3,000,000,000" />
                    </label>
                  </div>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Location</h3>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Primary location</span>
                      <select className="select-field" data-adv="locPrimary" id="advLocPrimary">
                        <option defaultValue="">Any</option>
                        <option defaultValue="Ubud">Ubud</option>
                        <option defaultValue="Canggu">Canggu</option>
                        <option defaultValue="Uluwatu">Uluwatu</option>
                        <option defaultValue="Seminyak">Seminyak</option>
                        <option defaultValue="Sanur">Sanur</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Secondary location</span>
                      <select className="select-field" data-adv="locSecondary" id="advLocSecondary" disabled>
                        <option defaultValue="">Select a primary location first</option>
                      </select>
                    </label>
                  </div>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Property</h3>
                  <div className="drawer-row drawer-row--3">
                    <label className="field">
                      <span className="field__label">Type</span>
                      <select className="select-field" data-adv="type">
                        <option defaultValue="">Any</option>
                        <option defaultValue="rent">Rent</option>
                        <option defaultValue="sale">Villa / Sale</option>
                        <option defaultValue="land">Land</option>
                        <option defaultValue="commercial">Commercial</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Bedrooms</span>
                      <select className="select-field" data-adv="beds">
                        <option defaultValue="">Any</option>
                        <option defaultValue="1">1+</option>
                        <option defaultValue="2">2+</option>
                        <option defaultValue="3">3+</option>
                        <option defaultValue="4">4+</option>
                        <option defaultValue="5">5+</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Bathrooms</span>
                      <select className="select-field" data-adv="baths">
                        <option defaultValue="">Any</option>
                        <option defaultValue="1">1+</option>
                        <option defaultValue="2">2+</option>
                        <option defaultValue="3">3+</option>
                        <option defaultValue="4">4+</option>
                      </select>
                    </label>
                  </div>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Land size (m² min)</span>
                      <input type="number" className="input-field" data-adv="landMin" placeholder="Any" />
                    </label>
                    <label className="field">
                      <span className="field__label">Building size (m² min)</span>
                      <input type="number" className="input-field" data-adv="buildMin" placeholder="Any" />
                    </label>
                  </div>
                </section>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Ownership</h3>
                  <div className="drawer-row drawer-row--2">
                    <label className="field">
                      <span className="field__label">Tenure</span>
                      <select className="select-field" data-adv="tenure">
                        <option defaultValue="">Any</option>
                        <option defaultValue="leasehold">Leasehold</option>
                        <option defaultValue="freehold">Freehold</option>
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">Lease remaining (years min)</span>
                      <input type="number" className="input-field" data-adv="leaseMin" placeholder="Any" />
                    </label>
                  </div>
                </section>

                <details className="drawer-more">
                  <summary className="drawer-more__summary">More criteria</summary>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Pool</h3>
                    <div className="tagset" data-adv-group="pool">
                      <label className="tag-check"><input type="checkbox" defaultValue="Large Private Pool (&gt;10m)" /><span>Large Private Pool (&gt;10m)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Private Pool (&lt;10m)" /><span>Private Pool (&lt;10m)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Shared" /><span>Shared</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="None" /><span>None</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">View</h3>
                    <div className="tagset" data-adv-group="view">
                      <label className="tag-check"><input type="checkbox" defaultValue="Rice Field View" /><span>Rice Field View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Jungle View" /><span>Jungle View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Mountain View" /><span>Mountain View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="River &amp; Waterfall" /><span>River &amp; Waterfall</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Beachfront" /><span>Beachfront</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Ocean View" /><span>Ocean View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Garden &amp; Pool View" /><span>Garden &amp; Pool View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Garden View" /><span>Garden View</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Balinese Compound" /><span>Balinese Compound</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Street View" /><span>Street View</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Kitchen</h3>
                    <div className="tagset" data-adv-group="kitchen">
                      <label className="tag-check"><input type="checkbox" defaultValue="Enclosed Kitchen" /><span>Enclosed Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Open Kitchen" /><span>Open Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Semi-Outdoor Kitchen" /><span>Semi-Outdoor Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Shared Kitchen" /><span>Shared Kitchen</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="None" /><span>None</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Living area</h3>
                    <div className="tagset" data-adv-group="living">
                      <label className="tag-check"><input type="checkbox" defaultValue="Enclosed" /><span>Enclosed</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Semi-Enclosed" /><span>Semi-Enclosed</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Private" /><span>Private</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Semi-Open" /><span>Semi-Open</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Open" /><span>Open</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Outdoor" /><span>Outdoor</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Indoor" /><span>Indoor</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="None" /><span>None</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Access</h3>
                    <div className="tagset" data-adv-group="access">
                      <label className="tag-check"><input type="checkbox" defaultValue="Car Access" /><span>Car Access</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Motorbike Access" /><span>Motorbike Access</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Walking Access only" /><span>Walking Access only</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Pets</h3>
                    <div className="tagset" data-adv-group="pets">
                      <label className="tag-check"><input type="checkbox" defaultValue="Pet Friendly" /><span>Pet Friendly</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Pets Allowed (extra deposit)" /><span>Pets Allowed (extra deposit)</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Cat Only" /><span>Cat Only</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="No Pets" /><span>No Pets</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Case by Case" /><span>Case by Case</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Basic comfort &amp; utility</h3>
                    <div className="tagset" data-adv-group="comfort">
                      <label className="tag-check"><input type="checkbox" defaultValue="Wifi" /><span>Wifi</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="AC" /><span>AC</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Dedicated Workspace" /><span>Dedicated Workspace</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Oven" /><span>Oven</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Washing Machine" /><span>Washing Machine</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Dryer" /><span>Dryer</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Dish Washer" /><span>Dish Washer</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Microwave" /><span>Microwave</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Hot Water" /><span>Hot Water</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="TV" /><span>TV</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Bathtub" /><span>Bathtub</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Security &amp; safety</h3>
                    <div className="tagset" data-adv-group="security">
                      <label className="tag-check"><input type="checkbox" defaultValue="CCTV" /><span>CCTV</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Smart Lock" /><span>Smart Lock</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Safe" /><span>Safe</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Carbon Monoxide Alarm" /><span>Carbon Monoxide Alarm</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Physical Security" /><span>Physical Security</span></label>
                    </div>
                  </section>

                  <section className="drawer-group">
                    <h3 className="drawer-group__title">Family &amp; child</h3>
                    <div className="tagset" data-adv-group="family">
                      <label className="tag-check"><input type="checkbox" defaultValue="Outdoor Fireplace" /><span>Outdoor Fireplace</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Playground &amp; Play Area" /><span>Playground &amp; Play Area</span></label>
                      <label className="tag-check"><input type="checkbox" defaultValue="Toys &amp; Board Games" /><span>Toys &amp; Board Games</span></label>
                    </div>
                  </section>
                </details>

                <section className="drawer-group">
                  <h3 className="drawer-group__title">Internal</h3>
                  <label className="tag-check tag-check--wide"><input type="checkbox" data-adv="excludeCoBroker" /><span>Exclude co-broker listings</span></label>
                </section>

              </div>

              <footer className="drawer__foot">
                <button type="button" className="btn btn-ghost" id="advClear">Clear all</button>
                <button type="button" className="btn btn-primary" id="advApply">Show results</button>
              </footer>
            </aside>
    </>
  );
}
