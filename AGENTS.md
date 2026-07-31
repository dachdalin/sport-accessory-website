# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js and TypeScript sport accessory storefront. App Router pages live in `app/`, including routes such as `app/shop/page.tsx`, `app/cart/page.tsx`, and `app/product/[id]/`. Shared React components are in `components/`; reusable UI primitives are in `components/ui/`, and home-page sections are in `components/home/`. Cross-cutting hooks belong in `hooks/`, while shared data, contexts, and utilities live in `lib/`. Static images and icons are stored in `public/`, with product and category assets under `public/products/` and `public/categories/`. Global styles are in `app/globals.css` and `styles/globals.css`.

## Build, Test, and Development Commands
Use `pnpm install` to install dependencies from `pnpm-lock.yaml`. Run `pnpm dev` to start the local Next.js development server, usually at `http://localhost:3000`. Use `pnpm build` to create a production build and catch compile-time issues. Run `pnpm start` to serve the production build after `pnpm build`. Use `pnpm lint` to run ESLint across the project.

## Coding Style & Naming Conventions
Write TypeScript React components with clear, descriptive names. Use PascalCase for component files that export components when adding new shared components, and keep route files named according to Next.js conventions (`page.tsx`, `layout.tsx`, `loading.tsx`). Prefer functional components and hooks. Keep styling consistent with the existing Tailwind CSS utility approach and reuse `components/ui/` primitives before adding new UI patterns. Use `lib/utils.ts` helpers such as class-name composition where appropriate.

## Testing Guidelines
There is no dedicated test script or test directory currently configured. For now, validate changes with `pnpm lint` and `pnpm build`. When adding tests, place them near the feature or in a dedicated test directory, use descriptive names that identify the behavior under test, and add a matching package script so contributors can run them consistently.

## Commit & Pull Request Guidelines
Recent commits use short, imperative summaries such as `add sale filter to shop page` or `implement multi-language and wishlist support`. Keep commits focused on one logical change. Pull requests should include a concise description, verification steps such as `pnpm lint` and `pnpm build`, linked issues when relevant, and screenshots or screen recordings for visible UI changes.

## Security & Configuration Tips
Do not commit secrets, local environment files, or generated build output. Keep static assets optimized before adding them to `public/`. When changing product data in `lib/products.ts`, verify that listing, detail, cart, wishlist, and checkout flows still render correctly.
