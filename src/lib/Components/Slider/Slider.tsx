import { clsx } from 'clsx';
import { useFormContext } from '../FormControl';
import './Slider.scss';
import { callAll } from '../../Utils/AllFunctionsCall';

/**
 * Props for the Slider component.
 *
 * Extends standard HTML input props (excluding the native `onChange`),
 * allowing additional attributes like `id`, `name`, `aria-*`, etc.
 *
 * @property value - The current numeric value of the slider.
 * @property min - The minimum selectable value (default is `0`).
 * @property max - The maximum selectable value (default is `100`).
 * @property step - The interval between selectable values (default is `1`).
 * @property onChange - Callback function that receives the new numeric value when the slider changes.
 * @property variant - Visual style variant for the slider. Options are `'success'`, `'failure'`, `'info'`, or `'warning'`.
 * @property className - Additional class name(s) to apply to the slider container.
 */
export interface SliderProps
   extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
   className?: string;
   value: number;
   min?: number;
   max?: number;
   step?: number;
   onChange?: (value: number) => void;
   variant?: 'success' | 'failure' | 'info' | 'warning';
}

/**
 * `Slider` is a stylized input range component that integrates with form context.
 *
 * It supports visual variants, disables automatically via `FormControl`,
 * and uses a numeric `onChange` for easier value handling.
 */
function Slider({
   className,
   value,
   min = 0,
   max = 100,
   step = 1,
   onChange,
   variant,
   ...props
}: SliderProps) {
   const { isAlert, disabled, inputChange, onFocus } = useFormContext();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      onChange?.(val);
   };

   const trackStyle = {
      backgroundSize: `${((value - min) / (max - min)) * 100}% 100%`,
   };

   return (
      <div className={clsx('SliderContainer', className)}>
         <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={callAll(inputChange, handleChange)}
            className={clsx('Slider', variant && `Slider--${variant}`, {
               'Slider--disabled': disabled,
               'Slider--error': isAlert,
            })}
            style={trackStyle}
            disabled={disabled}
            {...props}
         />
      </div>
   );
}

export default Slider;
