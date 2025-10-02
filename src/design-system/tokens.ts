/**
 * iOS-Style Glassmorphism Design System
 * Premium, Modern, Apple-inspired Design
 */

// Spacing Scale - iOS generous spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const;

// Typography - SF Pro inspired
export const typography = {
  h1: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.4,
  },
  h2: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.4,
  },
  h3: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },
  h4: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.4,
  },
  bodyLarge: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: -0.4,
  },
  bodyBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.4,
  },
  caption: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.2,
  },
  captionBold: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.1,
  },
  smallBold: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
} as const;

// Border Radius - iOS style
export const radius = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
} as const;

// Shadows - Soft iOS shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

// Light Theme - iOS Glassmorphism
export const lightColors = {
  // Primary - iOS Blue
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#4DA2FF',
  
  // Secondary - iOS Purple
  secondary: '#AF52DE',
  secondaryDark: '#8944AB',
  secondaryLight: '#C77FEA',
  
  // Accent - iOS Pink
  accent: '#FF2D55',
  accentDark: '#D50032',
  
  // Success - iOS Green
  success: '#34C759',
  successDark: '#248A3D',
  successLight: '#5DD67D',
  
  // Warning - iOS Orange
  warning: '#FF9500',
  warningDark: '#C93400',
  warningLight: '#FFB340',
  
  // Error - iOS Red
  error: '#FF3B30',
  errorDark: '#D70015',
  errorLight: '#FF6961',
  
  // Info - iOS Teal
  info: '#5AC8FA',
  infoDark: '#0A84FF',
  infoLight: '#64D2FF',
  
  // Neutral Scale - iOS grays
  neutral50: '#F9F9F9',
  neutral100: '#F2F2F7',
  neutral200: '#E5E5EA',
  neutral300: '#D1D1D6',
  neutral400: '#C7C7CC',
  neutral500: '#AEAEB2',
  neutral600: '#8E8E93',
  neutral700: '#636366',
  neutral800: '#48484A',
  neutral900: '#1C1C1E',
  
  // Glass surfaces
  glass: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(255, 255, 255, 0.5)',
  glassLight: 'rgba(255, 255, 255, 0.9)',
  
  // Background
  background: '#F2F2F7',
  backgroundSecondary: '#FFFFFF',
  surface: 'rgba(255, 255, 255, 0.8)',
  surfaceSecondary: 'rgba(255, 255, 255, 0.6)',
  surfaceHover: 'rgba(255, 255, 255, 0.9)',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textInverse: '#FFFFFF',
  textDisabled: '#C7C7CC',
  
  // Border
  border: 'rgba(0, 0, 0, 0.08)',
  borderStrong: 'rgba(0, 0, 0, 0.12)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
} as const;

// Dark Theme - iOS Dark Mode
export const darkColors = {
  // Primary - iOS Blue (brighter in dark mode)
  primary: '#0A84FF',
  primaryDark: '#007AFF',
  primaryLight: '#409CFF',
  
  // Secondary - iOS Purple
  secondary: '#BF5AF2',
  secondaryDark: '#AF52DE',
  secondaryLight: '#D27BFF',
  
  // Accent - iOS Pink
  accent: '#FF375F',
  accentDark: '#FF2D55',
  
  // Success - iOS Green
  success: '#32D74B',
  successDark: '#30D158',
  successLight: '#63DE76',
  
  // Warning - iOS Orange
  warning: '#FF9F0A',
  warningDark: '#FF9500',
  warningLight: '#FFB340',
  
  // Error - iOS Red
  error: '#FF453A',
  errorDark: '#FF3B30',
  errorLight: '#FF6961',
  
  // Info - iOS Teal
  info: '#64D2FF',
  infoDark: '#5AC8FA',
  infoLight: '#90E0FF',
  
  // Neutral Scale
  neutral50: '#000000',
  neutral100: '#1C1C1E',
  neutral200: '#2C2C2E',
  neutral300: '#3A3A3C',
  neutral400: '#48484A',
  neutral500: '#636366',
  neutral600: '#8E8E93',
  neutral700: '#AEAEB2',
  neutral800: '#C7C7CC',
  neutral900: '#E5E5EA',
  
  // Glass surfaces - Dark mode frosted glass
  glass: 'rgba(28, 28, 30, 0.7)',
  glassDark: 'rgba(28, 28, 30, 0.5)',
  glassLight: 'rgba(28, 28, 30, 0.9)',
  
  // Background
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  surface: 'rgba(28, 28, 30, 0.8)',
  surfaceSecondary: 'rgba(44, 44, 46, 0.6)',
  surfaceHover: 'rgba(44, 44, 46, 0.9)',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#AEAEB2',
  textInverse: '#000000',
  textDisabled: '#636366',
  
  // Border
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',
  borderLight: 'rgba(255, 255, 255, 0.04)',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',
} as const;

// Gradients - Subtle iOS style
export const gradients = {
  primary: ['#007AFF', '#0A84FF'],
  secondary: ['#AF52DE', '#BF5AF2'],
  success: ['#34C759', '#32D74B'],
  warning: ['#FF9500', '#FF9F0A'],
  error: ['#FF3B30', '#FF453A'],
  purple: ['#AF52DE', '#BF5AF2'],
  blue: ['#007AFF', '#0A84FF'],
  pink: ['#FF2D55', '#FF375F'],
  emerald: ['#34C759', '#32D74B'],
  // iOS gradients
  hero: ['#007AFF', '#AF52DE'],
  heroAlt: ['#0A84FF', '#BF5AF2', '#FF375F'],
  glass: ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)'],
} as const;

// Blur Intensity - for BlurView
export const blur = {
  light: 10,
  regular: 20,
  prominent: 40,
  ultra: 60,
} as const;

// Touch Targets
export const touchTarget = {
  minHeight: 44,
  minWidth: 44,
} as const;

// Animation Durations - iOS-like
export const duration = {
  fast: 200,
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
