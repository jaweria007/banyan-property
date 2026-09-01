# Listing Detail Page — BUY-1301

## Objective

When the user clicks the **first listing card (BUY-1301)** on the Listings page, open a dedicated **Listing Detail / Listing Management page**.

The page should follow the **exact visual structure, hierarchy, spacing, card organization, and interaction pattern shown in the provided reference image**.

Use the existing Banyan design system and **do not introduce a new color palette**.

The page should feel like a premium property-management workspace where the user can immediately understand:

* Listing readiness
* What is blocking publication
* Content/media/operations/marketing/compliance progress
* Listing details
* Recent activity
* Tasks

---

# 1. Navigation From Listings

When the user clicks anywhere on the **BUY-1301 listing card** on the Listings page:

**Listings → BUY-1301 Listing Detail**

Open the detail page for:

**BUY-1301**

**Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud**

The card should behave as a clickable navigation element.

### Navigation

At the top of the detail page, provide:

**← Back to listings**

Clicking this returns the user to the Listings page.

---

# 2. Overall Page Layout

Keep the existing Banyan sidebar/navigation.

The main content area should use a spacious SaaS dashboard layout.

### Main Structure

```text
Back to listings

Listing title
Listing ID / Type

Closing reason + page actions

Detail navigation tabs

Listing Readiness
────────────────────────────────────────
Readiness score | Blocking requirements

Category progress cards

Listing Summary | Recent Activity

Tasks
```

Use generous spacing between these major sections.

---

# 3. Page Header

At the top of the main content area:

### Back Navigation

**← Back to listings**

Use small muted text.

It should be clickable and visually secondary.

---

### Listing Title

Display:

**Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud**

Use a large, bold heading.

Recommended:

* 26–32px desktop
* Semibold/bold
* `#172033`
* Strong line height
* Maximum width allowing the title to remain readable

Below the title:

**BUY-1301 · Sale**

Use smaller secondary text.

---

# 4. Header Action Area

Directly below the title area, include the closing-reason field and actions.

### Closing Reason

Large input:

> Reason for closing (e.g., sold, withdrawn, expired)...

This should appear as a wide input field.

### Actions

Place the buttons toward the right:

**Close listing**

**Save changes**

**Cancel**

And a save state:

**✓ All changes saved**

### Button hierarchy

Primary:

**Save changes**

Use Banyan green.

Secondary/destructive:

**Close listing**

Use a darker neutral treatment.

Tertiary:

**Cancel**

White background with subtle border.

The action row should remain horizontally aligned on desktop.

---

# 5. Detail Navigation Tabs

Under the header actions, create a horizontal navigation tab system.

Tabs:

* Overview
* Content
* Media
* Operations
* Connections
* Timeline
* Marketing Profile
* Intelligence
* Resources

### Active Tab

**Overview**

Use:

* Banyan green text
* Semibold typography
* Green bottom border/indicator

Inactive tabs:

* `#667085`
* No filled background
* Hover to darker text

Keep the tabs in a single horizontal row on desktop.

---

# 6. Listing Readiness Section

This is the primary dashboard section.

Create a large white card containing two major areas:

### Left

**Listing Readiness**

Circular progress indicator.

For BUY-1301:

**64%**

Below:

**7 of 11**
requirements complete

### Right

Display:

**4 things blocking publication**

Add:

**High priority**

badge.

---

# 7. Readiness Progress Circle

Create a large circular progress indicator.

### Content

Center:

**64%**

Below:

**7 of 11**

**requirements complete**

### Styling

* Green progress arc
* Very light gray inactive arc
* White center
* Approximately 160–180px diameter
* Strong percentage typography
* Supporting text in `#667085`

The progress ring should visually communicate completion immediately.

---

# 8. Publication Blocking Requirements

Display the four blocking requirements vertically.

### Requirement 1

**1  Add at least 5 photos**

Supporting text:

**No photos uploaded yet**

### Requirement 2

**2  Add video** *(optional but recommended)*

Supporting text:

**No video link**

### Requirement 3

**3  Add price**

Supporting text:

**No asking price set**

### Requirement 4

**4  Sign owner agreement**

Supporting text:

**No signed agreement on file**

Each requirement should have:

* Small numbered circular indicator
* Requirement title
* Supporting explanation
* Clear vertical spacing

