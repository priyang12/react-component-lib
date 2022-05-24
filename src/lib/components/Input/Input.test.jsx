import React from 'react';
import Input from './index.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('Input', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<Input />, div);
    });
});
