import '../src/lib/styles/Global.scss';
import { themes } from '@storybook/theming';
import { setConsoleOptions } from '@storybook/addon-console';
import { addons } from '@storybook/addons';

setConsoleOptions({
   panelExclude: [],
});
addons.setConfig({
   enableShortcuts: false,
});

export const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   darkMode: {
      classTarget: 'html',
      // Override the default dark theme
      dark: { ...themes.dark },
      // Override the default light theme
      light: { ...themes.normal },
   },
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
};
