/**
 * Basepoint Typography System
 * Font families, font sizes, line heights, font weights, and letter spacings.
 */

export const fontFamilies = {
  sans: "'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  display: "'League Spartan', sans-serif",
} as const;

export const fontSizes = {
  'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],       // 12px
  'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],   // 14px
  'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],           // 16px
  'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  // 18px
  'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],  // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],      // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],          // 48px
  '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],     // 60px
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const letterSpacings = {
  tighter: '-0.04em',
  tight: '-0.02em',
  normal: '0em',
  wide: '0.04em',
  wider: '0.08em',
  widest: '0.12em',
} as const;

export const typography = {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
} as const;

export type Typography = typeof typography;
