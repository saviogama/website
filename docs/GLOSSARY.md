# Glossary

This glossary captures the shared language for the terminal-style portfolio.
Terms marked as draft should be revisited as product and architecture decisions become concrete.

## Application Terms

- **Terminal experience**: The only primary navigation interface for the MVP, visually and behaviorally inspired by a command-line terminal.
- **Command**: A typed instruction submitted by the visitor, such as `help`, `about`, `projects`, `contact`, or `clear`.
- **Command registry**: Draft term for the source of truth that maps command names to descriptions, handlers, output renderers, and optional aliases.
- **Command handler**: Draft term for the logic that receives a parsed command and returns the terminal output or UI state change.
- **Terminal output**: Content rendered after a command executes. Output should remain close to real terminal text. Clickable project links are the main approved exception for MVP.
- **Reducer/state machine**: The preferred architecture for modeling terminal state, command execution, prompt flows, and async submission states.
- **Prompt**: The visible input line where the visitor types commands. The MVP prompt is `guest@saviogm.dev:~$`.
- **Command history**: Previously executed commands available for keyboard navigation during the current page session only.
- **Autocomplete**: Keyboard-assisted command completion. It is explicitly out of scope for MVP.
- **Invalid command**: A submitted command that does not exist in the command registry. It should show an error and suggest `help`, without fuzzy matching.
- **Clear behavior**: The `clear` command should clear output and restore the initial welcome line.
- **Boot sequence**: The initial terminal startup animation. It should run only on the first visit per page session and stay system-like rather than identity-led.

## Portfolio Content

- **About**: The portfolio section that presents professional background, experience, interests, and current development focus.
- **Project**: A portfolio item with a name, description, technology list, GitHub link, optional live application link, and optional featured flag.
- **Contact**: The portfolio section that lets a visitor send a message without manually copying an email address.
- **Contact prompt flow**: The terminal-style interaction used by the `contact` command to collect name, email, and a multiline message before submission.
- **Contact submission**: The data created when a visitor submits name, email, and message through the terminal prompt flow.
- **Contact validation**: Required-field and email-format validation that must pass before sending a contact submission.
- **Honeypot**: A hidden spam-trap value included with contact submissions. If populated, the submission should be ignored or rejected.
- **EmailJS**: The selected MVP provider for delivering contact submissions without building a custom backend.
- **Project data source**: The typed local `projects.ts` module that owns project metadata for MVP.

## Quality Attributes

- **Single-app structure**: The MVP repository shape should keep the Vite app at the project root instead of introducing a monorepo or `apps/web` layout.
- **pnpm**: The selected package manager.
- **Vercel**: The selected deployment target for the Vite build.
- **Production branch**: The branch that is allowed to produce production deployments. For this project, it is `main`.
- **Integration branch**: The branch where feature work is merged before production promotion. For this project, it is `dev`.
- **Feature branch**: A short-lived branch named with the `feature/*` pattern and merged into `dev`.
- **Tailwind CSS**: The selected styling approach.
- **Strict TypeScript**: TypeScript should run in strict mode from day one.
- **ESLint and Prettier**: ESLint owns correctness and code-quality rules; Prettier owns formatting.
- **Conventional Commits**: The selected commit message convention.
- **CI baseline**: Every push and pull request should run lint, format check, unit/component tests, end-to-end tests, and production build.
- **Vitest and React Testing Library**: The selected test stack for unit, component, and interaction tests.
- **Playwright**: The selected end-to-end testing tool for browser-level MVP flows.
- **Terminal-only navigation**: The MVP product stance that visitors explore the main content through commands rather than fallback menus or section links.
- **Keyboard-first navigation**: The terminal should support efficient keyboard interaction, including typing, deleting, submitting, and history navigation.
- **Accessibility baseline**: The minimum level of screen-reader, focus, contrast, and form usability required before the site is considered ready.
- **Accessibility debt**: Accessibility is intentionally skipped for MVP and should be revisited after the first shippable terminal experience.
- **Terminal animation set**: The required MVP animation group: boot sequence, typing effect, blinking cursor, command output delay, scanlines, and window opening.
- **Retro CRT style**: The selected visual direction for the terminal UI, using CRT-inspired presentation such as scanlines, glow, and terminal phosphor aesthetics.
- **MVP**: The first production version with the smallest complete experience: the five main commands, terminal UI, required terminal-style animations, command history, portfolio content, contact flow, responsive layout, and basic validation.
