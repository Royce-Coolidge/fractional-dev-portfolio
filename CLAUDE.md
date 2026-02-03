# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 7777
npm run build        # Build for production
npm run deploy       # Build and deploy to Cloudflare Pages
npm run start        # Run production build locally with wrangler

npm run dev:storybook    # Run Storybook on port 6006
npm run build:storybook  # Build Storybook static files
```

## Architecture

This is a Remix v2 portfolio site deployed to Cloudflare Pages using Vite.

### Key Technologies
- **Remix** with Cloudflare Pages adapter for SSR
- **Three.js** for 3D graphics (models, displacement sphere background)
- **Framer Motion** for animations
- **MDX** for blog articles with frontmatter support
- **Storybook** for component development

### Project Structure
- `app/routes/` - Remix file-based routing (home at `/`, projects at `/projects.*`, articles at `/articles.*`)
- `app/components/` - Reusable UI components, each with its own directory containing `.jsx`, `.module.css`, and optional `.stories.jsx`
- `app/layouts/` - Page layouts (navbar, post, project, error)
- `app/hooks/` - Custom React hooks
- `app/utils/` - Utility functions
- `functions/[[path]].js` - Cloudflare Pages function handler
- `public/` - Static assets

### Styling
Uses CSS Modules (`.module.css`) with PostCSS for custom media queries. Global styles in `app/global.module.css` and `app/reset.module.css`. Theme system via `ThemeProvider` supporting dark/light modes.

### Config
- `app/config.json` - Site metadata (name, social links, etc.)
- `wrangler.toml` - Cloudflare configuration
- `.dev.vars` - Local environment variables (includes `SESSION_SECRET`)

### Routing
Custom route defined in `vite.config.js` maps `/` to `routes/home/route.js`. Articles are MDX files at `app/routes/articles.*.mdx`.
