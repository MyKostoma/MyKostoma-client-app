<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MyKostoma Engineering & UI Development Rules

## 1. Design Interpretation & "Build with Reason"
- **Build with reason, do not blindly copy-paste**: Analyze the UI, observe the user flow, identify existing components, recognize designer inconsistencies or mistakes in Figma, and decide what to reuse, update, or ignore.
- **Maintain Brand & Layout Shell**: Always reuse our existing logo and layout shells (`components/layouts/sidebars/`, `components/layouts/headers/`, `components/layouts/footers/`, `components/layouts/dashboard/dashboard-layout.tsx`, `components/layouts/mobile-drawer.tsx`). Never swap the logo or reinvent the shell because of a Figma mockup placeholder (e.g. "K"). Only add new nav items/routes to existing sidebars when required.
- **Strict Color Tokens**: Do not invent arbitrary colors. Use existing CSS variables defined in `app/globals.css` (`bg-background`, `bg-card`, `bg-secondary`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, and semantic status tokens `success`, `warning`, `error`, `info`).
- **Icons**: Never create custom inline SVG icons when an equivalent or near-identical icon exists in `lucide-react`.

## 2. Component Reuse, Modularity & DRY
- **Reuse UI Primitives**: Always reuse existing base components from `components/ui/` (`Button`, `SearchInput`, `Input`, `Textarea`, `Select`, `FallbackImage`, badges, etc.).
- **Do Not Repeat UI**: If cards, list items, or sections share structure, create a single reusable component and loop over data. If items differ slightly, handle differences using **component variants or optional props** rather than duplicating files.
- **Dumb Child Components**: Components inside `components/<module>/` should remain presentational and prop-driven. Business logic, API calls, and complex data transformations belong in the feature services layer.

## 3. Responsive Layout Patterns
- **Top Bar & Action Buttons**:
  - Use `DashboardTopBarSlot` to inject custom page top bars (`components/layouts/top-bars/<module>/`).
  - Conditionally render desktop actions inside the top bar (`hidden sm:flex` or `hidden md:flex`) and render mobile action buttons (`flex sm:hidden` or `flex md:hidden`) at the top of the main page body to avoid overflowing mobile headers.
- **Mobile Filter Tabs**:
  - Filter tabs must render as a sticky, floating pill navigation bar on mobile with rounded edges (`overflow-x-auto no-scrollbar`).
  - Active or clicked tabs must **automatically scroll into view** horizontally. On desktop, transition smoothly into an underline tab design.

## 4. State Management & Folder Architecture
For every feature module in `features/<module>/`:
- **State Slices (`store/slices/<module>Slice.ts`)**:
  - Keep Redux state, reducers, and selectors in `store/slices/`.
  - Inject RTK Query endpoints using `baseApi.injectEndpoints` inside the slice file and register the reducer in `store/index.ts`.
  - **Zero Circular Dependencies**: Never import any slice into `store/api/baseApi.ts`. Use plain action types if `baseApi` needs to trigger slice actions.
- **Services Folder (`features/<module>/services/`)**:
  - `<module>Api.ts`: Custom service hooks/handlers that consume the RTK Query hooks and Redux actions from the slice, with mock fallback logic so the UI works immediately and is ready for real API integration.
  - `<module>Helpers.ts`: Pure helper functions for filtering, sorting, calculating, and formatting.
- **Feature Views (`features/<module>/`)**:
  - Views orchestrate UI by consuming hooks from `services/<module>Api.ts` and passing handlers down to components.
  - Mock datasets live in `features/<module>/data.ts`.
- **Modals (`components/modals/`)**:
  - All modals must be placed in `components/modals/`.
  - Centralize modal prop interfaces in `components/modals/types.ts`.
- **Types (`types.ts`)**:
  - Each module folder (`features/<module>/types.ts` and `components/<module>/types.ts`) must have a `types.ts` file gathering all interfaces and types. Do not scatter interface declarations inside random component files.

## 5. Code Style & Hygiene
- **No Barrel `index.ts` Files**: Never create `index.ts` files that only serve as re-export barrels. Import directly from the concrete file path.
- **Named React Imports**: Always import directly from `"react"` (e.g. `import { useState, useMemo, type ReactNode } from "react"`). Never use `import * as React from "react"` or `React.useState`.
- **Minimal, Meaningful Comments**: Do not clutter code with obvious or boilerplate comments; preserve only comments that explain non-trivial logic.
