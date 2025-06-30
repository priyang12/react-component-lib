import { themes } from 'storybook/internal/theming';
import '../src/lib/styles/Global.scss';
import '../src/lib/styles/tailwind.css';
import type { Preview } from '@storybook/react-vite';
import CustomDocsPage from '../src/CustomDocsPage';

const isDarkMode =
   typeof window !== 'undefined' &&
   window.matchMedia &&
   window.matchMedia('(prefers-color-scheme: dark)').matches;

const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
   darkMode: {},
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
      },
   },
   docs: {
      theme: isDarkMode ? themes.dark : themes.light,
      // code block are not rendering correctly from jsdoc comments
      // page: CustomDocsPage,
   },
};

const preview: Preview = {
   parameters: parameters,
   tags: ['autodocs'],
};

export default preview;
