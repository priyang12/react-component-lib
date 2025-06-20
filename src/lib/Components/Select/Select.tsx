import * as React from 'react';
import { optionType, useSelect } from '../../../Hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle';
import './Select.scss';
import NativeSelect from './NativeSelect';

export interface SelectProps {
   initialValue: string;
   name: string;
   options: optionType[];
   renderLabel: (searching: boolean, selectedValue: string) => React.ReactNode;
}

function Select({
   initialValue = 'Select from optionals',
   options,
   name,
   renderLabel = () => <label htmlFor={name}>{name}</label>,
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
            {renderLabel(searching, value)}
            <NativeSelect
               currentValue={value}
               options={filteredOptions}
               data-value={value}
               {...props}
            />
            {/* <div className="select">
               <input
                  id={`${name}-input`}
                  // name={name}
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
                        key={option.value}
                        value={option.value}
                        className="OptionItem"
                        onClick={() => {
                           SelectValue(option.value);
                           toggle();
                        }}
                     >
                        {option.label}
                     </li>
                  ))}
               </ul>
            ) : null} */}
         </div>
      </>
   );
}

export default Select;
