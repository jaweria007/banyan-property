# Banyan OMS — Response to the 26–27 August feedback

Preview: **https://jaweria007.github.io/banyan-property/preview/login.html**
Branch: `client-feedback-aug26-27` · the existing site at the root of that URL is unchanged.

Every point from the feedback document is listed below in the document's own order, with its
status and how to check it. Nothing has been skipped silently — where something is not done, it
says so and why.

**Key:** ✅ Done · ⚠️ Partly done · ❓ Needs your decision · ⏸ You asked us to revisit later · ❌ Not done

---

## Navigation

| Your feedback | Status | How to check |
|---|---|---|
| "Operating System" instead of "Listing Dashboard" | ✅ | Sits under the logo; hides when the sidebar collapses |
| Consistently all caps for level 1 headers | ✅ | Sidebar on any page |
| LISTINGS › Portfolio, Availability, Supply Analysis | ✅ | Page titles renamed too, not just the nav |
| SALES › Client Inbox, Opportunities | ✅ | — |
| RELATIONSHIPS, MY WORK | ✅ | Both now open real pages |
| REPORTING › Growth / Community / Website Dashboard | ⚠️ | The three items are in the nav, but the dashboards themselves do not exist in this prototype yet. Moving the PostHog page out of Blog & SEO needs those pages built first. |
| MARKETING › Scouts, Publishers, Blog, Website Settings | ⚠️ | Renamed in the nav. The Marketing pages themselves are not in this prototype, so removing their in-page h1 navigation, and moving Site Content and SEO under Website Settings, still has to be done when those pages are built. |
| SETTINGS › User Management, OMS Settings | ⚠️ | Both in the nav; the pages themselves are not built yet. |
| Remove the standalone "Navigation" and "Site settings" items | ✅ | Gone |

---

## UI in general

| Your feedback | Status | How to check |
|---|---|---|
| "Some font sizes are inconsistent" | ✅ | We found 50 hardcoded pixel sizes and 51 near-identical rem values (0.72 / 0.73 / 0.74 / 0.75 / 0.76 …). They are now one 16-step scale. |
| "Some input fields are inconsistent in size" | ✅ | The Listings page was shrinking every control to 36px while the rest of the app used 44px. Compare the Portfolio toolbar with the Opportunities toolbar — they now match. 72 controls across the app are identical. |
| "Selection boxes under Opportunities > Profile wrap text in weird ways" | ✅ | Opportunity page → Requirements tab. The tag checkboxes wrap cleanly at any width. |
| "Mobile responsiveness is not fully there … nav menus break" | ✅ | Every page checked at 390px: no sideways scrolling anywhere. Availability was the worst — its filter tabs were forcing cards 39px wider than the screen. |
| "The Opportunities page looks really messy on Chrome" | ✅ | Rebuilt — see the Opportunities section below. |

---

## Listings › Overview (now Portfolio)

| Your feedback | Status | How to check |
|---|---|---|
| "Toggle between Card/Table only works one way" | ⚠️ | **We could not reproduce this** on the live site or locally, in several attempts. Rather than guess at a fix, we made the failure impossible: cards can no longer be left invisible by the reveal animation. Please try it on your own machine — Portfolio → Table → Cards, a few times. If it still happens, tell us which browser and we will chase it properly. |
| Toggle the search section visible/invisible | ✅ | "Hide filters" next to the Cards/Table toggle. It remembers your choice between visits. |
| Filters matching the website's advanced search, as a right-hand panel | ✅ | "Advanced search" opens a slide-in panel: price, location, bedrooms, bathrooms, land and building size, tenure, then Pool / View / Kitchen / Living area / Access / Pets / Comfort / Security / Family behind "More criteria". The button shows how many filters are active. |

---

## Listings › Individual Listing

| Your feedback | Status | How to check |
|---|---|---|
| "Why does the reason for closing have such a prominent top header space?" | ✅ | Gone from the header. It is now at the bottom of **Content**, under Marketing & Notes and above Related Tasks. |
| Operational and Marketing status easily editable from the top | ✅ | Two dropdowns where the closing reason used to be. |
| Split Assigned Agent into Sales Agent, Listing Agent, Co-Broker | ✅ | In the Listing summary. The co-broker name links to Relationships and the number opens WhatsApp. |