Use a soft warning/red treatment for the numbered indicators.

---

# 9. Readiness Actions

On the right side of the readiness section:

Primary action:

**Fix missing items →**

Secondary action underneath:

**View all 11 requirements →**

The primary button should use Banyan green.

The secondary action should be text/link style.

---

# 10. Readiness Layout Alignment

The readiness card must use a clear horizontal structure:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│ Listing Readiness     4 things blocking publication           │
│                                                               │
│       64%              ① Add at least 5 photos                │
│      7 of 11           ② Add video                            │
│   requirements         ③ Add price                            │
│     complete           ④ Sign owner agreement                 │
│                                                               │
│                       Fix missing items →                      │
│                       View all 11 requirements →               │
└───────────────────────────────────────────────────────────────┘
```

Do not stack the readiness score above the blocking list on desktop.

---

# 11. Readiness Category Progress

At the bottom of the readiness card, create five equal-width progress categories.

Categories:

### Content

**80%**

**4 / 5**

### Media

**40%**

**2 / 5**

### Operations

**70%**

**7 / 10**

### Marketing

**50%**

**2 / 4**

### Compliance

**100%**

**1 / 1**

Each category should have:

* Small contextual icon
* Category name
* Percentage
* Completed/total count
* Horizontal progress bar

---

# 12. Category Card Structure

Each category should follow:

```text
[Icon]  Content

80%                         4 / 5

━━━━━━━━━━━━━━━━━━━━━━━━
```

The category cards should be separated by subtle vertical borders.

They should feel like one unified component rather than five independent floating cards.

---

# 13. Progress Bar Styling

Use:

### Track

`#E5E7EB`

### Progress

`#1A5D43`

Use a rounded progress bar.

The progress percentage should be visually prominent.

---

# 14. Listing Summary

Below the readiness section, create a two-column layout.

### Left

Large card:

**Listing summary**

### Right

Large card:

**Recent activity**

The two cards should align at the top.

---

# 15. Listing Summary Card

Header:

**Listing summary**

Add:

**✎ Edit details**

button on the right.

Below, use a horizontal information layout.

### Left

Property image.

Use the existing property image for BUY-1301.

Image should have:

* Rounded corners
* Consistent aspect ratio
* Object-fit cover

### Middle Information

Display:

**Status**

🟡 Draft

**Property type**

Villa

**Area**

Ubud

**Created**

02 Aug 2026

### Next Information Column

**Assigned agent**

Unassigned

**Assign agent**

Clickable action

**Last updated**

10 Aug 2026 · 11:58 AM

**by System**

### Right Information

**Visibility**

🔵 Available

**Marketing channels**

All marketing

**Days on market**

8 days

---

# 16. Listing Summary Alignment

Use this structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ Listing summary                              Edit details     │
│                                                              │
│ ┌────────────┐  Status          Assigned agent   Visibility │
│ │            │  Draft           Unassigned       Available  │
│ │ PROPERTY   │  Property type   Assign agent     Marketing  │
│ │   IMAGE    │  Villa            Last updated     channels   │
│ │            │  Area             10 Aug 2026      All market │
│ └────────────┘  Ubud             Created          Days market│
│                                  02 Aug 2026      8 days     │
└──────────────────────────────────────────────────────────────┘
```

All information columns should be vertically aligned.

Do not scatter metadata randomly inside the card.

---

# 17. Recent Activity

Create a separate card beside Listing Summary.

Header:

**Recent activity**

Right-side action:

**View all activity →**

Display activity as a clean vertical timeline/list.

Example:

### Activity

Green circular avatar/icon:

**S**

**System archived this listing**

10 Aug 2026 · 11:58 AM

The activity item should remain compact with plenty of whitespace.

---

# 18. Recent Activity Styling

* White card
* Subtle border
* Rounded corners
* Light divider if multiple activities exist
* Green activity indicator
* Primary activity text in `#172033`
* Timestamp in `#667085`

The activity panel should never visually overpower Listing Summary.

---

# 19. Tasks Section

At the bottom of the page create a full-width expandable task bar.

Structure:

**⌄ Tasks · 0**

Right:

**＋ Create task**

Use a compact white card with a subtle border.

### Behavior

The task section should be expandable/collapsible.

When there are no tasks:

**Tasks · 0**

should remain visible.

The Create Task action should always be accessible.

