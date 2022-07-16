import Search from './index.jsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('Search', () => {
   it('should render without crashing', () => {
      render(<Search />);
   });
});
