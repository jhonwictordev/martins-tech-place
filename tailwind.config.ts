import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        brand: "#2563EB",
        cyan: "#06B6D4",
        snow: "#FFFFFF",
        mist: "#E5E7EB",
        success: "#22C55E"
      },
      fontFamily: {
        sans: [
          "Aptos",
          "Trebuchet MS",
          "Segoe UI",
          "sans-serif"
        ],
        display: [
          "Bahnschrift",
          "Segoe UI Variable Display",
          "Arial Narrow",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 24px 50px -24px rgba(15, 23, 42, 0.45)",
        glow: "0 12px 30px -12px rgba(37, 99, 235, 0.45)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(37,99,235,0.16), transparent 35%), linear-gradient(135deg, rgba(6,182,212,0.08) 0%, transparent 40%), linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
