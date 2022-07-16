const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
   rollup(config, options) {
      config.plugins.push(
         postcss({
            plugins: [autoprefixer()],
            inject: false,
            modules: false,
            extract: !!options.writeMeta,
         })
      );
      return config;
   },
};
