import * as React from 'react';
import clsx from 'clsx';
import './RadioInput.scss';
import { useFormContext } from '../FormControl';
import { callAll } from '../../Utils/AllFunctionsCall';

/**
 * Props for the RadioInput component.
 *
 * Extends standard HTML input attributes for a radio element.
 *
 * @property id - A unique identifier for the radio input. Defaults to `radio-${value}` if not provided.
 * @property renderLabel - A render function that returns a React node to be used as the label for the radio input.
 */
export interface RadioInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   id: string;
   renderLabel: () => React.ReactNode;
}

/**
 * Accessible and customizable radio input component.
 *
 * Renders a single radio input with a custom label.
 * Integrates with form context for handling alerts, focus, and change events.
 * Supports keyboard accessibility by allowing selection via `Enter` or `Space` keys.
 */
function RadioInput({ id, renderLabel, ...props }: RadioInputProps) {
   const inputId = id || `radio-${props.value}`;
   const { isAlert, inputChange, onFocus } = useFormContext();

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         (event.target as HTMLInputElement).click(); // Triggers onChange
      }
   };

   return (
      <div className={clsx('radio-container', { 'is-alert': isAlert })}>
         <input
            id={inputId}
            type="radio"
            className="radio-input"
            onClick={callAll(props.onClick, inputChange)}
            onChange={callAll(props.onChange, inputChange)}
            onFocus={callAll(props.onFocus, onFocus)}
            onKeyDown={handleKeyDown}
            {...props}
         />
         {renderLabel()}
      </div>
   );
}

export default RadioInput;
