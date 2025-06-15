import { StorybookConfig } from '@storybook/react-vite';
import postcss from 'postcss';

const config = {
   framework: {
      name: '@storybook/react-vite',
      options: {},
   },
   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      '@storybook/addon-docs',

      {
         name: 'storybook-addon-sass-postcss',
         options: {
            postcssLoaderOptions: {
               implementation: postcss,
            },
         },
      },
   ],
   features: {},
   typescript: {
      check: false,
   },
   async viteFinal(config, { configType }) {
      // customize if needed
      return config;
   },
};

export default config;
