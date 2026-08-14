# Listings Page — Updated UI/UX Specification

## Objective

Update the Listings page using the **same visual language, card structure, spacing, and hierarchy shown in the provided reference image**.

The page should keep the existing Banyan **green color palette**, existing functionality, filters, tabs, pagination, and listing data, but the **listing-card structure should be redesigned to match the reference**.

The goal is to make the page feel cleaner, more premium, easier to scan, and more information-dense without making it visually overwhelming.

---

# 1. Overall Page Structure

Keep the existing Listings page structure:

1. Page header
2. Property-type filters
3. Listing-status tabs
4. Search and filtering controls
5. Listing card grid
6. Pagination

The structure should remain familiar to existing users.

### Layout

Use a **two-column listing grid** on desktop.

Each listing should appear as a large horizontal card with:

**Property Image | Listing Information**

The cards should be aligned in a clean 2-column grid with equal heights where practical.

---

# 2. Page Header

Keep the current header structure.

### Heading

**Listings (403)**

Below it:

> Manage your property listings. View performance, status and take action.

Keep:

**Show empty/reserved rows**

as a secondary inline action.

### View Switcher

Keep the top-right:

`Cards | Table`

The **Cards** option should remain active using the Banyan green.

The Table option should remain neutral.

---

# 3. Property Type Filters

Keep the existing category pills:

* All (403)
* Rent (207)
* Sale (153)
* Land (33)
* Commercial (10)

### Styling

The selected category should use the existing Banyan green.

Inactive categories should use:

* White background
* Light border
* Dark text
* Rounded pill shape

Use subtle hover transitions.

---

# 4. Listing Status Tabs

Keep:

* All (403)
* Inbox (3)
* Enrich (33)
* Review (0)
* Live (222)
* Closed (145)

Use a clean tab/navigation treatment rather than individual large buttons.

### Active Tab

The active tab should have:

* Dark green text
* Medium/semibold weight
* Green bottom indicator

Inactive tabs should use muted gray text.

---

# 5. Search & Filter Toolbar

Keep the existing controls but refine their visual hierarchy.

Structure:

**Areas selector | Search | Marketing filter | Sort | Filter | Reset**

All controls should have consistent:

* Height
* Border radius
* Border treatment
* Typography
* Internal spacing

The toolbar should feel like one cohesive system.

---

# 6. Listing Card Structure

This is the **main structural change**.

Follow the card structure shown in the provided reference.

Each card should contain:

### Left Side

Large property image.

### Right Side

Listing information arranged into clear horizontal/vertical groups.

Recommended hierarchy:

```text
Listing ID                         Status / ⋮

Property Title

Location

Price              Updated date

Availability / Status

Performance / Rating

Progress

Information chips / metrics

Tasks / secondary information
```

Do not place every piece of metadata at the same visual level.

---

# 7. Property Image

The image should occupy approximately **35–40% of the card width**.

### Image treatment

* Large rounded corners
* Object-fit: cover
* No distortion
* Consistent image ratio across all cards
* Subtle hover zoom may be used
* Image should remain visually dominant

The image should be the primary visual anchor of every listing.

---

# 8. Listing ID + Status

At the top of the information area:

### Listing ID

Examples:

**BUY-1301**
**BUY-1241**
**LAND-1264**

Use small muted text.

### Status

Place the status badge toward the top-right.

Examples:

* 🟢 Published
* 🟡 Draft
* 🟠 On Hold
* 🔴 Archived

Use small rounded status pills with a subtle tinted background.

Keep the three-dot action menu at the far right.

---

# 9. Listing Title

The property title should be one of the strongest elements inside the card.

Examples:

**Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud**

**1 Bedroom exclusive Villa**

**2 Bedroom Off Plan Boutique Villa in Sayan**

### Styling

* 16–18px
* Semibold/bold
* Dark text
* Strong line-height
* Maximum 2–3 lines where necessary

Do not allow long titles to visually dominate the entire card.

---

# 10. Location

Place the location immediately below the title.

Example:

**Ubud**

or

**Bukit**

Use a small neutral pill or muted text.

This should be visually secondary to the title.

---

# 11. Price + Updated Information

Group the commercial metadata together.

Example:

**IDR 3,487,577,751**
Updated 08 Aug 2026

For listings without pricing information, preserve the existing data state.

Price should use stronger typography.

Updated date should be smaller and muted.

---

# 12. Availability / Sale Status

Show the current property status clearly.

Examples:

🔵 **Available**

🟣 **Sold**

Use small status indicators rather than large badges.

The availability state should be visually distinguishable but should not overpower the title or price.

---

# 13. Performance Rating

The existing rating data should be retained.

Examples:

**★★★☆☆ 69%**

**★★★★☆ 74%**

**★★☆☆☆ 43%**

Place this information in its own compact metadata area.

Use the stars as a visual indicator and display the percentage alongside them.

The rating should be easy to scan without becoming a dominant element.

---

# 14. Stagnant / Attention Indicator

For listings that require attention, show:

**⚠️ Stagnant >48h ↗**

This should appear as a subtle warning-style chip.

It should visually communicate urgency without using a large red/orange block.

For normal listings, do not show an empty placeholder.

---

# 15. Completion Progress

For listings with completion information, use the reference-style progress treatment.

Example:

**80% Complete**

Underneath:

`━━━━━━━━━━━━━━━━`

Use the Banyan green progress color.

The percentage should be visible as text.

Do not make the progress bar excessively tall.

---

