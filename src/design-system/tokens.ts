/**
 * Design System Tokens - Bike Shopping UI Inspired
 * Modern E-commerce Visual Language for IT Exam Platform
 */

// Spacing - 8pt grid system (Bike Shopping style)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  huge: 64,
} as const;

// Typography - Clean, Modern (Bike Shopping inspired)
export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
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
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
} as const;

// Border Radius - Bike Shopping style (16px standard)
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

// Shadows - Soft, Modern (Bike Shopping)
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
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

// Light Theme - Bike Shopping Colors
export const lightColors = {
  // Primary - Modern Blue (Bike Shopping)
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#60A5FA',
  
  // Accent - Success Green
  accent: '#22C55E',
  accentDark: '#16A34A',
  accentLight: '#4ADE80',
  
  // Secondary - Purple (for variety)
  secondary: '#8B5CF6',
  secondaryDark: '#7C3AED',
  secondaryLight: '#A78BFA',
  
  // Success
  success: '#22C55E',
  successDark: '#16A34A',
  successLight: '#4ADE80',
  
  // Warning
  warning: '#F59E0B',
  warningDark: '#D97706',
  warningLight: '#FBBF24',
  
  // Error
  error: '#EF4444',
  errorDark: '#DC2626',
  errorLight: '#F87171',
  
  // Info
  info: '#3B82F6',
  infoDark: '#2563EB',
  infoLight: '#60A5FA',
  
  // Slate Scale (Bike Shopping gray palette)
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  
  // Background & Surface
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  surfaceHover: '#F1F5F9',
  
  // Text Colors
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textDisabled: '#CBD5E1',
  
  // Border Colors
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  borderLight: '#F1F5F9',
  
  // Overlay
  overlay: 'rgba(15, 23, 42, 0.5)',
  overlayLight: 'rgba(15, 23, 42, 0.3)',
  
  // Rating/Review
  rating: '#FBBF24',
} as const;

// Dark Theme - Bike Shopping Dark Mode
export const darkColors = {
  // Primary - Brighter blue for dark mode
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  primaryLight: '#93C5FD',
  
  // Accent - Bright green
  accent: '#4ADE80',
  accentDark: '#22C55E',
  accentLight: '#86EFAC',
  
  // Secondary
  secondary: '#A78BFA',
  secondaryDark: '#8B5CF6',
  secondaryLight: '#C4B5FD',
  
  // Success
  success: '#4ADE80',
  successDark: '#22C55E',
  successLight: '#86EFAC',
  
  // Warning
  warning: '#FBBF24',
  warningDark: '#F59E0B',
  warningLight: '#FCD34D',
  
  // Error
  error: '#F87171',
  errorDark: '#EF4444',
  errorLight: '#FCA5A5',
  
  // Info
  info: '#60A5FA',
  infoDark: '#3B82F6',
  infoLight: '#93C5FD',
  
  // Slate Scale (inverted for dark)
  slate50: '#0F172A',
  slate100: '#1E293B',
  slate200: '#334155',
  slate300: '#475569',
  slate400: '#64748B',
  slate500: '#94A3B8',
  slate600: '#CBD5E1',
  slate700: '#E2E8F0',
  slate800: '#F1F5F9',
  slate900: '#F8FAFC',
  
  // Background & Surface
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  surfaceHover: '#475569',
  
  // Text Colors
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverse: '#0F172A',
  textDisabled: '#475569',
  
  // Border Colors
  border: '#334155',
  borderStrong: '#475569',
  borderLight: '#1E293B',
  
  // Overlay
  overlay: 'rgba(15, 23, 42, 0.7)',
  overlayLight: 'rgba(15, 23, 42, 0.5)',
  
  // Rating/Review
  rating: '#FBBF24',
} as const;

// Gradients - Clean, Modern (Bike Shopping)
export const gradients = {
  primary: ['#3B82F6', '#2563EB'],
  accent: ['#22C55E', '#16A34A'],
  secondary: ['#8B5CF6', '#7C3AED'],
  success: ['#22C55E', '#16A34A'],
  warning: ['#F59E0B', '#D97706'],
  error: ['#EF4444', '#DC2626'],
  // Hero gradients
  hero: ['#3B82F6', '#8B5CF6'],
  heroAlt: ['#2563EB', '#7C3AED'],
} as const;

// Touch Targets - Accessibility
export const touchTarget = {
  minHeight: 44,
  minWidth: 44,
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

// Badge Styles (for difficulty, category, etc.)
export const badges = {
  beginner: {
    bg: '#DCFCE7',
    text: '#16A34A',
    border: '#86EFAC',
  },
  intermediate: {
    bg: '#FEF3C7',
    text: '#D97706',
    border: '#FCD34D',
  },
  advanced: {
    bg: '#FEE2E2',
    text: '#DC2626',
    border: '#FCA5A5',
  },
} as const;
