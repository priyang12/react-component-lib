import React from 'react';
import YTCard from './index';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('YTCard', () => {
   it('should render without crashing', () => {
      render(<YTCard />);
   });
});
