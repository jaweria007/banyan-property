Absolutely. Below is a **proper implementation-ready MD** for the **Live Shortlist page**, based on the reference you uploaded. It explicitly defines the **page structure, card alignment, spacing, hierarchy, interactions, colors, and typography** so the design can be recreated closely.

````md
# Banyan — Live Shortlist Page

## Page Context

This page opens when the user clicks the **first Shortlist option in the first row of the Opportunities page**.

The page is a **Live Shortlist workspace** where the user can:

1. Understand the client's requirements.
2. Use AI-powered curation tools.
3. Review matching properties.
4. Build and reorder the shortlist.
5. Share the shortlist with the client.
6. Monitor client engagement.

The page should follow the uploaded reference image closely in terms of **overall structure, alignment, card proportions, spacing, hierarchy, and interaction patterns**.

Do not redesign the page into a completely different layout.

---

# 1. Design System

## Color System

Keep the existing Banyan color palette.

Do not introduce a new primary color system.

### Primary
`#1A5D43`

Use for:
- Primary buttons
- Active navigation states
- Active tabs
- Selected controls
- Progress indicators
- Important links
- Positive actions

### Dark Text
`#172033`

Use for:
- Page titles
- Section headings
- Property names
- Important labels
- Primary body content

### Secondary Text
`#667085`

Use for:
- Supporting descriptions
- Metadata
- Helper text
- Secondary labels
- Dates
- Property locations
- Informational text

### Background
`#F8FAF9`

Use as the overall application/page background.

### Cards
`#FFFFFF`

All major content containers should use white cards against the light background.

### Borders
`#E5E7EB`

Use for:
- Card borders
- Input borders
- Dividers
- Tabs
- Secondary controls

---

# 2. Typography

## Heading Font

Use:

**Libre Baskerville**

Use Libre Baskerville for:
- Page title
- Major section headings
- Important editorial headings where appropriate

The typography should feel refined, premium, and editorial.

## Body Font

Use:

**DM Sans**

Use DM Sans for:
- Body text
- Labels
- Buttons
- Inputs
- Property metadata
- Navigation
- Status badges
- Supporting information

### Typography Hierarchy

Page title:
- Libre Baskerville
- 28–32px
- Semibold/Bold
- `#172033`

Section headings:
- Libre Baskerville
- 16–18px
- Semibold
- `#172033`

Property names:
- DM Sans
- 14–16px
- Semibold/Bold
- `#172033`

Body:
- DM Sans
- 13–14px
- Regular
- `#667085`

Small metadata:
- DM Sans
- 11–12px
- Regular/Medium
- `#667085`

Buttons:
- DM Sans
- 13–14px
- Medium/Semibold

---

# 3. Overall Page Layout

The sidebar already exists and should remain unchanged.

Do not redesign or recreate the sidebar as part of this page.

The content area should occupy the remaining viewport width.

### Main Content

Use:

- Background: `#F8FAF9`
- Horizontal padding: 24–32px
- Vertical padding: 24px
- Maximum content width should allow the interface to breathe while maintaining the dense dashboard structure shown in the reference.

The page should be organized into:

```text
Page Header

        ↓

Client Requirements + Curate Tools
        [single horizontal container]

        ↓

3-column workspace

[Review Matches] [Build Shortlist] [Share + Monitor]
````

The lower workspace is the primary operational area.

---

# 4. Page Header

At the top of the content area create a breadcrumb row.

### Breadcrumb

```text
← Home  ›  Live Shortlists  ›  Villa Kawi
```

Use:

* DM Sans
* 12–13px
* Secondary text
* `#667085`

The current page breadcrumb should use darker text.

---

## Main Page Title

Display:

```text
Villa Kawi — Live Shortlist
```

Next to the title show a status badge:

```text
Shared with client
```

### Status Badge

* Light green background
* Green text
* Rounded pill
* 11–12px
* Medium weight

Do not make it look like a button.

---

## Metadata Row

Below the title:

