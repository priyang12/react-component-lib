import React from 'react';
import Ring from './index.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('Ring', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<Ring />, div);
    });
});
