# ADR 0002: Vite React Terminal Architecture

- **Status**: Proposed
- **Date**: 2026-07-03

## Context

The portfolio will be a terminal-only interactive experience with five MVP commands: `help`, `about`, `projects`, `contact`, and `clear`.

The `contact` command is a multi-step prompt flow. The terminal also needs command history, animation states, command output delays, invalid command handling, and session-only boot behavior.

## Decision

Build the site with Vite and React.

Use a single-app repository structure for MVP rather than an `apps/web` workspace layout.
Use pnpm as the package manager.
Use Tailwind CSS for styling.
Deploy the Vite build to Vercel.
Use TypeScript in strict mode from day one.
Use ESLint and Prettier together: ESLint for correctness and code-quality rules, Prettier for formatting.
Use Conventional Commits for commit messages.

CI should run on every push and pull request, covering:

- Lint
- Format check
- Unit/component tests
- End-to-end tests
- Production build

Model terminal behavior with a reducer or small state machine rather than scattered component state. The state model should cover:

- Boot state
- Current input
- Command history
- Output entries
- Active command flow, especially `contact`
- Contact prompt step
- Submission/loading state
- Error and success output

Use typed modules for portfolio data, starting with `projects.ts`.

## Testing Baseline

Use Vitest and React Testing Library as the default unit/component test stack.
Include Playwright end-to-end tests in MVP.

Tests should cover the behavior that is easy to break and central to the concept:

- Command registry returns the expected command metadata
- `help` lists commands only
- `about` renders the expected portfolio text
- `projects` renders project metadata and clickable links
- Invalid commands show the fixed error and suggest `help`
- `clear` restores the initial welcome line
- Command history supports current-session keyboard navigation
- `contact` prompt flow collects name, email, and multiline message
- `contact` validation blocks empty required fields and invalid email
- EmailJS success and failure paths produce terminal output

UI interaction tests are preferred for typing, history navigation, `clear`, invalid commands, and the `contact` flow because those behaviors are defined by user interaction rather than pure data transformation.

Playwright should cover at least one full happy path through the terminal:

- First-session boot sequence appears
- `help` lists commands
- `projects` renders clickable links
- Invalid command suggests `help`
- Command history works through keyboard navigation
- `contact` prompt flow can be completed with mocked EmailJS delivery

Reduced-motion support is not required for MVP.

## Consequences

Vite and React keep the MVP lightweight while leaving room for componentization and test coverage.

A reducer or state machine adds a little upfront structure, but it fits the terminal model better than independent state variables. It should reduce bugs around prompt flow transitions, command execution, and asynchronous contact submission.
