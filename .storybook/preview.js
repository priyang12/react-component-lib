import '../src/lib/styles/main.css';
import '../src/lib/styles/Global.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faEye } from '@fortawesome/free-regular-svg-icons';

library.add(faClock, faEye);

export const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
};
