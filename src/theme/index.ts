// Centralized theme tokens for the app. Update here to rebrand quickly.

export const colors = {
  // Brand
  primary: '#1E64F0',
  primaryStrong: '#2D7CF6',
  primaryWeak: '#9bbdf9',

  // Base
  background: '#f3f7ff',
  surface: '#ffffff',
  border: '#E0E0E0',
  text: '#111827',
  textMuted: '#637082',
  hint: '#9E9E9E',
  white: '#ffffff',
  black: '#000000',

  // status
  success: '#00C853',
  error: '#D32F2F',
  warning: '#FFC107',
  info: '#1E88E5',
};

export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
  round: 999,
};

export const typography = {
  title: 22,
  subtitle: 16,
  body: 14,
  caption: 12,
  icon: 26,
  input: 16,
  otp: 20,
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const elevation = {
  card: {
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
  },
};

export const layout = {
  screenPadding: spacing.lg,
  inputHeight: 48,
  fabSize: 56,
};

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  elevation,
  layout,
} as const;

export type Theme = typeof theme;


