# Meso App — UI kit

Interactive recreation of the core Meso product surfaces using the confirmed design decisions from the system.

**Includes:** collapsible sidebar, top header with breadcrumbs, Teams list screen, Team detail screen, modal, toast, skeleton loaders, form inputs.

**Excludes (deferred):**
- **Graph canvas view** — nodes, edges, zoom, minimap (founder decision pending).
- **Data visualisation** — org health metrics, coverage heatmaps (founder decision pending).

Placeholders are used where these would appear; see `index.html` for the empty-state treatment.

## Files
- `index.html` — interactive kit entry point.
- `Shell.jsx` — sidebar + header layout.
- `Sidebar.jsx` — collapsed-to-expanded nav.
- `TeamsScreen.jsx` — list screen with table.
- `TeamDetail.jsx` — detail screen with metadata, roles, dependencies.
- `Components.jsx` — Button, Pill, Input, Card, Modal, Toast, Skeleton, Icon.

## Interactions
- Click sidebar items to navigate.
- Click a team row to view detail.
- Click "Remove team" to open the confirmation modal.
- Click "New team" to see the toast.
- Sidebar expands on hover.
