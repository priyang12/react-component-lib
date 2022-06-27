import React from 'react';
import GradientBG from './GradientBG';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('GradientBG', () => {
   it('should render without crashing', () => {
      const div = document.createElement('div');
      render(<GradientBG />, div);
   });
});