# 16. Information Metrics

The large amount of metadata provided for each listing should be retained, but reorganized.

Examples:

* 0 Favourites
* 2 Shortlists
* Available from
* Occupancy 12m
* Last promo
* Promos 60d
* Edited 119d ago
* 0 Tasks

These should be converted into **small informational chips/metadata blocks**.

### Important

These are **informational elements, not buttons**.

They should not look clickable.

Use subtle:

* Light gray/green background
* Small border
* Rounded corners
* Compact typography

Example:

`0 Favourites`   `2 Shortlists`   `0 Tasks`

Then secondary metrics can appear underneath:

`Available from — Not tracked`

`Occupancy 12m — Not tracked`

`Last promo — Not tracked`

---

# 17. Listing-Specific Card Content

Use the provided listing data exactly as supplied.

For example, BUY-1301 should display:

**BUY-1301**

**Spacious Luxury Villa with Separate Guest House in Singakerta, Ubud**

**Ubud**

🟡 Draft

**Updated 10 Aug 2026**

🔵 Available

**★★★☆☆ 69%**

⚠️ Stagnant >48h ↗

**80% Complete**

`0 Tasks`

Additional property/marketing information should remain available where provided.

---

# 18. Published Listing Cards

For published listings such as BUY-1241:

Show:

**BUY-1241**

**1 Bedroom exclusive Villa**

**Ubud**

🟢 Published

**IDR 3,487,577,751**

Updated 08 Aug 2026

**Sold**

**★★☆☆☆ 43%**

`1 contract to sign ↗`

`1 Favourites` `2 Shortlists`

`Available from — Not tracked`

`Occupancy 12m — 1%`

`Last promo — Not tracked`

`Promos 60d — Not tracked`

`4d ago Edited`

`0 Tasks`

The card should automatically adapt based on which fields exist.

---

# 19. Draft Listings

Draft listings should emphasize completion and attention.

For example:

**BUY-1264**

Draft status

**⚠️ Stagnant >48h**

**60% Complete**

`0 Tasks`

Draft-specific cards should prioritize:

**Status → Attention → Completion → Tasks**

This makes it immediately clear what needs action.

---

# 20. On Hold Listings

For listings such as BUY-1203:

Show:

🟠 **On Hold**

Keep the card structure identical to other listings.

Do not introduce a completely different card design for each status.

Only the status indicator and relevant metadata should change.

---

# 21. Archived Listings

For archived listings such as BUY-1235:

Show:

🔴 **Archived**

Include:

**Closed reason**

where available.

Archived cards should use a slightly more muted visual treatment while keeping the same overall structure.

---

# 22. Land Listings

Land listings such as LAND-1264, LAND-1280, LAND-1277, etc. should use **exactly the same card structure** as property listings.

Do not create a separate card design.

Only the content changes:

* LAND ID
* Land title
* Location
* Price
* Status
* Rating
* Performance
* Marketing metrics
* Tasks

This keeps the Listings page consistent.

---

# 23. Card Footer / Action Area

The bottom portion of each card should contain the most relevant action-oriented information.

Examples:

`⚠️ Stagnant >48h`

`80% Complete`

`0 Tasks`

or:

`1 contract to sign ↗`

`1 Favourites`

`2 Shortlists`

Avoid filling the footer with every available metric.

Prioritize actionable information first.

---

# 24. Card Hover State

Cards should have a subtle interaction.

On hover:

* Slightly stronger border
* Very subtle shadow increase
* Property image can gently scale
* Action menu remains visible
* No dramatic movement

Keep the interaction fast and professional.

---

# 25. Card Spacing

Use consistent spacing between:

* Image and content
* ID and title
* Title and location
* Price and metadata
* Performance and progress
* Metrics and actions

Avoid placing multiple pieces of information directly against each other.

The goal is to make the card feel **structured rather than crowded**.

---

# 26. Color System

**Keep the existing Banyan color palette.**

Do not introduce a new color scheme.

Primary:

`#1A5D43`

Dark text:

`#172033`

Secondary text:

`#667085`

Background:

`#F8FAF9`

Cards:

`#FFFFFF`

Borders:

`#E5E7EB`

Use contextual colors only for statuses:

* Green → Published / Available
* Yellow → Draft
* Orange → On Hold / Attention
* Red → Archived
* Purple → Sold
* Blue → Available

Keep these colors soft and controlled.

---

# 27. Pagination

Keep the existing pagination structure at the bottom.

Example:

**Showing 1 – 20 of 403 listings**

Then:

`←` `1` `2` `3` `…` `21` `→`

And:

`20 per page`

Use the same button styling as the rest of the page.

The active page should use Banyan green.

---

# 28. Responsive Behavior

### Desktop

Use a 2-column card grid.

### Tablet

Maintain two columns where there is sufficient width; otherwise switch to one column.

### Mobile

Use one card per row.

The image should remain prominent, but the card content should stack naturally.

Do not hide important listing information simply to make the card smaller.

---

# Final Direction

The Listings page should now follow the **exact structural approach of the provided reference image**:

**Large property image → Listing information → Status → Title → Location → Price/metadata → Availability → Rating → Progress/attention → Informational chips → Tasks/actions**

Keep the **existing Banyan green color palette**.

Keep the **existing page functionality and overall page structure**.

The major improvement is the **internal organization of each listing card**, making the large amount of existing property data easier to scan and understand.

The final interface should feel:

**Premium + structured + spacious + information-rich + highly scannable**

without removing any of the existing listing data.
