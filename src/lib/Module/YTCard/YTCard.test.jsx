import React from 'react';
import YTCard from './YTCard';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('YTCard', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<YTCard />, div);
    });
});
