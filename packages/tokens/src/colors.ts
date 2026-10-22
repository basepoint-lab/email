/**
 * Basepoint Brand Color System
 * Canonical source of truth for all digital products in the Basepoint ecosystem.
 */

export const brandColors = {
  pine: {
    DEFAULT: '#003D28',
    deep: '#00271D',
    dark: '#001A13',
    light: '#00543F',
    surface: 'rgba(0, 61, 40, 0.05)',
    border: 'rgba(0, 61, 40, 0.12)',
  },
  lime: {
    DEFAULT: '#A5FF70',
    hover: '#8CFF50',
    light: '#C8FFA8',
    dark: '#76E63A',
    surface: 'rgba(165, 255, 112, 0.15)',
  },
  secondaryLime: {
    DEFAULT: '#8CFF50',
    light: '#B2FF8A',
    dark: '#6FE633',
  },
  // Backwards compatibility alias for spring
  spring: {
    DEFAULT: '#8CFF50',
    light: '#B2FF8A',
    dark: '#6FE633',
  },
  mutedGreen: {
    DEFAULT: '#647C38',
    light: '#83A24B',
    dark: '#4B5E29',
  },
} as const;

export const surfaceColors = {
  canvas: '#F6FFE9',
  card: '#FFFFFF',
  subtle: '#F2F4EF',
  border: {
    subtle: '#DDE3D9',
    light: '#EAEFE7',
    dark: 'rgba(255, 255, 255, 0.12)',
    focus: '#003D28',
  },
} as const;

export const textColors = {
  primary: '#003D28',
  secondary: '#202820',
  muted: '#687368',
  lightMuted: '#8B968A',
  inverse: '#FFFFFF',
  inverseMuted: 'rgba(255, 255, 255, 0.70)',
} as const;

export const darkModeColors = {
  canvas: '#001a13',
  card: '#00271d',
  subtle: '#003c2d',
  border: 'rgba(255, 255, 255, 0.12)',
  text: {
    primary: '#F7F5EC',
    secondary: 'rgba(247, 245, 236, 0.82)',
    muted: 'rgba(247, 245, 236, 0.58)',
    inverse: '#003c2d',
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
