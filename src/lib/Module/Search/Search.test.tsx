import React from 'react';
import Search from './index.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('Search', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<Search />, div);
    });
});
