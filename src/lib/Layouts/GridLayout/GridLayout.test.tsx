import { render } from '@testing-library/react';
import GridLayout from './GridLayout';

describe('GridLayout', () => {
   it('renders without crashing', () => {
      const { container } = render(<GridLayout>Test</GridLayout>);
      expect(container.firstChild).toBeInTheDocument();
   });

   it('renders children correctly', () => {
      const { getByText } = render(
         <GridLayout>
            <div>Child 1</div>
            <div>Child 2</div>
         </GridLayout>
      );
      expect(getByText('Child 1')).toBeInTheDocument();
      expect(getByText('Child 2')).toBeInTheDocument();
   });

   it('applies default gridNumber (16)', () => {
      const { container } = render(<GridLayout />);
      const style = getComputedStyle(container.firstChild as HTMLElement);
      expect(style.getPropertyValue('--grid-layout-number')).toBe('16');
   });

   it('applies custom gridNumber', () => {
      const { container } = render(<GridLayout gridNumber={12} />);
      const style = getComputedStyle(container.firstChild as HTMLElement);
      expect(style.getPropertyValue('--grid-layout-number')).toBe('12');
   });

   it('applies custom gap value', () => {
      const { container } = render(<GridLayout gap="2rem" />);
      const style = getComputedStyle(container.firstChild as HTMLElement);
      expect(style.getPropertyValue('--grid-gap')).toBe('2rem');
   });

   it('applies grid-template-areas when provided', () => {
      const template = ['"header header"', '"sidebar main"'];
      const { container } = render(<GridLayout templateAreas={template} />);
      const style = getComputedStyle(container.firstChild as HTMLElement);
      expect(style.getPropertyValue('--grid-template-areas')).toContain(
         'header header'
      );
      expect(style.getPropertyValue('--grid-template-areas')).toContain(
         'sidebar main'
      );
   });

   it('renders a custom component when `as` prop is passed', () => {
      const { container } = render(<GridLayout as="section" />);
      expect(container.querySelector('section')).toBeInTheDocument();
   });

   it('merges additional style props with internal styles', () => {
      const { container } = render(
         <GridLayout style={{ backgroundColor: 'red' }} />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe('red');
      expect(element.style.getPropertyValue('--grid-layout-number')).toBe('16');
   });

   it('accepts and applies custom className', () => {
      const { container } = render(<GridLayout className="my-grid" />);
      expect(container.firstChild).toHaveClass('my-grid');
   });
});
