import * as React from 'react';
import { optionType, useSelect } from '../../../Hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle';
import NativeSelect from './NativeSelect';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { callAll } from '../../Utils/AllFunctionsCall';
import './Select.scss';

export type renderLabelProps = {
   searching: boolean;
   selectedValue: string;
};

export type renderOptionsProps = {
   filteredOptions: optionType[];
   selectValue: (value: string) => void;
   toggle: () => void;
};
export interface SelectProps {
   initialValue: string;
   name: string;
   inputSize: InputProps['InputSize'];
   options: optionType[];
   renderLabel: ({
      searching,
      selectedValue,
   }: renderLabelProps) => React.ReactNode;
   renderOptions: ({
      filteredOptions,
      selectValue,
      toggle,
   }: renderOptionsProps) => React.ReactNode;
}

function Select({
   initialValue = 'Select from optionals',
   name,
   options,
   inputSize,
   renderOptions,
   renderLabel = () => <label htmlFor={name}>{name}</label>,
   ...props
}: React.ComponentPropsWithoutRef<'select'> & SelectProps) {
   const [isOpen, toggle, setToggle] = useToggle(false);

   const {
      value,

      searching,
      searchTerm,
      selectValue,
      onSearchChange,
      options: filteredOptions,
   } = useSelect({
      initialValue: initialValue,
      options: options,
   });

   return (
      <>
         <div className="select-container">
            {renderLabel({ searching, selectedValue: value })}
            {/* memo this later and pass value using ref */}
            <NativeSelect
               currentValue={value}
               options={filteredOptions}
               data-value={value}
               {...props}
            />
            <div className="select-input">
               <Input
                  id={`${name}-input`}
                  name={name}
                  value={searchTerm}
                  data-value={value}
                  aria-expanded={isOpen}
                  onChange={callAll(onSearchChange, props.onChange)}
                  onClick={() => setToggle(true)}
                  InputSize={inputSize}
               />
               {isOpen
                  ? renderOptions({
                       filteredOptions,
                       selectValue,
                       toggle,
                    })
                  : null}
            </div>
         </div>
      </>
   );
}

export default Select;
