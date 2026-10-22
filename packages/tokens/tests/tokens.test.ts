import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  brandColors,
  surfaceColors,
  darkModeColors,
  typography,
  basepointPreset,
  motion,
  zIndex,
  breakpoints,
  opacity,
  states,
  tokens,
} from "../dist/index.js";

test("@basepoint-lab/tokens - Brand colors match canonical Basepoint spec", () => {
  assert.equal(brandColors.pine.DEFAULT, "#003c2d");
  assert.equal(brandColors.lime.DEFAULT, "#BCF63C");
  assert.equal(brandColors.spring.DEFAULT, "#A3FB60");
  assert.equal(surfaceColors.canvas, "#F7F5EC");
  assert.equal(surfaceColors.card, "#FFFFFF");
  assert.equal(darkModeColors.canvas, "#001a13");
  assert.equal(darkModeColors.card, "#00271d");
});

test("@basepoint-lab/tokens - Typography fonts and scales", () => {
  assert.ok(typography.fontFamilies.sans.includes("League Spartan"));
  assert.ok(typography.fontFamilies.mono.includes("IBM Plex Mono"));
  assert.ok(typography.fontSizes["5xl"]);
});

test("@basepoint-lab/tokens - System tokens: motion, zIndex, breakpoints, opacity, states", () => {
  assert.equal(motion.durations.fast, "150ms");
  assert.equal(motion.durations.normal, "250ms");
  assert.ok(motion.easings.spring);
  assert.equal(zIndex.modal, 1400);
  assert.equal(zIndex.dropdown, 1000);
  assert.equal(breakpoints.sm, "640px");
  assert.equal(breakpoints.md, "768px");
  assert.equal(opacity.disabled, "0.45");
  assert.ok(states.focusRing.pine.includes("#003c2d"));
  assert.ok(tokens.colors && tokens.motion && tokens.zIndex);
});

test("@basepoint-lab/tokens - Tailwind preset configuration", () => {
  assert.ok(basepointPreset.theme);
  assert.ok(basepointPreset.theme.extend);
  assert.equal(basepointPreset.theme.extend.colors.pine.DEFAULT, "#003c2d");
  assert.equal(basepointPreset.theme.extend.colors.lime.DEFAULT, "#BCF63C");
  assert.equal(basepointPreset.theme.extend.colors.canvas, "#F7F5EC");
  assert.equal(basepointPreset.theme.extend.transitionDuration.fast, "150ms");
  assert.equal(basepointPreset.theme.extend.zIndex.modal, "1400");
});

test("@basepoint-lab/tokens - CSS files exist in dist and declare variables", () => {
  const cssPath = path.resolve(import.meta.dirname, "../dist/tokens.css");
  assert.ok(fs.existsSync(cssPath), "tokens.css must exist in dist");
  const cssContent = fs.readFileSync(cssPath, "utf-8");
  assert.ok(cssContent.includes("--brand-pine: #003c2d;"));
  assert.ok(cssContent.includes("--brand-lime: #BCF63C;"));
  assert.ok(cssContent.includes("--bg-canvas: #F7F5EC;"));
  assert.ok(cssContent.includes("--z-modal: 1400;"));
  assert.ok(cssContent.includes(".dark"));
  assert.ok(cssContent.includes(".bg-grid-pine"));

  const themePath = path.resolve(import.meta.dirname, "../dist/theme.css");
  assert.ok(fs.existsSync(themePath), "theme.css must exist in dist");
  const themeContent = fs.readFileSync(themePath, "utf-8");
  assert.ok(themeContent.includes("--color-pine: #003c2d;"));
  assert.ok(themeContent.includes("--color-lime: #BCF63C;"));
  assert.ok(themeContent.includes("--shadow-glow-lime"));
});
