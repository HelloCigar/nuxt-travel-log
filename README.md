# Nuxt Travel Log

A web app that allows users to log locations and events on a map view and upload images.

Based on this [tutorial](https://youtu.be/DK93dqmJJYg?si=cBale51XMN_qlrwj) with some spice of my own.

## Technologies and tools used:

- [Nuxt](https://nuxt.com) - The Progressive Web Framework. Handles file-based routing, SSR, etc.
- [Better-Auth](https://www.better-auth.com/) - For handling Google and Github OAuth
- [VueJS](https://vuejs.org/) - The Progressive JavaScript Framework
- [Drizzle-ORM](https://orm.drizzle.team/) - The better way of talking to a database using TypeScript
- [Tailwind](https://tailwindcss.com/) - CSS classes to style directly in the html
- [DaisyUI](https://daisyui.com/) - Makes TailwindCSS enjoyable to use
- [MapLibre](https://maplibre.org/) - Map view wrapper for fast rendering on the browser.
- [OpenFreeMap](https://openfreemap.org/) - Map provider.
- [Nominatim](https://nominatim.org/) - Locations search results provider.
- [Amazon S3](https://aws.amazon.com/s3/) - For image storage.
- [Turso](https://turso.tech/) - For the sqlite server.
- [libsql](https://github.com/tursodatabase/libsql) - The better sqlite.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment variables

See [env.example](https://github.com/HelloCigar/nuxt-travel-log/blob/master/.env.example) file for reference before running the app.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```
