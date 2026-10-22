/**
 * Basepoint Z-Index Scale Tokens
 * Consistent stacking layers preventing z-index collision wars.
 */

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  header: 1200,
  banner: 1250,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
  max: 9999,
} as const;

export type ZIndex = typeof zIndex;
