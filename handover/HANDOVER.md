# Banyan OMS — UI handover

Everything needed to put this UI onto the existing staging app.

**Live reference:** https://jaweria007.github.io/banyan-property/preview/login.html
(`test.test@gmail.com` / `12345678`)

**Source branch:** `client-feedback-aug26-27`

---

## What the target is

Staging is **Next.js (App Router) + React**, with a single hand-written CSS file and
semantic class names (`app-shell`, `app-rail`, `bnav-link`). That matters: the CSS approach
here is the same, so the design lifts across cleanly. This is not a Tailwind-to-CSS
conversion.

---

## The port splits three ways

| Part | Effort | What to do |
|---|---|---|
| **`styles.css`** (12k lines) | **Copy in as-is** | This is the design. Drop it into your global CSS. Nothing to rewrite. |
| **React components** (`handover/react/*.tsx`) | **Copy in** | Already converted — 24 components, each validated as parsable JSX. Copy each to the path named in its header comment. |
| **`script.js`** | **Rewrite as state** | React does not manipulate the DOM. Read the behaviour here, implement it with `useState`. The code is the spec, not the implementation. |

### One decision to make first

Your class names differ from ours (`bnav-link` vs our `nav-item`). Pick one:

- **Rename your JSX classNames to ours** — cleanest, and the whole stylesheet then just works.
- **Alias in CSS** — add `.bnav-link { /* same rules as .nav-item */ }`. Faster to start, but you
  now maintain two names for one thing.

We would take the first.

---

## Suggested order

1. **`styles.css` in, `handover/shell.html` as the app shell.** The sidebar and topbar are the
   same on every page — build them once. Mark the current item with `is-active` on `.nav-item`,
   or `nav-sub__link is-active` for a child.
2. **One simple page end to end** — `reporting-community.html` is a good first one: a stats row,
   one sortable table, one filter. Proves the pipeline.
3. **The list pages** — Portfolio, Opportunities, My Work, Relationships, Blog, Users. They all
   use the same `.work-list` + `.data-table` + `.th-sort` pattern, so the second is much faster
   than the first.
4. **The tabbed pages** — Listing detail, Opportunity, Website Content, OMS Settings, Scouts,
   Publishers. All use `.op-tabs` + `.op-panel`.
5. **The two hard ones last** — Shortlist Builder and the client-facing shortlist. Most state,
   most behaviour.

---

## Page map

`data-page` is what `script.js` dispatches on; use it as your route key if that helps.

| Page file | `data-page` | Replaces staging route |
|---|---|---|
| `index.html` | `overview` | `/` |
| `listings.html` | `listings` | `/master` |
| `listing-detail.html` | `listing-detail` | `/master/<id>` |
| `availability.html` | `availability` | `/master/availability` |
| `supply.html` | `supply` | `/master/supply` |
| `client-inbox.html` | `client-inbox` | `/sales` |
| `opportunities.html` | `opportunities` | `/opportunities` |
| `profile.html` | `profile` | `/opportunities/<id>` |
| `shortlist.html` | `shortlist` | `/opportunities/<id>/shortlist` |
| `my-work.html` | `my-work` | `/tasks` |
| `relationships.html` | `relationships` | `/relationships` |
| `relationship-detail.html` | `relationship-detail` | `/relationships/<id>` |
| `client-shortlist.html` | `client-shortlist` | `/shortlists/<token>` — public, no auth |
| `client-property.html` | `client-property` | `/shortlists/<token>/<id>` — public, no auth |
| `reporting-growth.html` | `reporting-growth` | `/reporting` |
| `reporting-community.html` | `reporting-community` | `/reporting/communities` |
| `reporting-website.html` | `reporting-website` | the PostHog tab, moved out of Blog & SEO |
| `marketing-scouts.html` | `marketing-scouts` | `/marketing?section=monitors` |
| `marketing-publishers.html` | `marketing-publishers` | `/marketing?section=promotion` |
| `marketing-blog.html` | `marketing-blog` | `/marketing?section=blogseo&tab=blog` |
| `website-content.html` | `website-settings` | `/nav` + `/settings` Site content + the SEO tab |
| `settings-users.html` | `settings-users` | `/settings/users` |
| `settings-oms.html` | `settings-oms` | `/settings/system`, `/configuration`, `/communities`, `/backups`, `/logs` |
| `login.html` | `login` | `/login` |

The client asked for three things to **move** between pages. They are already moved here:
PostHog became **Website Dashboard**; **Site Content** (from Site Settings) and **SEO**
(from Blog & SEO) are now tabs on **Website Content**; **User Management** is its own page.

---

## What is structure and what is placeholder

Every page ships with a small, realistic dataset so the design reads properly. **Replace the
data, keep the markup.** The arrays are all at the top of each page's block in `script.js`
(`OPPS`, `ARTICLES`, `USERS`, `NAVITEMS`, `PROPERTIES`, `CRITERIA` …) — one obvious place per
page.

