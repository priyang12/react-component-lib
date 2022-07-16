import Search from './index';
import { render } from '@testing-library/react';

describe('Search', () => {
   it('should render without crashing', () => {
      render(<Search />);
   });
});