---

# 20. Color System

**Keep the existing Banyan color palette exactly.**

Do not introduce a new primary brand color.

### Primary

`#1A5D43`

Use for:

* Primary buttons
* Progress bars
* Active tabs
* Important links
* Success states
* Active indicators

### Dark Text

`#172033`

Use for:

* Page title
* Section headings
* Listing title
* Primary information

### Secondary Text

`#667085`

Use for:

* Supporting text
* Metadata
* Timestamps
* Descriptions
* Inactive navigation

### Background

`#F8FAF9`

Use as the overall page background.

### Cards

`#FFFFFF`

All major dashboard cards should use white surfaces.

### Borders

`#E5E7EB`

Use for:

* Card borders
* Inputs
* Dividers
* Progress tracks
* Secondary buttons

---

# 21. Supporting Status Colors

Keep status colors subtle and contextual.

### Draft

Yellow / amber indicator

### Published

Green indicator

### Available

Blue indicator

### Sold

Purple indicator

### High Priority / Blocking

Soft red/pink indicator

Do not change the Banyan primary green because of these contextual colors.

---

# 22. Card Styling

All major cards should share one consistent visual language:

* White background
* `#E5E7EB` border
* 10–14px border radius
* Very subtle shadow, if required
* Comfortable internal padding
* Clean spacing between sections

Avoid excessive shadows or glassmorphism.

The design should feel like a **professional property operations platform**.

---

# 23. Typography

Use a clean modern sans-serif.

### Page title

28–32px / bold

### Section heading

17–20px / semibold

### Listing metadata

13–14px

### Primary metrics

24–36px depending on importance

### Supporting text

12–14px

Keep typography consistent across the page.

---

# 24. Spacing System

Use a consistent spacing system.

Recommended:

* Page horizontal padding: 32–40px
* Section spacing: 16–24px
* Card padding: 20–24px
* Internal spacing: 8–16px
* Tab spacing: 24–32px

Do not compress the page unnecessarily.

The reference relies heavily on **whitespace and alignment** to create its premium appearance.

---

# 25. Responsive Behavior

### Desktop

Use the complete two-column layout:

**Listing Summary | Recent Activity**

Readiness content remains horizontally structured.

### Tablet

* Readiness sections can become slightly more compact.
* Listing Summary and Recent Activity may remain side-by-side if space allows.
* Otherwise stack them.

### Mobile

Stack all sections:

```text
Header
↓
Actions
↓
Tabs
↓
Listing Readiness
↓
Category Progress
↓
Listing Summary
↓
Recent Activity
↓
Tasks
```

The readiness score should remain clearly visible.

Tabs should become horizontally scrollable rather than wrapping into multiple confusing rows.

---

# 26. Interaction Requirements

### Back to listings

Returns to the Listings page.

### Edit details

Opens editing mode for listing information.

### Fix missing items

Navigates to the relevant missing requirement/content.

### View all requirements

Opens the complete readiness checklist.

### Category cards

Should be clickable and navigate to their respective sections where appropriate:

* Content
* Media
* Operations
* Marketing
* Compliance

### Recent activity

**View all activity →** opens the complete timeline.

### Create task

Opens the task creation interface.

---

# 27. Important Design Rule

Do **not** create a visually different page just because this is a detail view.

The Listing Detail page must feel like a natural continuation of the Listings page.

Use the same:

* Banyan green
* Typography
* Border treatment
* Radius
* Button styling
* Status indicators
* Spacing system
* Icon language

The Listings page and Listing Detail page should feel like **one unified product**.

---

# Final Page Hierarchy

The final page should visually read in this exact order:

**Back to listings**

↓

**Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud**

`BUY-1301 · Sale`

↓

**Closing reason + Close listing + Save changes + Cancel**

↓

**Overview · Content · Media · Operations · Connections · Timeline · Marketing Profile · Intelligence · Resources**

↓

### Listing Readiness

**64% complete**

**4 things blocking publication**

**Fix missing items**

↓

### Category Progress

**Content · Media · Operations · Marketing · Compliance**

↓

### Listing Summary | Recent Activity

Property information + image

|

Latest system activity

↓

### Tasks · 0

**Create task**

The final result should closely match the **reference screenshot's structure and visual hierarchy**, while using the exact Banyan colors specified above and the actual BUY-1301 listing data.
