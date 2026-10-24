# `@basepoint-lab/tokens`

> Canonical design tokens, color scales, typography definitions, CSS variables, and Tailwind theme presets for the **Basepoint** ecosystem.

[![Registry](https://img.shields.io/badge/registry-GitHub%20Packages-blue.svg)](https://npm.pkg.github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-green.svg)](https://www.typescriptlang.org/)

---

## 📦 Installation

Ensure your project has an `.npmrc` file configured for the `@basepoint-lab` scope:

```ini
# .npmrc
@basepoint-lab:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install via npm, yarn, or pnpm:

```bash
npm install @basepoint-lab/tokens
```

---

## 🚀 Usage

### 1. TypeScript / JavaScript Tokens

Import typed design constants directly into your application code:

```typescript
import { colors, typography, tokens } from '@basepoint-lab/tokens';

console.log(colors.brand.pine.DEFAULT); // '#003922'
console.log(colors.brand.lime.DEFAULT); // '#a7ff6d'
console.log(typography.fontFamilies.sans); // 'League Spartan', ...
```

### 2. CSS Variables

Import the pre-packaged stylesheet into your global CSS (`globals.css` / `main.css`):

```css
@import "@basepoint-lab/tokens/tokens.css";

body {
  background-color: var(--bg-canvas);
  color: var(--brand-pine);
  font-family: var(--font-spartan);
}
```

### 3. Tailwind CSS v4

Import the Tailwind v4 `@theme` configuration:

```css
@import "tailwindcss";
@import "@basepoint-lab/tokens/theme.css";
```

### 4. Tailwind CSS v3 Preset

Add the preset to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@basepoint-lab/tokens/preset')
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
};
```

---

## 🎨 Color Palette Reference

| Token Name | Hex | Preview / Role |
| :--- | :--- | :--- |
| `brand.pine.DEFAULT` | `#003922` | Primary deep pine green |
| `brand.pine.deep` | `#002516` | Ultra-deep container contrast |
| `brand.lime.DEFAULT` | `#a7ff6d` | Vibrant citron accent |
| `brand.spring.DEFAULT` | `#8ef74e` | Fresh spring accent |
| `surface.canvas` | `#f6ffe8` | Warm tactile cream light canvas |
| `surface.card` | `#FFFFFF` | Clean white card surface |
| `surface.subtle` | `#DDE3D9` | Warm subtle dividing border |
| `text.muted` | `#5e665d` | Secondary muted body text |

---

## 📄 License

MIT © Basepoint Engineering