Two things are deliberately smaller than production:

- **Website Content → Navigation** has 192 sample rows; staging has 299. Same shapes.
- **Publishers → reference listing** lists 13 real listings; staging lists the whole portfolio.

### Do not drop the empty states

Every list has one, and it is easy to lose in a port:

- nothing yet (`#sbDraftEmpty`, `#scQEmpty`, `#umEmpty` …)
- nothing matches the current filter (`#oppEmpty`, `#blEmpty`, `#wsNavEmpty` …)

If they are missing, whoever finishes the page will invent their own and it will not match.

---

## Gotchas we actually hit

These cost us real time. They will cost you the same if the CSS is copied without them.

1. **`[hidden]` loses to `display: grid`/`flex`.** A `hidden` attribute on a flex or grid
   container does nothing unless you keep the `[hidden] { display: none !important; }` rule near
   the top of `styles.css`. This silently broke every view toggle.
2. **Inputs will not shrink.** A browser gives `<input>` a default intrinsic width. Inside a
   grid column it bursts out and clips. `min-width: 0` on inputs and selects inside grids fixes
   it — the rule is already in the stylesheet, do not drop it.
3. **`aspect-ratio` + `max-height` shrinks the width, not the height.** Cover images looked
   half-width until we replaced it with an explicit height.
4. **`html { font-size: 16px }` must stay in px.** Everything else is `rem` on a 16-step scale.
5. **Form controls are 44px, one height, everywhere.** The Listings page used to shrink its own
   controls to 36px and it was the single most visible "unfinished" complaint. Do not
   reintroduce per-page control sizing.
6. **Toolbars must wrap.** A `flex-wrap: nowrap` toolbar pushes its last buttons off screen on
   any laptop. Every toolbar, filter row and header action group wraps.

---

## Interactions worth keeping

These carry design intent, not just polish. Where a behaviour was specifically asked for by the
client, it is noted.

| Page | Behaviour |
|---|---|
| **My Work** | Status is the source of truth: dragging a card between columns changes its status, and changing the status in the list moves the card. They can never disagree. Clicking a card opens the task; only the `[Sales]` pill opens the linked record. |
| **Shortlist Builder** | A search is added once, then keeps listening: later matches appear in Selection on their own, flagged `NEW` and sorted first. "Not for client" excludes a property from that shortlist permanently, with undo. "Remove" from the draft returns it to Selection — it is not a rejection. |
| **Opportunities** | Action status is derived, not typed. Only `Waiting` is agent-set, it requires a follow-up date, and it flips to `Needs Action` once that date passes. |
| **Listing detail** | Lease duration is calculated from the expiration date and read-only, so the two cannot drift. IDR display price is calculated from primary price × currency. |
| **Client shortlist** | The message panel attaches favourites and asked questions automatically. Property detail is a separate page, not a modal. |
| **Everywhere** | Tab strips scroll rather than clip; wide tables scroll inside their card. |

---

## Backend work this UI implies

The UI is built for these; the wiring is not front-end:

- **48-hour tasks** created automatically when a shortlist search finds new matches, and when a
  draft shortlist goes unpublished. The tasks are visible in My Work so you can see the intended
  result.
- **Action status derivation** from live tasks (see the rules table on OMS Settings → Sales
  configuration).
- **Google Drive image ordering** — the gallery states the intent (`1.jpg`, `2.jpg` … unless
  reordered); making it true is server-side.
- **Weekly FX refresh** feeding the IDR display price.

---

## Still open with the client

Three points where the feedback document says two different things. We built the option that
loses nothing, and flagged each:

1. **Client Inbox** — kept as a page *and* Triage added to Opportunities. Keep both, or drop the
   page?
2. **Opportunity tabs** — four including Contract, or three?
3. **WhatsApp button** — kept in the header as a green contact button, or moved under `+ Action`?

---

## Files in this package

```
handover/
  HANDOVER.md        this file
  COMPONENTS.md      every block class, grouped by stylesheet section
  TOKENS.md          the design tokens from :root
  react/*.tsx        24 React components — copy straight in
  react/README.md    which component goes to which app/ path
  shell.html         sidebar + topbar, rendered once around every page
  pages/*.html       the same pages as plain HTML, if you prefer the source
  _routes.tsv        the page map above, tab-separated
```

### What the conversion already did

`class` → `className`, `for` → `htmlFor`, void elements self-closed, SVG attributes
camelCased, HTML comments as `{/* */}`, inline styles as objects (CSS custom properties
kept quoted), and `value`/`checked` as `defaultValue`/`defaultChecked` so each page renders
uncontrolled until you attach state. Every file was parsed with Babel's JSX/TypeScript
parser — 24 of 24 clean.

**What it did not do:** wire data or behaviour. Each component renders the page with its
placeholder content; the arrays to replace and the interactions to add are described above.

And from the repo root: **`styles.css`** and **`script.js`**.
