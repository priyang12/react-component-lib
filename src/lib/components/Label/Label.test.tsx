import React from 'react';
import Label from './index.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('Label', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        render(<Label />, div);
    });
});
