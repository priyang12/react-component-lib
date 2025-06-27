import * as React from 'react';
import './RadioGroup.scss';
import clsx from 'clsx';

export type RadioContext = {
   name: string | undefined;
   selectedValue: string | undefined;
   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroupContext = React.createContext({} as RadioContext);

export const useRadioContext = () => {
   const context = React.useContext(RadioGroupContext);
   if (!context) {
      throw new Error(
         'useRadioContext must be used within a <RadioGroupContext>'
      );
   }
   return context;
};

/**
 * Props for the RadioGroup component.
 *
 * Extends standard HTML div props and adds radio-specific configuration.
 *
 * @property name - The name shared by all radio inputs within the group.
 * @property defaultValue - The initially selected radio value.
 * @property layout - Determines the layout of the radio group. Options are `'horizontal'` or `'vertical'`. Defaults to `'vertical'`.
 * @property handleRadioChange - Callback function triggered when a different radio option is selected. Receives the selected value.
 */
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<'div'> {
   /** The name shared by all radio inputs within the group. */
   name?: string;
   /** The initially selected radio value. */
   defaultValue?: string;
   /** Determines the layout of the radio group. */
   layout?: 'horizontal' | 'vertical';
   /** Callback function triggered when a different radio option is selected. Receives the selected value. */
   handleRadioChange?: (value: string) => void;
}

/**
 * Context-enabled radio group component.
 *
 * Wraps multiple radio inputs, managing their selected state and layout.
 * Provides a context to child components to access the group state and handlers.
 * Supports accessibility via `role="radio-group"` and custom keyboard handling.
 */
function RadioGroup({
   name,
   defaultValue,
   layout = 'vertical',
   handleRadioChange,
   children,
   ...props
}: RadioGroupProps) {
   const [selectedValue, setSelectedValue] = React.useState(defaultValue);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSelectedValue(value);
      handleRadioChange?.(value); // Call user-provided onChange if exists
   };
   return (
      <RadioGroupContext.Provider value={{ name, selectedValue, handleChange }}>
         <div
            role="radio-group"
            className={clsx(
               props.className,
               `radio-group radio-group--${layout}`
            )}
            {...props}
         >
            {children}
         </div>
      </RadioGroupContext.Provider>
   );
}

export default RadioGroup;
