import ButtonDes from './ButtonDes';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
   render(<ButtonDes children={undefined} />);
});
