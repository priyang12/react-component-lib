import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
   entry: ['src/index.tsx'],
   esbuildPlugins: [
      sassPlugin({
         async transform(source, resolveDir) {
            const { css } = await postcss([tailwind(), autoprefixer]).process(
               source
            );
            return css;
         },
      }),
   ],
   tsconfig: './tsconfig.json',
   treeshake: true,
   minify: true,
   clean: true,
   metafile: true,
   dts: false,
   splitting: false,
   format: ['cjs', 'esm'],
   external: ['react', 'react-dom'],
});