---

## Listings › Content

| Your feedback | Status | How to check |
|---|---|---|
| Nest primary and secondary location | ✅ | Location card, top right. Choose Ubud — only Ubud's villages appear. Uluwatu can never sit under it. |
| Bundle pricing: Primary Price, Primary Currency, IDR Display Price | ✅ | All three in Property Specs. Switch USD → EUR and the IDR price recalculates; the note names the rate and says it updates weekly. |
| Lease Duration calculated from a new Lease Expiration date | ✅ | Enter 27 March 2047 and the duration reads `~20.6 years`. It is read-only, so the two cannot disagree. Lease Extension stays free text. |
| Swimming Pool as predefined tickboxes | ✅ | Features → Swimming pool |
| Living area as predefined tickboxes | ✅ | Features → Living area |
| View as predefined tickboxes | ✅ | Features → View — all ten values |
| Family & Child as predefined tickboxes | ✅ | Features → Family & child |
| Security & Safety as predefined tickboxes | ✅ | Features → Security & safety |
| Kitchen as predefined tickboxes | ✅ | Features → Kitchen |
| Access as predefined tickboxes | ✅ | Features → Access |
| Basic Comfort & Utility as predefined tickboxes | ✅ | Features → Basic comfort & utility — all eleven |
| Pets as predefined tickboxes | ✅ | Features → Pets |
| Move Private & Sensitive below the Location table; add Agreed Commission | ✅ | Directly under Location on the right, tinted so it reads as restricted. |
| "I didn't see the field Inclusions for Property Type — Rent" | ✅ | Added, and only shown when Property type is Rent. Switch the type dropdown to see it appear. |
| Remove Notion URL, Old ID, City of Property (OLD), Transitioned | ✅ | None are carried over — search the page for them. |

---

## Listings › Media

| Your feedback | Status | How to check |
|---|---|---|
| "Will it maintain the existing order of images from Google Drive?" | ⚠️ | The intended behaviour is stated on the gallery: images keep 1.jpg, 2.jpg order unless reordered here. **This is a design prototype, so it is a statement of intent, not working code** — it needs to be built into the real OMS. |
| "Is GDrive IMG just a reference?" | ✅ | Yes — labelled as reference and one-time seed only, under Source on the Media tab. |
| A + button to add additional YouTube videos | ✅ | "Add YouTube video" adds another row; each row can be removed. |

---

## Listings › Operations

| Your feedback | Status | How to check |
|---|---|---|
| Bookings: 4 primary + 4 secondary fields, plus a view-only Drive link | ✅ | Customer Name / Entry / Exit / Status in the table. The ▾ on each row reveals Currency, Value, Gross Commission, Sales Agent. |
| Routine Maintenance restructured, with 1–5 star Job Rating | ✅ | Same pattern; Provider name, WhatsApp, Ops Agent and Notes are the secondary fields. |
| Inspections restructured (Move-in / Move-Out, Settlement Required) | ✅ | Same pattern. |
| Issue Log: add Ops Agent and Urgency; status driven by the task | ✅ | Both columns added; the status cell links to My Work rather than being editable here. |

---

## Listings › Connections, Timeline, Marketing Profile, Intelligence, Resources

| Your feedback | Status | Note |
|---|---|---|
| Connections / Marketing Profile / Resources — "fine for now" | ⏸ | Left as they are, as you asked. |
| Timeline — "I assume it's connected and working?" | ⏸ | Unchanged in this prototype. |
| Intelligence — "most of the forms don't work yet, not urgent, let's revisit" | ⏸ | Not touched, as you asked. |
| Intelligence — "are Coachability, Marketability Notes, Motivation of Sellers pulled from the Contents fields from Airtable?" | ❓ | **This is a question for the build team, not a UI change.** It needs answering before the Intelligence tab is finished. |

---

## Sales Hub › Opportunities