```text
Created 12 Nov 2025 by Andri S.   •   For Buyer: Maria   •   Budget: IDR 25B
```

Use:

* DM Sans
* 12–13px
* `#667085`

Keep metadata on one horizontal line on desktop.

---

# 5. Requirements + Curate Tools Container

This is one **single large horizontal card**.

Do NOT create two completely separate stacked cards.

Structure:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. Understand requirements   │   2. Curate tools          │
│                              │                              │
│  Requirements content        │   AI tool cards             │
│                              │                              │
└─────────────────────────────────────────────────────────────┘
```

Use:

* Background: `#FFFFFF`
* Border: `1px solid #E5E7EB`
* Border radius: 10–12px
* Padding: 18–20px

The two sections should be separated by a subtle vertical divider.

---

# 6. Section 1 — Understand Requirements

Heading:

```text
1. Understand requirements
```

Add a small icon before the heading.

Top-right:

```text
Reset
```

Use a lightweight text action.

Supporting text:

```text
Define what the client is looking for.
```

Use secondary text.

---

## Requirements Form

The form should use a compact dashboard layout.

### Purpose

Label:

```text
Purpose
```

Display selectable pills:

```text
Rent
Buy Villa
Buy Land
Buy Commercial
```

The selected option:

```text
Buy Villa
```

Use:

* Primary green background
* White text
* Rounded corners

Inactive options:

* White background
* `#E5E7EB` border
* Dark text

These are selectable controls.

---

## Budget

Label:

```text
Budget (IDR)
```

Two fields:

```text
Min
10,000,000,000

Max
25,000,000,000
```

Inputs should have:

* White background
* `#E5E7EB` border
* 8px radius
* 40–44px height

---

## Bedrooms

Label:

```text
Bedrooms
```

Two inputs:

```text
Min
3

Max
6
```

---

## Other Requirements

Include:

```text
Bathrooms
Min
Max
```

and:

```text
Move-in
○ Anytime
○ Within 1 month
○ Within 3 months
○ Custom date
```

The selected radio option should use `#1A5D43`.

---

## Active Filters Indicator

At the bottom of the requirements section display:

```text
12 active filters
```

Use a small informational green pill.

This is informational and should not look like a primary button.

---

# 7. Section 2 — Curate Tools

Heading:

```text
2. Curate tools
```

Add:

```text
AI-powered
```

as a subtle badge beside the heading.

The tools should be vertically stacked inside the same parent container.

Create three tool cards.

---

## Tool Card 1

Icon +:

```text
Add rule matches
```

Description:

```text
Add properties matching rules
```

---

## Tool Card 2

Icon +:

```text
Add AI suggestions
```

Description:

```text
Add AI-recommended workflow
```

---

## Tool Card 3

Icon +:

```text
Sort by AI fit
```

Description:

```text
Best fit for this client first
```

### Tool Card Styling

Each tool should be:

* White
* `#E5E7EB` border
* 8–10px radius
* Horizontal layout
* Icon on left
* Title + description stacked
* Comfortable 14–16px padding

Cards should have subtle hover feedback.

---

## Tip Area

Below the tool cards add a divider.

Display:

```text
Tip: The order in your shortlist is the order shown to the client.
Learn more about shortlists
```

The "Learn more" text should be a link using `#1A5D43`.

---

# 8. Lower Workspace

Below the requirements/curation container, create a **3-column layout**.

```text
┌─────────────────┬──────────────────┬────────────────────┐
│                 │                  │                    │
│ Review matches  │ Build shortlist  │ Share with client │
│                 │                  │                    │
│                 │                  │ Monitor engagement │
│                 │                  │                    │
└─────────────────┴──────────────────┴────────────────────┘
```

### Column Width

Desktop:

```text
Review Matches     ~30%
Build Shortlist    ~30%
Right Column       ~40%
```

Use approximately 16px gap between columns.

All columns should align to the same top edge.

---

# 9. Card 3 — Review Matches

Heading:

```text
3. Review matches
```

Supporting text:

```text
18 properties match the client's requirements
```

