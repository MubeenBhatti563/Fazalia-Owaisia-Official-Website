# Fazalia Owaisia Official Website

The official bilingual website for Fazalia Owaisia. It provides a central place for community announcements, religious and welfare events, galleries, committee contacts, and official social-media channels.

The site is currently powered by local, typed content files. Its data layer is intentionally separated from the interface so it can be migrated to Supabase later without rebuilding the website.

## Features

- Urdu-first interface with English translation and RTL/LTR layout support
- Announcement ticker and featured-event countdown
- Filterable events, event details, and WhatsApp invitation sharing
- Photo albums, gallery filters, lightbox viewer, and album detail pages
- Official social-media links, committee directory, and contact information
- Responsive design for mobile, tablet, and desktop

## Technology

- Next.js 14 (App Router)
- React 18 and TypeScript
- Tailwind CSS
- pnpm

## Getting started

### Requirements

- Node.js 18.17 or later
- pnpm

### Install and run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Validate and build for production

```bash
pnpm lint
pnpm build
pnpm start
```

## Updating content

Until Supabase is connected, website content is managed in `lib/data/`.

| Content | File |
| --- | --- |
| Brand name, logo, contact details, and address | `lib/data/config.ts` |
| Top announcement ticker | `lib/data/announcements.ts` |
| Events, dates, posters, and featured countdown | `lib/data/events.ts` |
| Gallery albums and image paths | `lib/data/gallery.ts` |
| Official social accounts | `lib/data/social.ts` |
| Committee members and contact numbers | `lib/data/committee.ts` |
| Urdu and English text | `lib/data/translations.ts` |

Put new image files in `public/images/` and reference them with a root-relative path, for example:

```ts
image: "/images/events/annual-urs.jpg";
```

## Project structure

```text
app/                 Routes, root layout, and global styles
components/          Reusable interface and page-section components
context/             Language and RTL/LTR state management
lib/data/            Current local content source
lib/services/        Data-access layer used by the pages and components
public/images/       Logo, event posters, gallery images, and patterns
types/               Shared TypeScript models
```

## Future Supabase integration

Supabase is **not configured yet**. The application is already structured for it: components fetch content through `lib/services/`, while the current service implementations read from `lib/data/`. When Supabase is introduced, replace the relevant service implementation rather than changing page components.

### Suggested migration steps

1. Create a Supabase project and add the project URL and anonymous key to `.env.local`.
2. Install `@supabase/supabase-js`.
3. Create `lib/supabase/client.ts` for the Supabase client.
4. Create tables for `site_config`, `announcements`, `events`, `gallery_albums`, `social_channels`, and `committee_members`.
5. Import the existing content from `lib/data/` into those tables.
6. Update the matching files in `lib/services/` to query Supabase.
7. Add an authenticated admin area only if the client needs non-technical content editing.

Keep secrets out of the repository. Use environment variables locally and configure the same variables in the deployment provider.

Example environment file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The existing components should continue to receive the same TypeScript shapes defined in `types/index.ts`; that makes the migration low-risk and incremental.

## Deployment

The project can be deployed to Vercel or a Node.js hosting provider.

```bash
pnpm build
pnpm start
```

Before launch, review the placeholder phone number, WhatsApp number, email, and address in `lib/data/config.ts` and replace them with approved client details.

---

© Fazalia Owaisia Official. All rights reserved.
