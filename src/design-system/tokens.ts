/**
 * Design System Tokens - Parny.io Inspired
 * Modern, Professional, AI-Native Design
 */

// Spacing Scale (8px base) - More generous like Parny
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  huge: 96,
} as const;

// Typography Scale - Clean & Professional
export const typography = {
  h1: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '800' as const,
    letterSpacing: -1,
  },
  h2: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  bodyBold: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  captionBold: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  small: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  smallBold: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
} as const;

// Border Radius - Softer, more modern
export const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

// Shadows - Subtle and professional like Parny
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
} as const;

// Light Theme Colors - Parny inspired
export const lightColors = {
  // Primary - Professional Purple/Blue
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  
  // Secondary
  secondary: '#8b5cf6',
  secondaryDark: '#7c3aed',
  secondaryLight: '#a78bfa',
  
  // Accent
  accent: '#ec4899',
  accentDark: '#db2777',
  
  // Success
  success: '#10b981',
  successDark: '#059669',
  successLight: '#34d399',
  
  // Warning
  warning: '#f59e0b',
  warningDark: '#d97706',
  warningLight: '#fbbf24',
  
  // Error
  error: '#ef4444',
  errorDark: '#dc2626',
  errorLight: '#f87171',
  
  // Info
  info: '#3b82f6',
  infoDark: '#2563eb',
  infoLight: '#60a5fa',
  
  // Neutral Scale
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  
  // Background & Surface
  background: '#ffffff',
  backgroundSecondary: '#fafafa',
  surface: '#ffffff',
  surfaceSecondary: '#f5f5f5',
  surfaceHover: '#fafafa',
  
  // Text Colors
  textPrimary: '#171717',
  textSecondary: '#525252',
  textTertiary: '#a3a3a3',
  textInverse: '#ffffff',
  textDisabled: '#d4d4d4',
  
  // Border Colors
  border: '#e5e5e5',
  borderStrong: '#d4d4d4',
  borderLight: '#f5f5f5',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

// Dark Theme Colors
export const darkColors = {
  // Primary
  primary: '#818cf8',
  primaryDark: '#6366f1',
  primaryLight: '#a5b4fc',
  
  // Secondary
  secondary: '#a78bfa',
  secondaryDark: '#8b5cf6',
  secondaryLight: '#c4b5fd',
  
  // Accent
  accent: '#f472b6',
  accentDark: '#ec4899',
  
  // Success
  success: '#34d399',
  successDark: '#10b981',
  successLight: '#6ee7b7',
  
  // Warning
  warning: '#fbbf24',
  warningDark: '#f59e0b',
  warningLight: '#fcd34d',
  
  // Error
  error: '#f87171',
  errorDark: '#ef4444',
  errorLight: '#fca5a5',
  
  // Info
  info: '#60a5fa',
  infoDark: '#3b82f6',
  infoLight: '#93c5fd',
  
  // Neutral Scale
  neutral50: '#171717',
  neutral100: '#262626',
  neutral200: '#404040',
  neutral300: '#525252',
  neutral400: '#737373',
  neutral500: '#a3a3a3',
  neutral600: '#d4d4d4',
  neutral700: '#e5e5e5',
  neutral800: '#f5f5f5',
  neutral900: '#fafafa',
  
  // Background & Surface
  background: '#0a0a0a',
  backgroundSecondary: '#171717',
  surface: '#171717',
  surfaceSecondary: '#262626',
  surfaceHover: '#1f1f1f',
  
  // Text Colors
  textPrimary: '#fafafa',
  textSecondary: '#d4d4d4',
  textTertiary: '#a3a3a3',
  textInverse: '#0a0a0a',
  textDisabled: '#525252',
  
  // Border Colors
  border: '#262626',
  borderStrong: '#404040',
  borderLight: '#171717',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
} as const;

// Gradients - Parny style
export const gradients = {
  primary: ['#6366f1', '#8b5cf6'],
  secondary: ['#8b5cf6', '#ec4899'],
  success: ['#10b981', '#059669'],
  warning: ['#f59e0b', '#d97706'],
  error: ['#ef4444', '#dc2626'],
  purple: ['#a78bfa', '#8b5cf6'],
  blue: ['#60a5fa', '#3b82f6'],
  pink: ['#f472b6', '#ec4899'],
  emerald: ['#34d399', '#10b981'],
  // Hero gradients
  hero: ['#6366f1', '#8b5cf6', '#ec4899'],
  heroAlt: ['#3b82f6', '#8b5cf6'],
} as const;

// Touch Targets
export const touchTarget = {
  minHeight: 48,
  minWidth: 48,
} as const;

// Animation Durations
export const duration = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

// Z-Index Scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
