module.exports = {
   stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
      'storybook-dark-mode',
      {
         name: 'storybook-addon-sass-postcss',
         options: {
            loadSassAfterPostCSS: true,
         },
      },
   ],
   typescript: {
      check: true, // type-check stories during Storybook build
   },
};
