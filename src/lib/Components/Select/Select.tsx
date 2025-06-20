import * as React from 'react';
import { optionType, useSelect } from '../../../Hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle';
import './Select.scss';
import NativeSelect from './NativeSelect';

export interface SelectProps {
   initialValue: string;
   options: optionType[];
}

function Select({
   initialValue = 'Select from optionals',
   options,
   ...props
}: React.ComponentPropsWithoutRef<'select'> & SelectProps) {
   const [isOpen, toggle, setToggle] = useToggle(false);

   const {
      value,
      searching,
      searchTerm,
      SelectValue,
      onSearchChange,
      options: filteredOptions,
   } = useSelect({
      initialValue: initialValue,
      options: options,
   });

   return (
      <>
         <div className="select-container">
            <NativeSelect
               currentValue={value}
               options={filteredOptions}
               {...props}
            />
            {/* <div className="select" data-value={value}>
               {searching ? null : (
                  <label className="DisplayValue" htmlFor="DisplayValue">
                     {value}
                  </label>
               )}
               <input
                  id="DisplayValue"
                  name="DisplayValue"
                  value={searchTerm}
                  data-value={value}
                  aria-expanded={isOpen}
                  role="combobox"
                  onChange={onSearchChange}
                  onClick={() => setToggle(true)}
               />
            </div> */}
            {/* {isOpen ? (
               <ul className="Options" onBlur={() => toggle()}>
                  {filteredOptions.map((option) => (
                     <li
                        tabIndex={-1}
                        key={option}
                        value={option}
                        className="OptionItem"
                        onClick={() => {
                           SelectValue(option);
                           toggle();
                        }}
                     >
                        {option}
                     </li>
                  ))}
               </ul>
            ) : null} */}
         </div>
      </>
   );
}

export default Select;
