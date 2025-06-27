import '../src/lib/styles/Global.scss';
import '../src/lib/styles/tailwind.css';
import type { Preview } from '@storybook/react-vite';

const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   darkMode: {},
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
};

const preview: Preview = {
   parameters: parameters,
   tags: ['autodocs'],
};

export default preview;
