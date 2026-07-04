import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setupUmamiAnalytics } from "./umami";

describe("setupUmamiAnalytics", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("injects the Umami script when analytics env vars are configured", () => {
    vi.stubEnv("VITE_UMAMI_SCRIPT_URL", "https://analytics.example.com/script.js");
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "website-id");

    setupUmamiAnalytics();

    const script = document.getElementById("umami-analytics") as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.src).toBe("https://analytics.example.com/script.js");
    expect(script?.dataset.websiteId).toBe("website-id");
    expect(script?.defer).toBe(true);
  });

  it("does not inject the Umami script without the required env vars", () => {
    setupUmamiAnalytics();

    expect(document.getElementById("umami-analytics")).toBeNull();
  });

  it("does not inject duplicate scripts", () => {
    vi.stubEnv("VITE_UMAMI_SCRIPT_URL", "https://analytics.example.com/script.js");
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "website-id");

    setupUmamiAnalytics();
    setupUmamiAnalytics();

    expect(document.querySelectorAll("#umami-analytics")).toHaveLength(1);
  });
});
