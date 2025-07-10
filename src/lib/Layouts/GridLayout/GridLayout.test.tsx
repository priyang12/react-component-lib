import { render } from '@testing-library/react';
import GridLayout from './GridLayout';

it('renders children correctly', () => {
   const { getByText } = render(<GridLayout>Test Content</GridLayout>);
   expect(getByText('Test Content')).toBeInTheDocument();
});
