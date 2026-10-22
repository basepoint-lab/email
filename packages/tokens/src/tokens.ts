import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';
import { motion } from './motion';
import { zIndex } from './zIndex';
import { breakpoints, mediaQueries } from './breakpoints';
import { opacity } from './opacity';
import { states } from './states';

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  motion,
  zIndex,
  breakpoints,
  mediaQueries,
  opacity,
  states,
} as const;

export type DesignTokens = typeof tokens;
export default tokens;
