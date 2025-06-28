import * as React from 'react';
import clsx from 'clsx';
import { callAll } from '../../Utils/AllFunctionsCall';
import { useFormContext } from '../FormControl';
import { useRadioContext } from '../RadioGroup/RadioGroup';
import './RadioInput.scss';

/**
 * Props for the RadioInput component.
 *
 * Extends standard HTML input attributes for a radio element.
 *
 * @property id - A unique identifier for the radio input. Defaults to `radio-${value}` if not provided.
 * @property renderLabel - A render function that let you render a component with inverted prop control.
 */
export interface RadioInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   /** A unique identifier for the radio input. Defaults to `radio-${value}` if not provided. */
   id: string;
   /** A render prop pattern that let you render a component with inverted prop control. */
   renderLabel?: () => React.ReactNode;
}

/**
 * Accessible and customizable radio input component.
 *
 * Renders a single radio input with a custom label.
 * Integrates with form context for handling alerts, focus, and change events.
 * Integrates with RadioGroup context for handling grouping radio inputs and selecting value.
 * Supports keyboard accessibility by allowing selection via `Enter` or `Space` keys.
 * @example
 * ```tsx
 * <RadioInput
 *   name="options"
 *   value="option1"
 *   checked={value}
 *   renderLabel={() => <Label htmlFor="option1">Select Value</Label>}
 * />
 * ```
 */
function RadioInput({ id, renderLabel, children, ...props }: RadioInputProps) {
   const inputId = id || `radio-${props.value}`;
   const { name, selectedValue, handleChange } = useRadioContext();
   const { isAlert, inputChange, onFocus } = useFormContext();

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         (event.target as HTMLInputElement).click(); // Triggers onChange
      }
   };

   // Only pass `checked` if selectedValue is defined
   const checkedProp =
      selectedValue !== undefined && selectedValue !== null
         ? { checked: selectedValue === props.value }
         : {};

   const {
      onClick: propOnClick,
      onChange: propOnChange,
      onFocus: propOnFocus,
      ...restProps
   } = props;

   return (
      <div className={clsx('radio-container', { 'is-alert': isAlert })}>
         <input
            id={inputId}
            type="radio"
            className="radio-input"
            onClick={callAll(propOnClick, inputChange)}
            onChange={callAll(propOnChange, handleChange, inputChange)}
            onFocus={callAll(propOnFocus, onFocus)}
            onKeyDown={handleKeyDown}
            name={name}
            {...checkedProp}
            {...restProps}
         />
         {renderLabel ? renderLabel() : null}
      </div>
   );
}

export default RadioInput;
