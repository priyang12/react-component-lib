import * as React from 'react';
import { clsx } from 'clsx';
import './Switch.scss';

export interface SwitchProps extends React.ComponentPropsWithoutRef<'label'> {
   isOn: boolean;
   setIsOn: () => void;
   width?: string;
   disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
   isOn,
   setIsOn,
   width = '50px',
   disabled = false,
   className,
   ...props
}) => {
   const LabelClassName = clsx('switch-label', className, {
      'switch-label--disabled': disabled,
   });

   return (
      <div
         className={clsx('switch-container', {
            'switch-container--disabled': disabled,
         })}
         style={{ width }}
         onClick={() => {
            if (!disabled) {
               setIsOn();
            }
         }}
         onKeyDown={(e) => {
            if (e.key === 'Enter') {
               if (!disabled) setIsOn();
            }
         }}
         role="switch"
         aria-checked={isOn}
         aria-disabled={disabled}
         aria-label="switch"
         tabIndex={disabled ? -1 : 0}
      >
         <input
            className="switch"
            type="checkbox"
            checked={isOn}
            disabled={disabled}
            aria-hidden="true"
            tabIndex={-1}
            readOnly
         />
         <label className={LabelClassName} {...props}></label>
      </div>
   );
};

export default Switch;
