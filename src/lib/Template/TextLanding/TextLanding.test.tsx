import React from 'react';
import TextLanding from './index.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('TextLanding', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<TextLanding />, div);
    });
});
