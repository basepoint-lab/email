/**
 * Basepoint Interactive States Tokens
 * Standard focus rings, active scaling, hover elevations, and disabled treatments.
 */

export const states = {
  focusRing: {
    pine: '0 0 0 2px #f6ffe8, 0 0 0 4px #003922',
    lime: '0 0 0 2px #003922, 0 0 0 4px #a7ff6d',
    spring: '0 0 0 2px #003922, 0 0 0 4px #8ef74e',
    error: '0 0 0 2px #f6ffe8, 0 0 0 4px #b91c1c',
  },
  hover: {
    brightness: 'brightness(1.06)',
    dim: 'opacity(0.85)',
    elevation: 'translateY(-2px)',
    elevationSm: 'translateY(-1px)',
  },
  active: {
    scale: 'scale(0.98)',
    scaleSm: 'scale(0.99)',
  },
  disabled: {
    opacity: '0.45',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
} as const;

export type States = typeof states;
