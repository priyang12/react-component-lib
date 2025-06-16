import '../src/lib/styles/Global.scss';
import '../src/lib/styles/tailwind.css';

export const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   darkMode: {},
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
};
