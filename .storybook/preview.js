import '../src/lib/styles/Global.scss';
import { themes } from '@storybook/theming';

export const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   darkMode: {
      classTarget: 'html',
      // Override the default dark theme
      dark: { ...themes.dark, appBg: '#333', '--input-border': 'red' },
      // Override the default light theme
      light: { ...themes.normal, appBg: '#fff' },
   },
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
};
