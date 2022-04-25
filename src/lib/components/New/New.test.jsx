import React from 'react';
import New from './New';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('New', () => {
   it('should render without crashing', () => {
      const div = document.createElement('div');
      render(<New />, div);
   });
});
