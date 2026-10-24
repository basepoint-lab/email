/**
 * Basepoint Brand Color System
 * Canonical source of truth for all digital products in the Basepoint ecosystem.
 */

export const brandColors = {
  pine: {
    DEFAULT: '#003922',
    deep: '#002516',
    dark: '#00180e',
    light: '#004f2f',
    surface: 'rgba(0, 57, 34, 0.05)',
    border: 'rgba(0, 57, 34, 0.12)',
  },
  lime: {
    DEFAULT: '#a7ff6d',
    hover: '#8ef74e',
    light: '#c7ffa3',
    dark: '#7de53e',
    surface: 'rgba(167, 255, 109, 0.15)',
  },
  secondaryLime: {
    DEFAULT: '#8ef74e',
    light: '#bafc86',
    dark: '#72e833',
  },
  // Backwards compatibility alias for spring
  spring: {
    DEFAULT: '#8ef74e',
    light: '#bafc86',
    dark: '#72e833',
  },
  mutedGreen: {
    DEFAULT: '#5d7634',
    light: '#7b9944',
    dark: '#455826',
  },
} as const;

export const surfaceColors = {
  canvas: '#f6ffe8',
  card: '#FFFFFF',
  subtle: '#F2F4EF',
  border: {
    subtle: '#DDE3D9',
    light: '#EAEFE7',
    dark: 'rgba(255, 255, 255, 0.12)',
    focus: '#003922',
  },
} as const;

export const textColors = {
  primary: '#003922',
  secondary: '#202820',
  muted: '#5e665d',
  lightMuted: '#8B968A',
  inverse: '#FFFFFF',
  inverseMuted: 'rgba(255, 255, 255, 0.70)',
} as const;

export const darkModeColors = {
  canvas: '#00180e',
  card: '#002516',
  subtle: '#003922',
  border: 'rgba(255, 255, 255, 0.12)',
  text: {
    primary: '#f6ffe8',
    secondary: 'rgba(246, 255, 232, 0.82)',
    muted: 'rgba(246, 255, 232, 0.58)',
    inverse: '#003922',
  },
} as const;

export const pillarColors = {
  learn: {
    primary: '#1D4ED8', // Royal Blue
    badge: '#DBEAFE',
    text: '#1E40AF',
  },
  build: {
    primary: '#B45309', // Amber
    badge: '#FEF3C7',
    text: '#92400E',
  },
  launch: {
    primary: '#047857', // Emerald
    badge: '#D1FAE5',
    text: '#065F46',
  },
  operations: {
    primary: '#475569', // Slate
    badge: '#F1F5F9',
    text: '#334155',
  },
} as const;

export const statusColors = {
  success: {
    DEFAULT: '#15803d',
    surface: '#ecfdf5',
    border: '#a7f3d0',
  },
  warning: {
    DEFAULT: '#b45309',
    surface: '#fffbeb',
    border: '#fde68a',
  },
  error: {
    DEFAULT: '#b91c1c',
    surface: '#fef2f2',
    border: '#fecaca',
  },
  info: {
    DEFAULT: '#1d4ed8',
    surface: '#eff6ff',
    border: '#bfdbfe',
  },
} as const;

export const semanticColors = {
  background: {
    default: surfaceColors.canvas,
    surface: surfaceColors.card,
    subtle: surfaceColors.subtle,
    dark: darkModeColors.canvas,
    darkSurface: darkModeColors.card,
  },
  foreground: {
    default: textColors.primary,
    secondary: textColors.secondary,
    muted: textColors.muted,
    inverse: textColors.inverse,
  },
  border: {
    default: surfaceColors.border.subtle,
    light: surfaceColors.border.light,
    dark: surfaceColors.border.dark,
    focus: surfaceColors.border.focus,
  },
} as const;

export const colors = {
  brand: brandColors,
  surface: surfaceColors,
  text: textColors,
  dark: darkModeColors,
  pillar: pillarColors,
  status: statusColors,
  semantic: semanticColors,
} as const;

export type Colors = typeof colors;
