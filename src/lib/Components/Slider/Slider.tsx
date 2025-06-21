import { clsx } from 'clsx';
import './Slider.scss';

export type SliderProps = {
   className?: string;
   value: number;
   min?: number;
   max?: number;
   step?: number;
   onChange?: (value: number) => void;
   variant?: 'success' | 'failure' | 'info' | 'warning';
};

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
            onChange={handleChange}
            className={clsx('Slider', variant && `Slider--${variant}`)}
            style={trackStyle}
            {...props}
         />
         <div className="SliderValue">{value}</div>
      </div>
   );
}

export default Slider;
