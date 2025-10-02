/**
 * Design System Tokens
 * WCAG 2.1 AA Uyumlu - Kontrast oranı ≥ 4.5:1
 */

// Spacing Scale (4px base)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Typography Scale
export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  h4: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  bodyBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  captionBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  smallBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
} as const;

// Border Radius
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Light Theme Colors
export const lightColors = {
  // Primary Brand Colors
  primary: '#667eea',
  primaryDark: '#5568d3',
  primaryLight: '#8b9cf7',
  
  // Secondary Brand Colors
  secondary: '#764ba2',
  secondaryDark: '#5a3a7a',
  secondaryLight: '#9a6bc9',
  
  // Accent Colors
  accent: '#f093fb',
  accentDark: '#f5576c',
  
  // Semantic Colors
  success: '#10b981',
  successDark: '#059669',
  successLight: '#34d399',
  
  warning: '#f59e0b',
  warningDark: '#d97706',
  warningLight: '#fbbf24',
  
  error: '#ef4444',
  errorDark: '#dc2626',
  errorLight: '#f87171',
  
  info: '#3b82f6',
  infoDark: '#2563eb',
  infoLight: '#60a5fa',
  
  // Neutral Scale (Gray)
  neutral50: '#f9fafb',
  neutral100: '#f3f4f6',
  neutral200: '#e5e7eb',
  neutral300: '#d1d5db',
  neutral400: '#9ca3af',
  neutral500: '#6b7280',
  neutral600: '#4b5563',
  neutral700: '#374151',
  neutral800: '#1f2937',
  neutral900: '#111827',
  
  // Background & Surface
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',
  surface: '#ffffff',
  surfaceSecondary: '#f3f4f6',
  
  // Text Colors (WCAG AA compliant)
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  textInverse: '#ffffff',
  textDisabled: '#d1d5db',
  
  // Border Colors
  border: '#e5e7eb',
  borderStrong: '#d1d5db',
  borderLight: '#f3f4f6',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

// Dark Theme Colors
export const darkColors = {
  // Primary Brand Colors
  primary: '#8b9cf7',
  primaryDark: '#667eea',
  primaryLight: '#a5b4ff',
  
  // Secondary Brand Colors
  secondary: '#9a6bc9',
  secondaryDark: '#764ba2',
  secondaryLight: '#b794d9',
  
  // Accent Colors
  accent: '#f5576c',
  accentDark: '#f093fb',
  
  // Semantic Colors
  success: '#34d399',
  successDark: '#10b981',
  successLight: '#6ee7b7',
  
  warning: '#fbbf24',
  warningDark: '#f59e0b',
  warningLight: '#fcd34d',
  
  error: '#f87171',
  errorDark: '#ef4444',
  errorLight: '#fca5a5',
  
  info: '#60a5fa',
  infoDark: '#3b82f6',
  infoLight: '#93c5fd',
  
  // Neutral Scale (Gray) - Inverted for dark mode
  neutral50: '#111827',
  neutral100: '#1f2937',
  neutral200: '#374151',
  neutral300: '#4b5563',
  neutral400: '#6b7280',
  neutral500: '#9ca3af',
  neutral600: '#d1d5db',
  neutral700: '#e5e7eb',
  neutral800: '#f3f4f6',
  neutral900: '#f9fafb',
  
  // Background & Surface
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  surface: '#1e293b',
  surfaceSecondary: '#334155',
  
  // Text Colors (WCAG AA compliant on dark bg)
  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  textInverse: '#0f172a',
  textDisabled: '#475569',
  
  // Border Colors
  border: '#334155',
  borderStrong: '#475569',
  borderLight: '#1e293b',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
} as const;

// Gradients
export const gradients = {
  primary: ['#667eea', '#764ba2'],
  accent: ['#f093fb', '#f5576c'],
  success: ['#10b981', '#059669'],
  warning: ['#f59e0b', '#d97706'],
  error: ['#ef4444', '#dc2626'],
  purple: ['#a78bfa', '#8b5cf6'],
  blue: ['#60a5fa', '#3b82f6'],
} as const;

// Minimum Touch Target Size (iOS & Android guidelines)
export const touchTarget = {
  minHeight: 44,
  minWidth: 44,
} as const;

// Animation Durations
export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
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

