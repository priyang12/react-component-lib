module.exports = {
   framework: '@storybook/react',
   stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
      '@storybook/addon-docs',
      'storybook-dark-mode',
      {
         name: 'storybook-addon-sass-postcss',
         options: {
            postcssLoaderOptions: {
               implementation: require('postcss'),
            },
         },
      },
   ],
   core: {
      builder: '@storybook/builder-vite',
      disableTelemetry: true,
   },
   features: {
      storyStoreV7: true,
   },
   async viteFinal(config, { configType }) {
      return config;
   },
   typescript: {
      check: false, // type-check stories during Storybook build
   },
};
