import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#000000",
          panel: "#000000",
          glow: "#83F44F",
          text: "#83F44F",
          dim: "#83F44F",
          muted: "#83F44F",
          line: "#83F44F",
          content: "#70D143",
          danger: "#F5514E",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        "boot-sweep": {
          "0%": { transform: "translateY(-34vh) scaleX(0.12)", opacity: "0" },
          "8%, 72%": { opacity: "1" },
          "100%": { transform: "translateY(34vh) scaleX(1)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        "boot-sweep": "boot-sweep 1.9s steps(9, end) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
