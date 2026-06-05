<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Agentic-SDLC.org blog. Key changes:

- **`instrumentation-client.ts`** (new): Initializes PostHog for Next.js 15.3+ using the recommended `instrumentation-client` approach, with the reverse proxy path (`/ingest`), exception capture enabled, and pageview autocapture disabled (handled manually by the existing `PostHogPageView` component).
- **`next.config.ts`** (new): Adds reverse proxy rewrites so PostHog requests route through `/ingest` on the same origin, reducing ad-blocker interference. Also adds `skipTrailingSlashRedirect: true` as required by PostHog.
- **`posthog-provider.tsx`** (updated): Removed the duplicate `posthog.init()` call — initialization now lives in `instrumentation-client.ts`. The `PHProvider` wrapper and manual `$pageview` capture remain unchanged.
- **`nav-drawer.tsx`** (updated): Captures `nav_drawer_opened`, `nav_link_clicked` (with label/href), and `social_link_clicked` (with platform/href) when users interact with the hamburger menu.
- **`hero-post.tsx`** (updated): Converted to a client component; captures `hero_post_clicked` (with post title and slug) when the featured post title is clicked.
- **`post-preview.tsx`** (updated): Converted to a client component; captures `post_preview_clicked` (with post title and slug) when a post in the "Recent Essays" grid is clicked.
- **`post-view-tracker.tsx`** (new): Lightweight client component that fires `post_viewed` on mount, embedded in the post detail page to track content consumption.
- **`posts/[slug]/page.tsx`** (updated): Imports and renders `PostViewTracker`, passing post title, slug, and author name as properties.

| Event | Description | File |
|---|---|---|
| `nav_drawer_opened` | Fired when the user opens the hamburger nav drawer | `src/app/_components/nav-drawer.tsx` |
| `nav_link_clicked` | Fired when the user clicks a primary nav link inside the drawer. Properties: `link_label`, `link_href` | `src/app/_components/nav-drawer.tsx` |
| `social_link_clicked` | Fired when the user clicks a social link (X, LinkedIn). Properties: `platform`, `href` | `src/app/_components/nav-drawer.tsx` |
| `hero_post_clicked` | Fired when the user clicks the featured post title. Properties: `post_title`, `post_slug` | `src/app/_components/hero-post.tsx` |
| `post_preview_clicked` | Fired when the user clicks a post in the "Recent Essays" grid. Properties: `post_title`, `post_slug` | `src/app/_components/post-preview.tsx` |
| `post_viewed` | Fired when a user lands on a post detail page. Properties: `post_title`, `post_slug`, `post_author` | `src/app/_components/post-view-tracker.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/444500/dashboard/1672503)
- [Posts Viewed Over Time](https://us.posthog.com/project/444500/insights/aBkxEvh6)
- [Top Posts by Views](https://us.posthog.com/project/444500/insights/gdR1xvKl)
- [Content Clicks: Hero vs Preview](https://us.posthog.com/project/444500/insights/H9Vlz7rL)
- [Navigation Engagement](https://us.posthog.com/project/444500/insights/ADiidq1V)
- [Homepage to Post Read Funnel](https://us.posthog.com/project/444500/insights/O4ktm0ff)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
