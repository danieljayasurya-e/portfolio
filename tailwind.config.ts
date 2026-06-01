import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* ===== Brutalist palette ===== */
        ink: {
          DEFAULT: "#0A0A0A",
          muted: "#3A3A38",
          soft: "#6B6B66",
        },
        paper: {
          DEFAULT: "#FBF9F0",
          soft: "#F1EBDA",
        },
        cream: "#F1EBDA",
        /* Maximalist clash accents */
        lime: "#C7F501",
        cyan: "#22E0F2",
        pink: "#FF4D8D",
        violet: "#7C5CFF",
        orange: "#FF6A1A",
        yellow: "#FFD400",

        /* brand kept for any leftover refs (mapped to violet scale) */
        brand: {
          50: "#EFEBFF",
          100: "#DDD4FF",
          200: "#C4B5FF",
          300: "#A593FF",
          400: "#8E78FF",
          500: "#7C5CFF",
          600: "#6A48F0",
          700: "#5736D0",
          800: "#3F27A0",
          900: "#2A1A6B",
        },
        surface: {
          DEFAULT: "#FBF9F0",
          soft: "#F1EBDA",
          tint: "#EFEBFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0 0 #0A0A0A",
        "brutal": "4px 4px 0 0 #0A0A0A",
        "brutal-md": "6px 6px 0 0 #0A0A0A",
        "brutal-lg": "8px 8px 0 0 #0A0A0A",
        "brutal-xl": "12px 12px 0 0 #0A0A0A",
        /* legacy names mapped to brutalist equivalents */
        "soft": "2px 2px 0 0 #0A0A0A",
        "card": "4px 4px 0 0 #0A0A0A",
        "float": "8px 8px 0 0 #0A0A0A",
        "glow": "4px 4px 0 0 #0A0A0A",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 28s linear infinite",
        "blink": "blink 1s steps(1) infinite",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(rgba(10,10,10,0.10) 1.5px, transparent 1.5px)",
        "line-grid": "linear-gradient(rgba(10,10,10,0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(10,10,10,0.08) 2px, transparent 2px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
