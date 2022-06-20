import React from 'react';
import ButtonDes from './index.jsx';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
   const div = document.createElement('div');
   render(<ButtonDes />, div);
});
