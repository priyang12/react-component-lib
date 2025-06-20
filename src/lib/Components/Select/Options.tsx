import * as React from 'react';
import { optionType } from '../../../Hooks';

export interface OptionsProps extends React.ComponentPropsWithoutRef<'option'> {
   filteredOptions: optionType[];
   toggle: () => void;
   selectValue: (value: string) => void;
}

const Options = ({ filteredOptions, toggle, selectValue }: OptionsProps) => {
   return (
      <ul className="options" onBlur={() => toggle()}>
         {filteredOptions.map((option) => (
            <li
               tabIndex={-1}
               key={option.value}
               value={option.value}
               className="optionItem"
               onClick={() => {
                  selectValue(option.value);
                  // toggle();
               }}
            >
               {option.label}
            </li>
         ))}
      </ul>
   );
};

export default Options;
