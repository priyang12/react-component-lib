import * as React from 'react';
import { useFormContext } from '../FormControl';
import { clsx } from 'clsx';
import './Switch.scss';

/**
 * Props for the Switch component.
 *
 * Extends standard HTML input props (excluding `ref`),
 * allowing additional attributes like `id`, `name`, etc.
 *
 * @property isOn - Boolean flag to control whether the switch is on or off.
 * @property flipSwitch - Callback function to toggle the switch state.
 * @property disabled - If true, disables the switch and prevents interaction.
 * @property switchSize - Controls the size of the switch. Options are `'small'`, `'medium'`, or `'large'`.
 */
export interface SwitchProps extends React.ComponentPropsWithoutRef<'input'> {
   isOn: boolean;
   flipSwitch: () => void;
   switchSize?: 'small' | 'medium' | 'large';
   disabled?: boolean;
}

/**
 * Accessible, customizable toggle switch component.
 *
 * Renders a div styled as a switch with keyboard and mouse support.
 * Supports accessibility via role="switch" and appropriate ARIA attributes.
 */
const Switch: React.FC<SwitchProps> = ({
   isOn,
   flipSwitch,
   switchSize = 'small',
   disabled = false,
   className,
   ...props
}) => {
   const { isAlert, disabled: formControlDisabled } = useFormContext();
   const switchButtonClass = clsx(
      'switch-span',
      `switch-span--${switchSize}`,
      className,
      {
         'switch-span--disabled': disabled,
      }
   );
   // take the formControl disable if we consumer does not pass the disabled
   const isDisable = disabled || formControlDisabled;

   /**
    * Handles both click and keyboard events.
    * Toggles the switch if it's not disabled.
    */
   const onEventChange = (e: React.SyntheticEvent) => {
      if (!isDisable) {
         if (e.type === 'click') {
            flipSwitch();
         }
         if (e.type === 'keydown') {
            let event = e as unknown as KeyboardEvent;
            if (event.key === 'Enter') {
               if (!isDisable) flipSwitch();
            }
         }
      }
   };

   return (
      <div
         className={clsx('switch-container', {
            'switch-container--disabled': isDisable,
            'switch-alert': isAlert,
         })}
         onClick={onEventChange}
         onKeyDown={onEventChange}
         role="switch"
         aria-checked={isOn}
         aria-disabled={isDisable}
         aria-label="switch"
         tabIndex={isDisable ? -1 : 0}
      >
         <input
            className="switch"
            type="checkbox"
            checked={isOn}
            disabled={isDisable}
            aria-hidden="true"
            tabIndex={-1}
            readOnly
            data-testid="switch-input"
            {...props}
         />
         <span className={switchButtonClass}></span>
      </div>
   );
};

export default Switch;