Below:

```text
AI fit (high to low)
```

Use a small sorting/filter control.

Top-right include a view toggle:

```text
Grid | List
```

The selected state should use a subtle green highlight.

---

# 10. Property Match Items

Display matching properties as compact horizontal rows.

Each property row contains:

```text
[Property Image] [Property Information] [AI Score] [+ Add]
```

### Example

Property image:

* 90–100px wide
* 65–75px high
* Rounded 6–8px
* Object-fit: cover

Property information:

```text
Ubud Luxury Villa
Ubud, Bali

[bed icon] 4
[bath icon] 4
[area icon] 580 m²

IDR 18,500,000,000
```

AI score on the right:

```text
92
AI Fit
```

Use a subtle light-blue/green informational background.

Action:

```text
+ Add
```

Primary green button.

---

## Property Rows

Use a divider between each property.

Do not create oversized property cards.

The Review Matches section should remain dense and scannable.

Display four properties initially:

1. Ubud Luxury Villa
2. Riverfront Villa
3. Modern Tropical Villa
4. Ocean View Villa

At the bottom:

```text
Load more →
```

Then:

```text
Showing 1–8 of 18 properties
```

---

# 11. Card 4 — Build Shortlist

Heading:

```text
4. Build shortlist
```

Beside heading:

```text
3 of 5 recommended
```

Use a subtle green informational pill.

Supporting text:

```text
Drag to change the order shown to the client.
```

---

## Shortlist Items

Each selected property is displayed in a horizontal reorderable card.

Structure:

```text
[Drag Handle] [#] [Image] [Property Info] [↑] [↓] [Delete]
```

Example:

```text
1   Ubud Luxury Villa
    Ubud, Bali
    IDR 18,500,000,000
```

### Reordering

Provide:

* Drag handle
* Move up
* Move down

The item should support drag-and-drop reordering.

The number should automatically update according to its position.

---

## Delete

Use a small trash icon.

Use a restrained red accent only for destructive actions.

Do not use red as a general page color.

---

## Bottom Actions

At the bottom of the Build Shortlist card:

```text
+ Add notes to client (optional)
```

and:

```text
View as client
```

Use secondary button styling.

---

# 12. Right Column — Share With Client

Create a card:

```text
5. Share with client
```

Display:

```text
Client link
Link active
```

Use a green status pill for:

```text
Link active
```

---

## Link Input

Display the client URL in a wide input:

```text
https://banyan.com/shortlist/villa-kawi
```

Next to it:

```text
Open
```

and:

```text
Copy link
```

Primary action:

```text
Open
```

Secondary action:

```text
Copy link
```

---

## Sharing Metadata

Display:

```text
Last shared 2 days ago
•
Shared by Andri S.
```

Below:

```text
Customize client view
```

Use primary green as the link color.

---

## Archive Action

At the bottom-right:

```text
Archive this shortlist
```

This is a destructive action.

Use:

* White background
* Red border
* Red text

---

# 13. Monitor Engagement

Directly below Share With Client, create another card.

Heading:

```text
6. Monitor engagement
```

Subheading:

```text
Client engagement
```

Metadata:

```text
Since shared on 12 Nov 2025
```

---

## Engagement Metrics

Display four equal metric cards horizontally:

```text
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  👁  7 │ │ ♡  1  │ │ 📅  0  │ │ 💬  0  │
│ Opens  │ │ Favs   │ │ Views  │ │ Msgs   │
└────────┘ └────────┘ └────────┘ └────────┘
```

Metrics:

### Opens

```text
7
Opens
```

### Favourites

```text
1
Favourites
```

### Viewing Requests

```text
0
Viewing requests
```

### Messages

```text
0
Messages
```

Use small icons with subtle accent backgrounds.

---

# 14. No Viewing Requests State

Below the metrics:

```text
No viewing requests yet
```

Supporting text:

```text
Send a friendly reminder to the client.
```

Action:

```text
Send reminder
```

Use secondary button styling.

---

# 15. Card Styling

