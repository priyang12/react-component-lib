const path = require('path');
module.exports = {
   typescript: {
      check: false,
      checkOptions: {},
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {
         shouldExtractLiteralValuesFromEnum: true,
         propFilter: (prop) =>
            prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
      },
   },
   stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      '@storybook/addon-essentials',
      '@storybook/preset-create-react-app',
      'storybook-design-token',
      'storybook-dark-mode',
   ],
   webpackFinal: async (config) => {
      config.module.rules.push({
         test: /\.scss$/,
         use: ['style-loader', 'css-loader', 'sass-loader'],
         include: path.resolve(__dirname, '../src/lib/**/*.scss'),
      });

      return config;
   },
};
