import React from 'react';
import TextEffect from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TextEffect', () => {
   it('should render without crashing', () => {
      const div = document.createElement('div');
      render(<TextEffect />, div);
   });
});