| Your feedback | Status | How to check |
|---|---|---|
| "Where can I see which Opportunity already has a Shortlist?" | ✅ | A named, sortable **Shortlist** column: dark grey **Create** or green **Edit**, sorted Edit-first by default. |
| Rename "Needs Attention" to Action, only five values | ✅ | Needs Action, Waiting, Overdue, No Action, Triage — each with its own colour, as a column and as the counters on top. |
| "Can the system derive the status?" | ⚠️ | The rules are built exactly as you described, and the demo data behaves that way — a Waiting row carries its follow-up date and flips to Needs Action once the date passes. **Real derivation from live tasks needs the backend**; this shows the intended behaviour. |
| Remove the Closed/Lost checkbox and the objectives dropdown | ✅ | Both gone. |
| Keep Channel if there is space | ✅ | Kept, as the one remaining dropdown. |
| Rank in the table header, removing Newest First / Agent / All Stages | ✅ | Every header sorts: Name, Action, Stage, Type, Channel, Priority, Agent, Last Updated, Shortlist. Those three filters are gone. |
| Add a Type column, remove the Interest filter | ✅ | Rent / Villa / Land / Commercial. |
| Actions Overview as the team's visual guide | ✅ | The counter row. Click any one to filter the table. |
| Shortlist column named, with coloured Create / Edit buttons | ✅ | Grey Create, green Edit, sortable by state. |
| Rename Profile to an Edit icon | ✅ | A pencil icon in a narrow, unsortable Edit column. |

---

## New Opportunity

| Your feedback | Status | How to check |
|---|---|---|
| Origins → Channel, everywhere it appears | ✅ | Form, filter and table column. |
| Property Interest → Property Type | ✅ | — |
| Remove the Client Objective dropdown | ✅ | Gone. |
| Add a free text Budget field | ✅ | — |
| Add Target Renter (optional checkboxes) | ✅ | All six values as written. |
| Add Target Buyer (optional checkboxes) | ✅ | All eight values as written. |
| Add a free text Client Requirements field | ✅ | — |

---

## Client Inbox

| Your feedback | Status | How to check |
|---|---|---|
| "Merge function with Opportunities … add Triage in the Actions Overview" | ❓ | **Triage is done** — it is one of the five actions with its own counter, and Putu Widiana and Wayan Adnyana are the Scout-created examples. **But your navigation spec earlier in the same document still lists Client Inbox under SALES.** We kept the page *and* added Triage so nothing is lost. Please confirm: keep both, or remove Client Inbox entirely? |

---

## Opportunities › Profile

| Your feedback | Status | How to check |
|---|---|---|
| Reorganise around Requirements / Shortlist / Contract / History | ❓ | Built as four tabs. **The document says four tabs in one place and three in another (point 14).** We kept Contract as its own tab because its contents are specified separately. Please confirm. |
| Requirements = Client, Search Brief, detailed requirements, Notes | ✅ | Four sections, in that order, with the Target Renter / Target Buyer assessment in Notes. |
| Shortlist = live shortlist, recommendations, favourites, viewings, activity | ✅ | All five. |
| Contract = contract/transaction information only | ✅ | Transaction, contracts and offers. |
| History = chronological record; move Timeline and the viewing log here | ✅ | Reads exactly like your example: date, who, what. Client and System entries are colour-coded. |
| Tasks are not a tab — [Add Task] opens a right-side modal that collapses again | ✅ | Under **+ Action**. The modal says the task appears in My Work and drives the Action status. |
| Remove the permanent Create Task / Generate Contract / Log Viewing / Record Offer buttons | ✅ | All four are in the + Action dropdown. |
| Make the WhatsApp button obviously a WhatsApp contact button | ❓ | Done — WhatsApp green with the logo, kept in the header. **WhatsApp also appears in your "remove these buttons" list.** We read it as a contact affordance rather than navigation. Please confirm. |
| Rename Profile to "Requirements" | ✅ | Page title and the tab. |
| Header 1: Name, Stage, Property Type, Urgency, Agent, then Action status | ✅ | In that order, action status on its own line beneath. |

---

## Build Shortlist

