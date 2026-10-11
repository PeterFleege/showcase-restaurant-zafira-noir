# Zafïra Noir

An inviting, orange-accented landing page for a fictional restaurant in the center of Helsinki.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL.

## Getting started

```bash
npm install

# 1. Create a local database
createdb zafira_noir

# 2. Configure the connection
cp .env.example .env        # edit DATABASE_URL if your credentials differ

# 3. Create tables and seed the cars
npm run db:setup

# 4. Run
npm run dev                 # http://localhost:3000
```

The page also works **without** a database as all the text sits inside the data folder. Also,
the images uses CDN links, so no need to download images. If the images needs to be changes,
then simply replace the url links in the data files (slides, dishes, gallery).

The reservation ("Book a table") form, however, needs Postgres to save inquiries.

View saved inquiries:

```bash
psql zafira_noir -c "SELECT * FROM reservations ORDER BY reservation_date DESC;"
```

## Adding/replacing photography

The design uses CDN images with a medium resolution. The slides uses landscape orientation, while
both dishes and gallery were designed to use portrait.

To change the images, simply replace the url links in the data files (slides, dishes, gallery).

Tips: dark, moody shots with low-key lighting suit the theme best. Use only images you have the
rights to (your own photos, or licensed/free-licence sources such as Unsplash or Pexels).

If you use own photos, then add them into the public folder and point the image/src link to that
location.

## Project structure

```

src/
  app/
    api/reservations/      POST endpoint for the contact form
    layout.tsx             Fonts (self-hosted), metadata
    page.tsx               Composes the homepage
    globals.css            Theme tokens, form specific classes, custom scrollbar
  components/
    content-sections/
      Hero.tsx             Fullscreen slider (autoplay, swipe, keyboard, progress)
      Gallery.tsx          Sideways scrollable cards with hover reveal text
      MenuShowcase.tsx     Revealing dish on hover
      Reservation.tsx      Floating-label form
      Story.tsx            Short break-up section with restaurant philosophy described
      Footer.tsx
    navigation/
      Navbar.tsx           Minimizes on scroll down, blurs on scroll, includes a mobile menu
    functional/            Photo, Reveal
  data/
    dishes.ts              Image urls and texts for MenuShowcase
    gallery.ts             Image urls and texts for Gallery
    nav-links.ts           id's and labels for Navbar links
    slides.ts              Image urls and texts for Hero
  db/
    db.ts                  postgres.js client including queries
  types/                   Interfaces for all components
    reservation.ts
    restaurant.ts

```

## Customising the theme

Colours and fonts live in `@theme` at the top of `src/app/globals.css`
(`ink`, `paper`, `copper`, …). Change the scale there and the whole site follows.
