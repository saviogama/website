# Website

## Overview

This project is a personal portfolio website designed to present my journey as a developer, my projects, and ways to contact me.

The goal is to create a portfolio that differs from the traditional format of clickable pages. Instead of using a common navigation structure with menus and static cards, the website will be built as an experience inspired by an interactive terminal.

When accessing the website, the user will see an interface similar to a terminal, with an initial presentation message and the possibility to navigate through the content by typing commands.

## Project objective

The main objective is to have a dedicated space to present my work as a developer, bringing together information about me, relevant projects, and a simple way to get in touch.

In addition to working as a portfolio, the project also aims to demonstrate technical care, organization, creativity, and mastery of important development concepts.

## Concept

The website will be an interactive terminal-based experience.

Instead of navigating only by clicking buttons or links, the user will be able to interact with the portfolio by typing commands, as if they were using a real command line.

Examples of possible commands:

```bash
help
about
projects
contact
clear
```

The `help` command will be the main entry point to guide the user, displaying the list of available commands and explaining what each one does.

Navigation should also support common terminal interactions, such as typing, deleting, executing commands, and navigating through command history using the keyboard.

## Main website structure

The portfolio content will initially be organized into three main sections:

### About

The `about` section will be responsible for presenting who I am.

It should contain a description of my background, professional experience, technical interests, and the type of work I do.

### Projects

The `projects` section will be dedicated to displaying my projects.

Each project should contain essential information, such as name, short description, technologies used, and related links.

Every project should have a link to its GitHub repository.

When the project also has a published web version, there should be a second link pointing to the running application.

Example of project information:

```text
Project name
Short description
Technologies used
GitHub link
Application link, when available
```

Projects that are only APIs, servers, or libraries may display only the GitHub link.

### Contact

The `contact` section will be dedicated to direct contact.

The idea is to allow someone to send a message directly through the website, without needing to manually copy my email address.

This section should contain a simple form with fields such as:

```text
Name
Email
Message
```

When the form is submitted, the message should be forwarded to my email.

This feature makes contact more direct and improves the experience for anyone accessing the portfolio.

## User experience

The expected experience is for the user to feel like they are navigating through a real terminal.

When opening the website, the terminal should load with an initial presentation message and a suggestion to use the `help` command.

Example:

```bash
Welcome to my portfolio.
Type "help" to see available commands.
```

From there, the user will be able to explore the website by typing commands.

The terminal should accept text input, execute valid commands, display error messages for unknown commands, and allow smooth keyboard-based navigation.

Example of an invalid command:

```bash
Command not found. Type "help" to see available commands.
```

## Initial commands

The first version of the project should support at least the following commands:

```bash
help
```

Displays the list of available commands.

```bash
about
```

Displays the section with information about me.

```bash
projects
```

Displays the list of registered projects.

```bash
contact
```

Displays the contact information or contact form.

```bash
clear
```

Clears the terminal.

## Initial scope

The project should focus on a simple, functional, and well-executed experience.

The initial goal is not to create a complete terminal, but rather an interactive interface that is enough to serve as a portfolio and demonstrate creativity in development.

The initial scope includes:

- Terminal-inspired visual interface;
- Initial presentation message;
- Basic command system;
- About me section;
- Projects section;
- Contact section;
- Basic keyboard navigation support;
- Links to GitHub and published applications;
- Functional contact form.

## Technical project guidelines

From the first version, the project should be developed with a focus on organization, technical quality, and development best practices.

The goal is not only to create a visually interesting portfolio, but also to build a project that demonstrates technical maturity, architectural care, standardization, and maintainability.

From the beginning, the project should follow guidelines such as:

- Clear and organized folder structure;
- Proper separation of responsibilities;
- Reusable and well-defined components;
- Commit standardization;
- Well-defined branch workflow;
- Automated tests;
- CI/CD pipeline;
- Contact form validations;
- Error handling for invalid commands;
- Terminal command history;
- Keyboard navigation;
- Command autocomplete;
- Animations and visual effects consistent with the terminal proposal;
- Responsiveness;
- Accessibility best practices;
- Clean, readable, and maintainable code.

These guidelines are part of the project’s base scope and should be considered from the beginning of development.

Even if some features are implemented incrementally, the project structure should be designed to support future evolution without requiring major refactors.

## Summary

This project will be a personal portfolio with terminal-inspired navigation, created to present my experience, my projects, and ways to contact me.

The proposal is to combine a professional presentation with a more creative and interactive experience, moving away from the common format of traditional portfolios and reinforcing my identity as a developer.
