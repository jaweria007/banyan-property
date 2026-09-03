# React components

The mechanical half of the port, done: `className`, `htmlFor`, self-closed void
elements, camelCased SVG attributes, comments as `{/* */}`, inline styles as objects,
and `value`/`checked` as `defaultValue`/`defaultChecked` so the markup renders
uncontrolled until you wire state to it.

Copy each file to the path in the third column. What is left for you is data and
behaviour — see `../HANDOVER.md`.

| Component | Copy to | From |
|---|---|---|
| `AvailabilityPage.tsx` | `app/(app)/master/availability/page.tsx` | `availability.html` |
| `ClientInboxPage.tsx` | `app/(app)/sales/page.tsx` | `client-inbox.html` |
| `ClientPropertyPage.tsx` | `app/shortlists/[token]/[id]/page.tsx` | `client-property.html` |
| `ClientShortlistPage.tsx` | `app/shortlists/[token]/page.tsx` | `client-shortlist.html` |
| `OverviewPage.tsx` | `app/(app)/page.tsx` | `index.html` |
| `ListingDetailPage.tsx` | `app/(app)/master/[id]/page.tsx` | `listing-detail.html` |
| `PortfolioPage.tsx` | `app/(app)/master/page.tsx` | `listings.html` |
| `LoginPage.tsx` | `app/login/page.tsx` | `login.html` |
| `BlogPage.tsx` | `app/(app)/marketing/blog/page.tsx` | `marketing-blog.html` |
| `PublishersPage.tsx` | `app/(app)/marketing/publishers/page.tsx` | `marketing-publishers.html` |
| `ScoutsPage.tsx` | `app/(app)/marketing/scouts/page.tsx` | `marketing-scouts.html` |
| `MyWorkPage.tsx` | `app/(app)/tasks/page.tsx` | `my-work.html` |
| `OpportunitiesPage.tsx` | `app/(app)/opportunities/page.tsx` | `opportunities.html` |
| `OpportunityPage.tsx` | `app/(app)/opportunities/[id]/page.tsx` | `profile.html` |
| `RelationshipDetailPage.tsx` | `app/(app)/relationships/[id]/page.tsx` | `relationship-detail.html` |
| `RelationshipsPage.tsx` | `app/(app)/relationships/page.tsx` | `relationships.html` |
| `CommunityDashboardPage.tsx` | `app/(app)/reporting/communities/page.tsx` | `reporting-community.html` |
| `GrowthDashboardPage.tsx` | `app/(app)/reporting/page.tsx` | `reporting-growth.html` |
| `WebsiteDashboardPage.tsx` | `app/(app)/reporting/website/page.tsx` | `reporting-website.html` |
| `OmsSettingsPage.tsx` | `app/(app)/settings/page.tsx` | `settings-oms.html` |
| `UserManagementPage.tsx` | `app/(app)/settings/users/page.tsx` | `settings-users.html` |
| `ShortlistBuilderPage.tsx` | `app/(app)/opportunities/[id]/shortlist/page.tsx` | `shortlist.html` |
| `SupplyAnalysisPage.tsx` | `app/(app)/master/supply/page.tsx` | `supply.html` |
| `WebsiteContentPage.tsx` | `app/(app)/website-content/page.tsx` | `website-content.html` |
