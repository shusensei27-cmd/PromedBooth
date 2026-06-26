export const theme = {
  colors: {
    primary: "#2563EB",
    secondary: "#FFFFFF",
    background: "#F8FAFC",
    metal: "#D1D5DB",
    border: "#CBD5E1",
    accent: "#DBEAFE",
    foreground: "#1E293B",
    muted: "#94A3B8",
    destructive: "#EF4444",
    success: "#22C55E",
    warning: "#F59E0B",
    surface: "#FFFFFF",
  },
  radius: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  shadows: {
    card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    elevated: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    industrial: "4px 4px 0px 0px rgba(0,0,0,0.08), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    metal: "inset 0 2px 4px 0 rgba(255,255,255,0.5), 0 2px 4px 0 rgba(0,0,0,0.1)",
  },
  fonts: {
    heading: "'Courier New', Courier, monospace",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
} as const;

export type Theme = typeof theme;
