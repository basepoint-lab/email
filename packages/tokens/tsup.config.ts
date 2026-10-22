import { defineConfig } from 'tsup';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default defineConfig({
  entry: ['src/index.ts', 'src/preset.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  onSuccess: async () => {
    // Copy CSS files to dist directory
    const distDir = path.resolve(process.cwd(), 'dist');
    const srcDir = path.resolve(process.cwd(), 'src');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    const cssFiles = ['tokens.css', 'theme.css'];
    for (const file of cssFiles) {
      const srcPath = path.join(srcDir, file);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(distDir, file));
      }
    }
  },
});
