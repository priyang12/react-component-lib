import '../src/lib/styles/Global.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faEye } from '@fortawesome/free-regular-svg-icons';
import { themes } from '@storybook/theming';

library.add(faClock, faEye);

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
