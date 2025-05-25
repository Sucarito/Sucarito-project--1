export const unifiedDesignSystem = {
  // Grid System
  grid: {
    columns: {
      mobile: 4,
      tablet: 8,
      desktop: 12,
    },
    gutter: {
      mobile: 16,
      tablet: 24,
      desktop: 32,
    },
    margin: {
      mobile: 16,
      tablet: 32,
      desktop: 64,
    },
  },

  // Color Palette - Neutral with subtle accents
  colors: {
    surface: {
      primary: "#FFFFFF",
      secondary: "#FAFAFA",
      tertiary: "#F5F5F5",
      elevated: "#FFFFFF",
    },
    background: {
      default: "#FCFCFC",
      paper: "#FFFFFF",
      canvas: "#F8F9FA",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.60)",
      tertiary: "rgba(0, 0, 0, 0.38)",
      disabled: "rgba(0, 0, 0, 0.12)",
    },
    divider: "rgba(0, 0, 0, 0.06)",
    action: {
      primary: "#1976D2",
      primaryHover: "#1565C0",
      secondary: "#757575",
      secondaryHover: "#616161",
    },
    status: {
      success: "#4CAF50",
      warning: "#FF9800",
      error: "#F44336",
      info: "#2196F3",
    },
  },

  // Typography - Clean and modern
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      secondary:
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
    },
    scale: {
      h1: { size: "2.5rem", lineHeight: 1.2, weight: 300, letterSpacing: "-0.02em" },
      h2: { size: "2rem", lineHeight: 1.3, weight: 400, letterSpacing: "-0.01em" },
      h3: { size: "1.75rem", lineHeight: 1.4, weight: 400, letterSpacing: "0" },
      h4: { size: "1.5rem", lineHeight: 1.4, weight: 500, letterSpacing: "0" },
      h5: { size: "1.25rem", lineHeight: 1.5, weight: 500, letterSpacing: "0" },
      h6: { size: "1.125rem", lineHeight: 1.5, weight: 500, letterSpacing: "0" },
      body1: { size: "1rem", lineHeight: 1.5, weight: 400, letterSpacing: "0" },
      body2: { size: "0.875rem", lineHeight: 1.43, weight: 400, letterSpacing: "0" },
      caption: { size: "0.75rem", lineHeight: 1.33, weight: 400, letterSpacing: "0.03em" },
      button: { size: "0.875rem", lineHeight: 1.75, weight: 500, letterSpacing: "0.02em" },
    },
  },

  // Spacing - Harmonious whitespace
  spacing: {
    unit: 8,
    scale: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
      xxxl: 64,
    },
  },

  // Elevation - Subtle shadows
  elevation: {
    0: "none",
    1: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    2: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    3: "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    4: "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    5: "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Transitions
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    standard: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      decelerate: "cubic-bezier(0.0, 0, 0.2, 1)",
      accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },

  // Breakpoints
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}
