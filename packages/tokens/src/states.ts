/**
 * Basepoint Interactive States Tokens
 * Standard focus rings, active scaling, hover elevations, and disabled treatments.
 */

export const states = {
  focusRing: {
    pine: '0 0 0 2px #F7F5EC, 0 0 0 4px #003c2d',
    lime: '0 0 0 2px #003c2d, 0 0 0 4px #BCF63C',
    spring: '0 0 0 2px #003c2d, 0 0 0 4px #A3FB60',
    error: '0 0 0 2px #F7F5EC, 0 0 0 4px #b91c1c',
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
