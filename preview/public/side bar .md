# Sidebar — UI/UX Enhancement

## Objective

Redesign the sidebar to achieve a cleaner, more premium, and more polished navigation experience while keeping the existing structure and green visual identity.

**Important:** Only update the sidebar. Do not change the dashboard/content area.

---

## 1. Sidebar Structure

Keep the existing navigation structure and categories:

* Home
* Work
* Listings
* Scouts
* Marketing
* System

Maintain clear visual separation between each navigation group.

Use generous vertical spacing so the sidebar does not feel cramped, especially between sections.

---

## 2. Sidebar Icons

Replace the current filled icons with **stroke/outline icons** throughout the sidebar.

### Icon Style

* Use consistent stroke-based icons.
* Keep all icons at the same visual size.
* Use a consistent stroke width, approximately **1.8–2px**.
* Icons should have rounded, modern shapes where possible.
* Avoid mixing filled and outlined icon styles.
* Keep icon alignment perfectly consistent across every navigation item.

### Asset Requirement

**Use the existing logos/icons from the project's `assets` folder wherever the appropriate assets are available.**

Do not recreate or replace existing brand assets unnecessarily.

For navigation icons that already exist in the assets:

> **Use the provided asset instead of introducing a new icon library.**

If an appropriate asset does not exist, use a clean stroke icon that matches the same visual language.

---

## 3. Icon Colors

Use the green visual identity consistently.

### Default State

* Stroke icons should use a soft/light green.
* Text should remain white or slightly muted white.

### Hover State

On hover:

* Icon becomes brighter.
* Text becomes brighter.
* Add a subtle green background.
* Use a smooth transition.

### Active State

The active navigation item should have:

* Slightly brighter green background
* Bright green accent indicator on the left
* Brighter stroke icon
* Stronger text weight

Keep the active state subtle and premium rather than overly bright.

---

## 4. Navigation Items

Each navigation item should have a consistent structure:

`[Stroke Icon]  [Navigation Label]`

Use:

* Fixed icon width
* Consistent gap between icon and text
* Consistent item height
* Consistent left/right padding

This should create a strong vertical alignment across the entire sidebar.

---

## 5. Search

Keep the search field near the top of the sidebar.

Redesign it to feel integrated with the sidebar:

* Transparent/dark-green surface
* Thin green border
* Stroke search icon
* Soft placeholder text
* Rounded corners
* Subtle hover/focus state

Do not make the search field visually heavier than the navigation.

---

## 6. Section Headings

Keep headings such as:

**HOME**
**WORK**
**LISTINGS**
**SCOUTS**
**MARKETING**
**SYSTEM**

Use:

* Small uppercase typography
* Medium/semibold weight
* Letter spacing
* Muted light-green color

Section headings should clearly separate navigation groups without becoming dominant.

---

## 7. Collapsible Sidebar

Add a **thin collapsible sidebar control**.

The sidebar should be able to switch between:

### Expanded

Show:

* Logo
* Search
* Section headings
* Icons
* Navigation labels
* User profile information

### Collapsed

Show primarily:

* Logo/brand mark
* Navigation icons
* Active state
* Collapse/expand control

Hide:

* Navigation labels
* Section headings
* Search placeholder
* User email/details

The icons should remain visible when collapsed so navigation is still understandable.

---

## 8. Collapse Control

Add a very thin vertical control/handle along the sidebar edge.

It should be:

* Minimal
* Low contrast
* Easy to discover
* Positioned consistently at the sidebar boundary

On click:

**Expanded → Collapsed**

On clicking again:

**Collapsed → Expanded**

Use a subtle chevron/arrow stroke icon to communicate the current action.

Add a smooth transition, approximately **200–300ms**, so the sidebar does not abruptly disappear.

---

## 9. Collapsed Width

When collapsed, keep enough width for the icons to remain comfortable and recognizable.

Recommended:

* Expanded: approximately **250–280px**
* Collapsed: approximately **64–76px**

Do not make the collapsed sidebar so narrow that icons feel cramped.

---

## 10. User Profile Area

Keep the **Admin User** section at the bottom.

In expanded mode show:

**Admin User**
[admin@banyan.com](mailto:admin@banyan.com)

In collapsed mode:

* Show only the profile/avatar icon.
* Hide the name and email.

Keep the Sign out action accessible in both states.

---

## 11. Visual Details

Use subtle separators between major navigation groups.

Avoid:

* Heavy borders
* Excessive shadows
* Filled iconography
* Large gradients
* Oversized icons
* Inconsistent icon styles
* Excessive decorative elements

The sidebar should feel like a **premium SaaS navigation system**, not a traditional admin panel.

---

## 12. Responsive Behavior

On desktop:

* Sidebar remains visible by default.
* User can collapse it manually.

On smaller screens:

* Sidebar can default to collapsed.
* It can expand as an overlay when requested.
* Main content should automatically adjust to the available width.

The collapse/expand interaction should never cause content to overlap or become unusable.

---

## Final Direction

Keep the existing **dark green Banyan identity**, but make the sidebar significantly cleaner through:

**Stroke icons + provided assets + stronger spacing + consistent alignment + subtle active states + collapsible navigation.**

The most important requirement is that **all sidebar icons follow one consistent stroke-based visual language and existing assets from the project are used wherever available.**
