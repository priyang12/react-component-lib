import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import glob from 'fast-glob';

const componentEntries = glob.sync(
   [
      'src/lib/Components/**/index.@(ts|tsx)',
      'src/lib/Wrappers/**/index.@(ts|tsx)',
      'src/lib/Utils/**/*.@(ts|tsx)',
   ],
   {
      absolute: false,
      ignore: ['**/Components/index.ts', '**/Wrappers/index.ts'],
   }
);

const perComponent = {
   entry: componentEntries,
   outDir: 'dist/lib',
   format: ['esm', 'cjs'],
   dts: false,
   clean: true,
   splitting: false,
   sourcemap: false,
   minify: false,
   external: ['react', 'react-dom'],
   esbuildPlugins: [
      sassPlugin({
         async transform(source) {
            const result = await postcss([autoprefixer()]).process(source, {
               from: undefined,
            });
            return result.css;
         },
      }),
   ],
} as any;

const globalCss = {
   entry: ['src/lib/styles/Global.scss'], // Standalone entry
   outDir: 'dist',
   dts: false,
   format: [], // no JS
   esbuildPlugins: [
      sassPlugin({
         async transform(source) {
            const result = await postcss([autoprefixer()]).process(source, {
               from: undefined,
            });
            return result.css;
         },
      }),
   ],
};

export default defineConfig([
   perComponent,

   // All inside main /index.js
   {
      entry: ['src/index.tsx'],
      outDir: 'dist',
      format: ['esm', 'cjs'],
      dts: false, // created separated build.
      splitting: false,
      sourcemap: true,
      minify: true,
      external: ['react', 'react-dom'],
      esbuildPlugins: [
         sassPlugin({
            async transform(source) {
               const result = await postcss([autoprefixer()]).process(source, {
                  from: undefined,
               });
               return result.css;
            },
         }),
      ],
   },
]);