All major cards should follow the same visual language.

### Card

```text
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 10–12px
```

Avoid heavy shadows.

Use either:

* no shadow, or
* extremely subtle shadow

The design should feel premium, clean, and operational rather than decorative.

---

# 16. Buttons

## Primary Button

Use:

```text
Background: #1A5D43
Text: #FFFFFF
```

Examples:

```text
+ Add
Open
View as client
```

Border radius:

```text
8px
```

Height:

```text
36–40px
```

---

## Secondary Button

Use:

```text
Background: #FFFFFF
Border: #E5E7EB
Text: #172033
```

Examples:

```text
Copy link
Send reminder
Add notes to client
```

---

## Text Actions

Use:

```text
#1A5D43
```

Examples:

```text
Reset
Learn more
Customize client view
Load more
```

---

# 17. Status Styling

Use status colors sparingly.

### Shared / Active

Use:

* Light green background
* `#1A5D43` text

### AI Fit

Use a subtle informational tint.

### Destructive

Use red only for:

* Delete
* Archive
* Critical destructive actions

Do not introduce additional primary colors.

---

# 18. Spacing System

Use a consistent spacing system.

```text
4px   — micro spacing
8px   — icon/text spacing
12px  — compact spacing
16px  — card internal spacing
20px  — section spacing
24px  — card padding
32px  — major page spacing
```

Avoid cramped content.

The reference uses a compact enterprise-dashboard layout, so spacing should be generous enough to improve readability without making the interface unnecessarily large.

---

# 19. Alignment Requirements

This is important.

All major sections must align to a common grid.

The top:

```text
Page Header
```

should align with:

```text
Requirements / Curate Tools
```

which should align with:

```text
Review Matches / Build Shortlist / Share
```

The three lower columns must begin at exactly the same vertical position.

Cards should have consistent left and right edges.

Do not allow individual cards to randomly extend beyond the page grid.

---

# 20. Responsive Behavior

### Desktop

Use the full 3-column workspace.

```text
Review Matches | Build Shortlist | Share + Monitor
```

### Tablet

Use:

```text
Review Matches | Build Shortlist
Share + Monitor
```

### Mobile

Stack everything vertically:

```text
Requirements
↓
Curate Tools
↓
Review Matches
↓
Build Shortlist
↓
Share With Client
↓
Monitor Engagement
```

Property rows should remain horizontal where possible, but can collapse into a compact vertical layout on very small screens.

---

# 21. Interaction Requirements

### Requirements

* Purpose options are selectable.
* Inputs are editable.
* Radio controls are functional.
* Reset clears the active filters.

### Curate Tools

* Each AI tool should be clickable.
* Hover state should be subtle.
* AI actions should provide feedback after execution.

### Review Matches

* Add button adds a property to the shortlist.
* Load more loads additional properties.
* Grid/list toggle changes the presentation.

### Build Shortlist

* Properties can be reordered by drag and drop.
* Up/down controls should reorder the item.
* Delete removes the property.
* Add notes opens an input/editor.
* View as client opens the client-facing preview.

### Share

* Open opens the shared shortlist.
* Copy link copies the URL.
* Customize client view opens customization.
* Archive requires confirmation.

### Engagement

* Send reminder triggers the reminder action.

---

# 22. Overall Visual Direction

The final interface should feel:

* Premium
* Clean
* Professional
* Editorial
* Calm
* Data-focused
* Easy to scan
* Consistent with the existing Banyan dashboard

The uploaded reference image should be treated as the **layout and structural reference**.

Keep the existing Banyan green palette and do not replace it with the colors from the reference.

The page should not feel like a marketing website. It should remain a sophisticated **property-management / CRM workspace**.

Most importantly, preserve the exact workflow:

```text
Understand Requirements
        ↓
Curate Tools
        ↓
Review Matches
        ↓
Build Shortlist
        ↓
Share With Client
        ↓
Monitor Engagement
```

The hierarchy and positioning should make this workflow immediately understandable to the user.

```
```
