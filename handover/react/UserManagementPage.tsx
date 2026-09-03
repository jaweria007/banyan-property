'use client';

/*
 * UserManagementPage
 * Copy to: app/(app)/settings/users/page.tsx
 *
 * Markup only. Replace the placeholder data with your own, and add the
 * interactions described in handover/HANDOVER.md.
 */

export default function UserManagementPage() {
  return (
    <>
      <section className="page-head">
                <div>
                  <h1 className="page-title">User Management</h1>
                  <p className="page-subtitle">Who can sign in, and which hubs each person can reach.</p>
                </div>
              </section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">Invite user</h2>
                    <p className="sb-hint">Creates a credential login with no hub access — grant access below once invited.</p>
                  </div>
                </div>
                <div className="drawer-row drawer-row--3">
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input type="email" className="input-field" id="umEmail" placeholder="name@banyan.com" />
                  </label>
                  <label className="field">
                    <span className="field__label">Temporary password</span>
                    <input type="text" className="input-field" id="umPass" placeholder="They change it on first sign-in" />
                  </label>
                  <label className="field">
                    <span className="field__label">&nbsp;</span>
                    <button type="button" className="btn btn-primary" id="umInvite">Invite user</button>
                  </label>
                </div>
              </section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">Users <span className="page-count" id="umCount">0</span></h2>
                    <p className="sb-hint"><strong>super_admin</strong> bypasses per-hub access — the selects are disabled for those users.</p>
                  </div>
                  <label className="search-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input type="search" id="umSearch" placeholder="Search email…" aria-label="Search users" />
                  </label>
                </div>
                <div className="work-list">
                  <table className="data-table um-table">
                    <thead>
                      <tr>
                        <th scope="col" className="th-sort is-asc" data-sort="email">Email</th>
                        <th scope="col" className="th-sort" data-sort="role">Role</th>
                        <th scope="col">Home</th>
                        <th scope="col">Listings</th>
                        <th scope="col">Sales</th>
                        <th scope="col">Relationships</th>
                        <th scope="col">Marketing</th>
                        <th scope="col">Settings</th>
                        <th scope="col">Reporting</th>
                      </tr>
                    </thead>
                    <tbody id="umBody"></tbody>
                  </table>
                </div>
                <p className="list-empty" id="umEmpty" hidden>No users match that search.</p>
                <div className="rd-noterow">
                  <button type="button" className="btn btn-primary" id="umSaveAccess">Save access</button>
                </div>
              </section>

              <section className="card op-block">
                <div className="op-block__head">
                  <div>
                    <h2 className="section-title">Sessions</h2>
                    <p className="sb-hint">Open sign-ins. Revoking one forces that device to log in again.</p>
                  </div>
                  <button type="button" className="btn btn-ghost" id="umRevokeAll">Revoke all other sessions</button>
                </div>
                <ul className="op-list" id="umSessions"></ul>
              </section>

              <div className="cs-toast" id="umToast" hidden></div>




    </>
  );
}
