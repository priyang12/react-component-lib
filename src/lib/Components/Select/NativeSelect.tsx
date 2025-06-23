import React from 'react';
import { optionType } from '../../../Hooks';

interface NativeSelect extends React.ComponentPropsWithoutRef<'select'> {
   currentValue: string;
   options: optionType[];
}

const NativeSelect = ({ currentValue, options, ...props }: NativeSelect) => {
   return (
      <select
         defaultValue={currentValue}
         aria-hidden="false"
         tabIndex={-1}
         className="visually-hidden"
         {...props}
      >
         {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
               {opt.label}
            </option>
         ))}
      </select>
   );
};

export default NativeSelect;
