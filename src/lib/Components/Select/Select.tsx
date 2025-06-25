import * as React from 'react';
import { optionType, useSelect } from './hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle/useToggle';
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
   focusedIndex: number;
   filteredOptions: optionType[];
   selectedOption: optionType | undefined;
   selectValue: (value: string) => void;
   toggle: () => void;
   setFocusedIndex: (value: number) => void;
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
   const wrapperRef = React.useRef<HTMLDivElement>(null);
   const {
      value: isOpen,
      toggleValue: toggle,
      setToggleValue: setToggle,
   } = useToggle(false);

   const {
      value,
      searching,
      searchTerm,
      selectedOption,
      focusedIndex,
      selectValue,
      onSearchChange,
      onKeyDown,
      setFocusedIndex,
      options: filteredOptions,
   } = useSelect({
      initialValue: initialValue,
      options: options,
   });

   const selectInputRef = React.useRef<HTMLDivElement>(null);

   React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target as Node)
         ) {
            setToggle(false);
         }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setToggle]);

   React.useEffect(() => {
      const node = selectInputRef.current;
      if (!node) return;
      node.addEventListener('keydown', onKeyDown);
      return () => {
         node.removeEventListener('keydown', onKeyDown);
      };
   }, []);

   return (
      <>
         <div className="select-container" ref={wrapperRef}>
            {renderLabel({ searching, selectedValue: value })}
            {/* memo this later and pass value using ref */}
            <NativeSelect
               currentValue={value}
               options={filteredOptions}
               data-value={value}
               {...props}
            />
            <div className="select-input" ref={selectInputRef}>
               <Input
                  id={`${name}-input`}
                  name={name}
                  value={searching ? searchTerm : selectedOption?.label}
                  data-value={value}
                  aria-expanded={isOpen}
                  onChange={callAll(onSearchChange, props.onChange)}
                  onClick={() => setToggle(true)}
                  InputSize={inputSize}
                  aria-haspopup="listbox"
                  aria-controls="custom-select-listbox"
                  aria-activedescendant={
                     focusedIndex >= 0
                        ? `custom-option-${filteredOptions[focusedIndex]?.value}`
                        : undefined
                  }
               />
               {isOpen
                  ? renderOptions({
                       focusedIndex,
                       setFocusedIndex,
                       filteredOptions,
                       selectedOption,
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
