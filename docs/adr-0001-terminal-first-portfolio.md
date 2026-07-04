# ADR 0001: Terminal-First Portfolio Experience

- **Status**: Proposed
- **Date**: 2026-07-03

## Context

The project is a personal developer portfolio. Its goal is to present background, projects, and contact options while also demonstrating technical care, organization, creativity, and frontend implementation quality.

The chosen concept is a portfolio that behaves like an interactive terminal instead of a conventional page with static navigation. Visitors type commands such as `help`, `about`, `projects`, `contact`, and `clear` to explore the site.

The initial scope also includes keyboard navigation, command history, responsive design, accessibility, contact form validation, automated tests, and CI/CD. Autocomplete is explicitly not required for the MVP.

## Decision

Use a terminal-first interaction model as the primary portfolio experience.
The MVP will not include conventional fallback navigation for the main sections.
This is an intentional product choice: the site is optimized for technical peers and as a creative showcase, not for the fastest possible recruiter scan.

The terminal will expose a small command set for the MVP:

- `help`
- `about`
- `projects`
- `contact`
- `clear`

The implementation should treat commands as product-level concepts, not one-off UI conditionals. Command names, descriptions, handlers, and aliases should have a clear source of truth so that help text, tests, and command execution do not drift apart.

Command output should stay close to a real terminal. The main exception is the `projects` output: repository and live-application URLs may render as clickable links while preserving a terminal-like visual presentation.
Project links should open in a new tab.

Project metadata should live in a typed local `projects.ts` data module for MVP.
Each project should include:

- `name`
- `description`
- `technologies`
- `githubUrl`
- `liveUrl`, optional
- `featured`, optional

The `contact` command should use a terminal-style prompt flow instead of rendering a conventional form. The selected flow is:

- Ask for name
- Ask for email
- Ask for message
- Validate the collected values
- Submit through the selected delivery provider
- Print success or failure output in the terminal

The message input should support multiple lines.
Contact validation should block submission when required fields are empty or the email is invalid.
Contact submissions should include a hidden honeypot value for basic spam resistance.

Contact delivery should use EmailJS for MVP.

The MVP is considered done when the five main commands work and the terminal UI includes terminal-style animations. Required animations are:

- Boot sequence
- Typing effect
- Blinking cursor
- Command output delay
- Scanlines
- Window opening

Command history is required for MVP. Autocomplete is not required for MVP.
Command history should last only for the current page session and should not survive reloads.

The visual style should be retro CRT.
The boot sequence should run only on the first visit per page session.
The boot sequence should be system-like rather than identity-led. The site can reveal personal identity through `about`.

The terminal prompt should be:

```text
guest@saviogama.dev:~$
```

Invalid commands should render a simple terminal-style error and suggest `help`. The MVP should not attempt fuzzy matching or closest-command suggestions.

The `clear` command should clear the terminal output and then restore the initial welcome line.

The `help` command should list available commands only. It should not include examples in MVP.

The application language is English only.

## Consequences

This direction makes the portfolio more distinctive and gives the implementation room to demonstrate frontend craft. It also raises product risks:

- Some visitors may not know what to type.
- Recruiters and hiring managers may scan quickly and miss important content.
- Mobile typing may be slower than tapping visible navigation.
- Accessibility requires deliberate design because terminal metaphors can be hostile to assistive technology when implemented casually.
- The contact form has backend, spam, validation, deliverability, privacy, and error-handling implications.

Because fallback navigation is intentionally out of scope, the `help` command, opening message, focus behavior, and mobile keyboard experience become critical MVP requirements rather than polish.
Accessibility work is intentionally skipped for MVP, but this is a known debt rather than a signal that accessibility does not matter.

## Open Questions

- What accessibility target should be adopted after MVP?

## Current Recommendation

Proceed with a terminal-only design only if the MVP includes a strong `help` experience, visible onboarding text, reliable focus management, keyboard support, mobile usability checks, and basic accessibility validation.

For project content, use local structured TypeScript data for the first version. Markdown is better when project writeups become long-form content, but the current requirement is structured: name, description, technologies, GitHub URL, and optional live URL.

EmailJS should still be treated as an external dependency with validation, rate-limit/spam considerations, environment variables for public keys/templates, and a graceful error message when delivery fails.