| Your feedback | Status | How to check |
|---|---|---|
| 1 — Replace the three-panel layout with a full-width workflow | ✅ | Search Criteria → Selection → Shortlist Draft. |
| 2 — Saved Search Criteria sets, expandable and editable | ✅ | Both of your examples are there by name, plus "Add search criteria". |
| 3 — Keep the criteria progressive | ✅ | Price, Locations, Bedrooms, Road access up front; the rent and buy lists behind "Advanced criteria"; Exclude co-broker under Internal. |
| 4 — Show matching numbers and a "+5 NEW" notification | ✅ | Match count and "Last checked 27 Aug" on each set, with a gold +N NEW badge. Edit a criterion and the count updates live. |
| 5 — Generate options, more prominent when there are new matches | ✅ | Reads "Review 2 new options" in gold when there are new ones. It adds nothing automatically. |
| 5 — "One task should also be created … under My Work, deadline 48h" | ⚠️ | The task **"Review new matches — Umar / 3BR Ubud Family Home"** is visible in My Work exactly as you wrote it, so you can see the intended result. **It is not yet created automatically** when you press Generate — that wiring belongs in the real OMS. |
| 6 — Selection should look like a property marketplace | ✅ | Two columns of large cards on desktop, one on mobile. |
| 7 — "Not for client" excludes permanently, with an Undo | ✅ | Reject a property, regenerate the same search, and it stays gone. Listed under "Not for client · N" with an Undo. Scoped to this shortlist only, as you specified. |
| 8 — A persistent shortlist counter and new-match indicator | ✅ | Both in the page header; the counter opens the draft. |
| 9 — Draft with Move up / down / Remove, Why we like it, Things to consider | ✅ | All present, numbered in client-facing order. Remove returns the property to Selection rather than rejecting it. |
| 10 — Publish asks for a name, then shows the live URL | ✅ | Publish → "Shortlist published", the URL, Copy link and Open shortlist; the status pill turns green. |
| 10 — "Until a DRAFT Shortlist is published, add a Task under My Work, 48h" | ⚠️ | Same as point 5 — shown in My Work, not yet wired to fire automatically. |
| 11 — Published shortlists stay live and editable, no new URL | ✅ | "Back to Selection" stays available; the page states that anything added now appears for the client straight away. |

---

## Client-facing shortlist

| Your feedback | Status | How to check |
|---|---|---|
| 12 — Very visual and mobile-first | ✅ | A standalone page with no OMS sidebar. One column on mobile, two on desktop. |
| 12 — Cover, essentials, Why we like it, Things to consider, Favourite, Not for me, Ask a question | ✅ | Every card carries all seven. |
| 12 — A separate detail page rather than a modal, with a clear back link | ✅ | Clicking a card opens a separate page. "Back to shortlist" is pinned at the top on mobile and desktop, and repeated above the footer. |
| 13 — Favourites at the top with a Message button | ✅ | "Your favourites · N" lists the names, with Message Berry beside it. |
| 13 — The message panel attaches favourites and questions automatically | ✅ | Favourite two properties, ask a question, then open Message Berry — both appear under "Attached automatically". |
| 13 — Make "Who's looking?" much less prominent | ✅ | Moved to the foot of the page, unboxed, marked optional. |
| 13 — Add Banyan branding and a Share button | ✅ | Logo in the header bar; Share uses the native share sheet on mobile and copies the link on desktop. |
| 14 — Keep the Opportunity itself simple | ❓ | See the Profile section — the three-versus-four tab question. |
| 15 — The History tab holds the chronological record | ✅ | Matches your example line for line. |

---

## My Work

| Your feedback | Status | How to check |
|---|---|---|
| 1 — Make the entire task card clickable, with a clear hover state | ✅ | Clicking anywhere on a card opens the task; the [Sales] pill opens the record. They never collide. |
| 2 — Title → Task Description, State → Status, "Ready" → "To Do" | ✅ | All three, on the board and in the list. |
| 3 — Status is the source of truth and drives the column | ✅ | Drag a card to another column and its status changes; change the status in the list and the card moves. They cannot disagree. |
| 4 — Keep Waiting on the board but not as a separate list column | ✅ | A board column, and a value inside Status in the list. |
| 5 — "White on white" — make the cards visually distinct | ✅ | Border, left accent stripe, shadow, hover lift, proper internal spacing. |
| 6 — Replace "Sales Hub > Opportunities: opp_4c1da6…" with a compact pill | ✅ | A [Sales] pill. The technical ID is never shown. |
| 7 — Task Description is not a link | ✅ | Description edits the task; the pill opens the record; assignee, status and due date each edit their own field. |
| 8 — Lightweight inline editing in the list | ✅ | Status and Assignee are dropdowns, Due is a date picker, all editable in place. |
| 9 — The task modal searches by Name / WhatsApp / Shortlist / Listing / Record ID | ✅ | The "Linked record" search in the task drawer. |
| 10 — Four columns, fitting one desktop screen | ✅ | Task Description (pill at the end), Status, Assignee, Due. |
| Inbox / To Do / In Progress / Waiting / Done definitions | ✅ | Each board column carries its definition as a subtitle. |

