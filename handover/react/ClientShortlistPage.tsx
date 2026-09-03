'use client';

/*
 * ClientShortlistPage
 * Copy to: app/shortlists/[token]/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function ClientShortlistPage() {
  return (
    <>
      <section className="cs-hero">
            <h1 className="cs-title">Ubud Family Homes</h1>
            <p className="cs-intro">
              Hand-picked for you by <strong>Berry</strong> at Banyan Properties.
              Tap the heart on anything you like — Berry sees it straight away.
            </p>
          </section>

          {/* Favourites summary + the one action that matters */}
          <section className="cs-favbar" id="csFavBar">
            <div className="cs-favbar__text">
              <p className="cs-favbar__title">Your favourites · <span id="csFavCount">0</span></p>
              <p className="cs-favbar__names" id="csFavNames">Nothing saved yet — tap ♡ on a property.</p>
            </div>
            <button type="button" className="btn btn-primary cs-msgbtn" id="csMessageBtn">Message Berry</button>
          </section>

          <div className="cs-list" id="csList"></div>

          {/* Deliberately low-key: no account needed */}
          <section className="cs-who" id="csWho">
            <label className="cs-who__label" htmlFor="csWhoName">Who's looking?</label>
            <div className="cs-who__row">
              <input type="text" id="csWhoName" className="input-field" placeholder="First name" autoComplete="given-name" />
              <button type="button" className="btn btn-ghost" id="csWhoSave">Save</button>
            </div>
            <p className="cs-who__hint">Optional — it just keeps your favourites separate if someone else is looking at this link too.</p>
          </section>

          <footer className="cs-foot">
            <img className="cs-foot__logo" src="public/banyan half logo when side bar shrinks.png" alt="" />
            <p>Banyan Properties · Ubud, Bali</p>
            <p className="cs-foot__small">Prices and availability are indicative and confirmed at the time of viewing.</p>
          </footer>


      {/* ===== drawers / modals belonging to this page ===== */}
      {/* Message panel: favourites and questions are attached automatically */}
        <button className="drawer-backdrop" id="csMsgBackdrop" aria-label="Close message" hidden></button>
        <aside className="drawer cs-drawer" id="csMsgPanel" aria-labelledby="csMsgTitle" aria-hidden="true">
          <header className="drawer__head">
            <h2 className="drawer__title" id="csMsgTitle">Message Berry</h2>
            <button type="button" className="icon-btn drawer__close" id="csMsgClose" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
            </button>
          </header>

          <div className="drawer__body">
            <section className="drawer-group">
              <h3 className="drawer-group__title">Attached automatically</h3>
              <div className="cs-attached">
                <p className="cs-attached__label">Your favourites</p>
                <ul className="cs-attached__list" id="csMsgFavs"><li className="cs-attached__none">None yet</li></ul>
              </div>
              <div className="cs-attached">
                <p className="cs-attached__label">Your questions</p>
                <ul className="cs-attached__list" id="csMsgQs"><li className="cs-attached__none">None yet</li></ul>
              </div>
            </section>

            <label className="field">
              <span className="field__label">Anything else you'd like to say?</span>
              <textarea className="input-field input-field--area" id="csMsgText" rows={5} placeholder="e.g. We'd like to view two of these next week — we arrive on the 14th."></textarea>
            </label>
          </div>

          <footer className="drawer__foot">
            <button type="button" className="btn btn-ghost" id="csMsgCancel">Cancel</button>
            <button type="button" className="btn btn-primary" id="csMsgSend">Send to Berry</button>
          </footer>
        </aside>

        {/* Ask a question about one property */}
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
