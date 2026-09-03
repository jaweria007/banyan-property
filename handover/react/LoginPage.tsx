'use client';

/*
 * LoginPage
 * Copy to: app/login/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function LoginPage() {
  return (
    <>
      <img className="login-logo" src="public/banyan logo.png" alt="Banyan Properties" />

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to manage your listings dashboard.</p>

          <form className="login-form" id="loginForm" noValidate>
            <p className="login-error" id="loginError" role="alert"></p>

            <div className="login-field">
              <label className="login-label" htmlFor="loginEmail">Email address</label>
              <input className="login-input" type="email" id="loginEmail" name="email" autoComplete="email" placeholder="you@example.com" required />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="loginPassword">Password</label>
              <div className="login-input-wrap">
                <input className="login-input" type="password" id="loginPassword" name="password" autoComplete="current-password" placeholder="Your password" required />
                <button type="button" className="login-eye" id="togglePassword" aria-label="Show or hide password">
                  <svg className="icon-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <svg className="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" id="loginBtn">Sign in</button>
          </form>

    </>
  );
}
