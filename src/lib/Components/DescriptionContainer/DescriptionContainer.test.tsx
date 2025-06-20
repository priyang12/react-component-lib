import DescriptionContainer from './DescriptionContainer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
   render(
      <DescriptionContainer
         renderDescription={() => (
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
         )}
         children={undefined}
      />
   );
});
