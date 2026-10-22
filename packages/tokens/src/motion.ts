/**
 * Basepoint Motion & Transition Tokens
 * Standard easing curves, durations, and transitions across Basepoint applications.
 */

export const durations = {
  instant: '50ms',
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  slower: '600ms',
  deliberate: '800ms',
} as const;

export const easings = {
  // Standard UI transition
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Elements entering the screen
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  // Elements exiting the screen
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // Attention-seeking or bouncy interactions
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  // Smooth deceleration
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const transitions = {
  fast: `150ms cubic-bezier(0, 0, 0.2, 1)`,
  normal: `250ms cubic-bezier(0.4, 0, 0.2, 1)`,
  slow: `400ms cubic-bezier(0.4, 0, 0.2, 1)`,
  spring: `300ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
  color: `color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)`,
  transform: `transform 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  shadow: `box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
} as const;

export const motion = {
  durations,
  easings,
  transitions,
} as const;

export type Durations = typeof durations;
export type Easings = typeof easings;
export type Transitions = typeof transitions;
export type Motion = typeof motion;
