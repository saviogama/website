# saviogama.dev

Terminal-first developer portfolio built as an interactive command-line experience.

The app presents background, projects, and contact options through a small terminal interface instead of conventional page navigation. It is meant to work as both a portfolio and a technical/creative showcase.

## Experience

Available commands:

```bash
help
about
projects
contact
clear
```

The terminal includes a session-only boot sequence, command history, terminal-style output, clickable project links, and a prompt-based contact flow.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- EmailJS for contact delivery
- Umami for visitor analytics
- Vitest, React Testing Library, and Playwright for tests
- GitHub Actions and Vercel for CI/deployment

## Local Development

```bash
corepack pnpm install
corepack pnpm dev
```

Useful checks:

```bash
corepack pnpm format
corepack pnpm lint
corepack pnpm test
corepack pnpm test:e2e
corepack pnpm build
```

## Documentation

The README is intentionally short. Product context, architecture decisions, production configuration, glossary, branching, and deployment strategy live in [`docs/`](docs/).
