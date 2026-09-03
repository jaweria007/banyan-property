'use client';

/*
 * ClientPropertyPage
 * Copy to: app/shortlists/[token]/[id]/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ClientPropertyPage() {
  return (
    <>
      <div className="cs-gallery" id="cpGallery">
            <div className="cs-gallery__main">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width={18} height={18} rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
              <span>Cover photo</span>
            </div>
            <div className="cs-gallery__strip">
              <span className="cs-gallery__thumb"></span>
              <span className="cs-gallery__thumb"></span>
              <span className="cs-gallery__thumb"></span>
              <span className="cs-gallery__thumb"></span>
            </div>
          </div>

          <section className="cs-detail__head">
            <div>
              <h1 className="cs-title" id="cpTitle">3-Bedroom Family Villa with Private Pool &amp; Garden</h1>
              <p className="cs-detail__loc" id="cpLoc">Singakerta, Ubud</p>
            </div>
            <p className="cs-detail__price"><span id="cpPrice">IDR 32m</span> <small>/ year</small></p>
          </section>

          <section className="cs-detail__specs" id="cpSpecs"></section>

          <section className="cs-notes">
            <article className="cs-note cs-note--like">
              <h2 className="cs-note__title">Why we like it</h2>
              <p id="cpLike">A quiet lane five minutes from Nyuh Kuning, with a genuinely private pool and a garden big enough for children to play in. The living area opens fully to the garden, which is rare at this price.</p>
            </article>
            <article className="cs-note cs-note--consider">
              <h2 className="cs-note__title">Things to consider</h2>
              <p id="cpConsider">The kitchen is semi-outdoor, so it needs a little more cleaning in the wet season. The road in narrows for the last 50 metres — fine for a car, but not two passing at once.</p>
            </article>
          </section>

          <section className="cs-detail__block">
            <h2 className="cs-h2">About this property</h2>
            <p className="cs-body" id="cpDesc">
              Set on 750 m² in Singakerta, this three-bedroom villa was built for family living. Each bedroom
              has its own bathroom and air conditioning, and there is a separate study that works well as a
              home office. The pool is 8 metres and gets sun from mid-morning through the afternoon.
            </p>
          </section>

          <section className="cs-detail__block">
            <h2 className="cs-h2">Features</h2>
            <div className="cs-featuregrid" id="cpFeatures"></div>
          </section>

          <div className="cs-detail__actions">
            <button type="button" className="btn btn-ghost cs-fav" id="cpFav">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
              <span className="cs-fav__label">Favourite</span>
            </button>
            <button type="button" className="btn btn-primary" id="cpAsk">Ask a question</button>
          </div>

          <a href="client-shortlist.html" className="cs-backfoot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            Back to shortlist
          </a>

          <footer className="cs-foot">
            <img className="cs-foot__logo" src="public/banyan half logo when side bar shrinks.png" alt="" />
            <p>Banyan Properties · Ubud, Bali</p>
          </footer>


      {/* ===== drawers / modals belonging to this page ===== */}
      <button className="drawer-backdrop" id="csAskBackdrop" aria-label="Close question" hidden></button>
        <aside className="drawer cs-drawer" id="csAskPanel" aria-labelledby="csAskTitle" aria-hidden="true">
          <header className="drawer__head">
            <h2 className="drawer__title" id="csAskTitle">Ask a question</h2>
            <button type="button" className="icon-btn drawer__close" id="csAskClose" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
            </button>
          </header>
          <div className="drawer__body">
            <p className="cs-ask__prop" id="csAskProp"></p>
            <label className="field">
              <span className="field__label">Your question</span>
              <textarea className="input-field input-field--area" id="csAskText" rows={4} placeholder="e.g. Is the pool private?"></textarea>
            </label>
          </div>
          <footer className="drawer__foot">
            <button type="button" className="btn btn-ghost" id="csAskCancel">Cancel</button>
            <button type="button" className="btn btn-primary" id="csAskSend">Send question</button>
          </footer>
        </aside>

        <div className="cs-toast" id="csToast" hidden></div>
    </>
  );
}
