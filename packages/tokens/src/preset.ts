import { colors } from './colors';
import { fontFamilies } from './typography';
import { radii } from './radii';
import { shadows } from './shadows';
import { zIndex } from './zIndex';
import { durations, easings } from './motion';
import { breakpoints } from './breakpoints';
import { opacity } from './opacity';

/**
 * Basepoint Tailwind CSS Preset (Compatible with Tailwind v3 and v4)
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('@basepoint-lab/tokens/preset')],
 *     ...
 *   }
 */
export const basepointPreset = {
  theme: {
    screens: {
      ...breakpoints,
    },
    extend: {
      colors: {
        pine: {
          DEFAULT: colors.brand.pine.DEFAULT,
          deep: colors.brand.pine.deep,
          dark: colors.brand.pine.dark,
          light: colors.brand.pine.light,
          surface: colors.brand.pine.surface,
          border: colors.brand.pine.border,
        },
        lime: {
          DEFAULT: colors.brand.lime.DEFAULT,
          hover: colors.brand.lime.hover,
          light: colors.brand.lime.light,
          dark: colors.brand.lime.dark,
          surface: colors.brand.lime.surface,
        },
        spring: {
          DEFAULT: colors.brand.spring.DEFAULT,
          light: colors.brand.spring.light,
          dark: colors.brand.spring.dark,
        },
        canvas: colors.surface.canvas,
        card: colors.surface.card,
        subtle: colors.surface.subtle,
        muted: colors.text.muted,
        darkCanvas: colors.dark.canvas,
        darkCard: colors.dark.card,
      },
      fontFamily: {
        spartan: ['"League Spartan"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['"League Spartan"', 'sans-serif'],
      },
      borderRadius: {
        ...radii,
      },
      boxShadow: {
        ...shadows,
      },
      zIndex: {
        dropdown: String(zIndex.dropdown),
        sticky: String(zIndex.sticky),
        header: String(zIndex.header),
        banner: String(zIndex.banner),
        overlay: String(zIndex.overlay),
        modal: String(zIndex.modal),
        popover: String(zIndex.popover),
        toast: String(zIndex.toast),
        tooltip: String(zIndex.tooltip),
      },
      transitionDuration: {
        instant: durations.instant,
        fast: durations.fast,
        normal: durations.normal,
        slow: durations.slow,
        slower: durations.slower,
        deliberate: durations.deliberate,
      },
      transitionTimingFunction: {
        default: easings.default,
        'ease-out': easings.easeOut,
        'ease-in': easings.easeIn,
        spring: easings.spring,
        smooth: easings.smooth,
      },
      opacity: {
        ...opacity,
      },
    },
  },
};

export const preset = basepointPreset;
export default basepointPreset;
