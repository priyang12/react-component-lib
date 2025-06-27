import { StorybookConfig } from '@storybook/react-vite';
import postcss from 'postcss';

const config: StorybookConfig = {
   framework: {
      name: '@storybook/react-vite',
      options: {},
   },
   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      '@storybook/addon-docs',
   ],
   features: {},
   typescript: {
      check: false,
      reactDocgen: 'react-docgen',
   },
   async viteFinal(config, { configType }) {
      // customize if needed
      return config;
   },
};

export default config;