---

## Relationships

| Your feedback | Status | How to check |
|---|---|---|
| 1 — Two views: Card as default, List for scanning | ✅ | Both, sharing the same data. |
| 2 — Relationship metrics at the top that also act as filters | ✅ | Buyers 51 · Tenants 478 · Landlords 350 · Brokers & Partners 14. Click one to filter. |
| 3 — Keep the six relationship types simple | ✅ | Buyer, Tenant, Landlord, Property Developer, Broker & Partner, Contractor. |
| 4 — Clean search and filters; Sort by lives in List view | ✅ | Sort only appears when you switch to List. |
| 5 — One consistent card structure | ✅ | WHO → TYPE → CONTACT/RECENCY/ACTION → ACTIVITY on every card. |
| 5 — "We should not use unexplained icons such as 🏠1 · 📄3 · 👤4" | ✅ | Every metric is written out: Listings 4 · Enquiries 12 · Viewings 7 · Bookings 3. |
| 6, 7, 8 — Landlord, Buyer and Tenant show different activity metrics | ✅ | Landlord shows Listings/Enquiries/Viewings/Bookings; Buyer and Tenant share Shortlists/Viewings/Contracts; Developer and Contractor show none. |
| 9 — The same three action states everywhere | ✅ | The same red / green / grey dots as the Opportunities table. |
| 10 — Remove [Open] [Contact] [Create Task] from cards | ✅ | All gone. The whole card opens the relationship; the WhatsApp number itself is the contact action. |
| 11 — Move Create Task to the top right; give every relationship an ID | ✅ | Create Task top right. IDs read REL-00072, REL-00124 and so on. |
| 12 — The Relationship detail page | ✅ | Built. Click any card. The header carries Name / Type · REL-ID / WhatsApp · Email · Assigned to, exactly as specified, and the four facts below it are the same ones on the card so the two can never disagree. |
| 12 — "A relationship workspace, not a database dump" | ✅ | Open tasks come first, then the activity history written for people — the old page showed raw event names like `relationship_suggestion_confirmed` and IDs like `opp_e73a1082…`; neither appears now. Connected records are named. Marketing attribution and the deeper CRM fields are folded away under a disclosure at the foot. |
| 12 — Referring Broker / Partner, where applicable | ✅ | Shown on Umar Hassan (referred by Wayan Adnyana) and links through to that broker's own page. Hidden where there is no referrer. |

---

## Still open

**Three decisions we need from you** — in each case the document says two different things, so we built the option that loses nothing:

1. **Client Inbox** — keep the page *and* Triage (what we did), or remove the page entirely?
2. **Opportunity tabs** — four tabs including Contract (what we did), or three with contract information folded elsewhere?
3. **WhatsApp button** — keep it in the header as a green contact button (what we did), or remove it and put it under + Action with the others?

**Work identified but not yet done:**

- **Reporting, Marketing and Settings pages** — the navigation is restructured as you asked, but those pages themselves do not exist in this prototype. Moving PostHog to Website Dashboard, and Site Content and SEO under Website Settings, depends on them.
- **Automatic 48h tasks** from the shortlist workflow — the tasks are shown in My Work so you can see the result, but creating them automatically belongs in the real OMS rather than this prototype.
- The **Card/Table toggle bug** — we could not reproduce it. Please try it and tell us the browser if it persists.

We have confirmed the document ends with the Relationships section, so nothing after it is missing.
