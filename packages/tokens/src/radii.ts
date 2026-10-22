/**
 * Basepoint Border Radius System
 */

export const radii = {
  none: '0px',
  sm: '0.25rem',   // 4px - badge stamps, mini buttons
  md: '0.375rem',  // 6px - inputs, card corners
  lg: '0.5rem',    // 8px - containers, cards
  xl: '0.75rem',   // 12px - surfaces, modal dialogs
  '2xl': '1rem',   // 16px - feature panels
  full: '9999px',  // rounded pills, status tags
} as const;

export type Radii = typeof radii;
