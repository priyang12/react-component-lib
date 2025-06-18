import * as React from 'react';
import { useSelect } from '../../../Hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle';
import './Select.scss';

function Select({
   options,
   ...props
}: React.ComponentPropsWithoutRef<'select'> & { options: string[] }) {
   const [isOpen, toggle, setToggle] = useToggle(false);

   const {
      value,
      searching,
      searchTerm,
      SelectValue,
      onSearchChange,
      options: filteredOptions,
   } = useSelect({
      initialValue: options[0],
      options: options,
   });

   return (
      <>
         <div>
            <select
               value={value}
               style={{
                  display: 'none',
               }}
               {...props}
            />
            <div className="Select" data-value={value}>
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
            </div>
            {isOpen ? (
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
            ) : null}
         </div>
      </>
   );
}

export default Select;
