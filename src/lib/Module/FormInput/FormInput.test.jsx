import React from 'react';
import FormInput from './index.jsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('FormInput', () => {
   it('should render without crashing', () => {
      const div = document.createElement('div');
      render(<FormInput />, div);
   });
});
