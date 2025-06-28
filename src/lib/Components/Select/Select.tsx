import * as React from 'react';
import { optionType, useSelect } from './hooks/useSelect';
import { useToggle } from '../../../Hooks/useToggle/useToggle';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { callAll } from '../../Utils/AllFunctionsCall';
import NativeSelect from './NativeSelect';
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

/**
 * Props for the Select component.
 *
 * A custom select input with search support, keyboard navigation, and full accessibility bindings.
 *
 * @property initialValue - The initially selected option value.
 * @property name - The input's `name` attribute for form submission.
 * @property inputSize - Size of the input. Inherits from the `Input` component (`'small'`, `'medium'`, `'large'`).
 * @property options - Array of selectable options. Each option must follow the `optionType` structure (`{ label: string, value: string }`).
 * @property renderLabel - A custom function to render the label. Receives the current search and value state.
 * @property renderOptions - A custom function to render the dropdown option list.
 */
export interface SelectProps {
   /** Default selected value. */
   initialValue: string;
   /** Name attribute for form submission. */
   name: string;
   /** Size of the search input. Matches `Input` sizing. */
   inputSize: InputProps['InputSize'];
   /** List of selectable options. */
   options: optionType[];
   /** Custom label renderer. Provides `searching` and `selectedValue` states. */
   renderLabel: ({
      searching,
      selectedValue,
   }: renderLabelProps) => React.ReactNode;
   /** Custom option renderer. Provides selection handlers and state. */
   renderOptions: ({
      focusedIndex,
      filteredOptions,
      selectedOption,
      selectValue,
      toggle,
      setFocusedIndex,
   }: renderOptionsProps) => React.ReactNode;
}

/**
 * Custom `Select` component with search, keyboard navigation, and full accessibility support.
 *
 * Built with `Input` and `NativeSelect` for form compatibility. Supports custom renderers for label and options.
 * Integrates `useSelect` and `useToggle` hooks to handle interaction logic and filtering.
 *
 * @returns A styled accessible select input with dynamic options and interactive label.
 *
 * @example
 * ```tsx
 * <Select
 *   name="language"
 *   inputSize="medium"
 *   initialValue="js"
 *   options={[{ label: 'JavaScript', value: 'js' }, { label: 'Python', value: 'py' }]}
 *   renderLabel={({ selectedValue }) => <Label>{selectedValue}</Label>}
 *   renderOptions={({ filteredOptions, selectValue }) => (
 *     <ul>
 *       {filteredOptions.map((opt) => (
 *         <li key={opt.value} onClick={() => selectValue(opt.value)}>{opt.label}</li>
 *       ))}
 *     </ul>
 *   )}
 * />
 * ```
 */
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
