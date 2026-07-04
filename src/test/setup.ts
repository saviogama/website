import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "crypto", {
  value: {
    randomUUID: () => Math.random().toString(36).slice(2),
  },
});
