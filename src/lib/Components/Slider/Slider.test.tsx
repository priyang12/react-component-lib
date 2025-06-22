import { fireEvent, render } from '@testing-library/react';
import Slider from './Slider';

it('renders without crashing', () => {
   render(<Slider value={0} />);
});

it('uses default min, max, and step values', () => {
   const { getByRole } = render(<Slider value={50} />);
   const input = getByRole('slider') as HTMLInputElement;

   expect(input.min).toBe('0');
   expect(input.max).toBe('100');
   expect(input.step).toBe('1');
});

it('applies custom min, max, and step values', () => {
   const { getByRole } = render(
      <Slider value={30} min={10} max={90} step={5} />
   );
   const input = getByRole('slider') as HTMLInputElement;

   expect(input.min).toBe('10');
   expect(input.max).toBe('90');
   expect(input.step).toBe('5');
});

it('calls onChange with the correct number', () => {
   const handleChange = vi.fn();
   const { getByRole } = render(<Slider value={25} onChange={handleChange} />);
   const input = getByRole('slider');

   fireEvent.change(input, { target: { value: '45' } });

   expect(handleChange).toHaveBeenCalledWith(45);
});

it('is disabled when FormControl context says so', () => {
   vi.mock('../FormControl', () => ({
      useFormContext: () => ({ isAlert: false, disabled: true }),
   }));

   const { getByRole } = render(<Slider value={30} />);
   const input = getByRole('slider') as HTMLInputElement;

   expect(input).toBeDisabled();
});
