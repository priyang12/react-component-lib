import * as React from 'react';
import { clsx } from 'clsx';
import './Label.scss';
import { FormControlContext } from '../../Module/FormControl/FormControl';

export interface LabelProps {
   children: React.ReactNode;
   className?: string;
   htmlFor?: string;
   hidden?: boolean;
   size?: 'small' | 'medium' | 'large';
   alert?: boolean | string;
}

function Label(
   props: React.LabelHTMLAttributes<HTMLLabelElement> & LabelProps
) {
   const { children, hidden, size, className, ...restProps } = props;
   const { Alert, LabelCheck, overlay } = React.useContext(FormControlContext);
   const LabelClass = clsx(
      'label',
      LabelCheck && 'active',
      overlay && 'overlay',
      hidden ? 'visually-hidden' : 'show',
      size && `label--${size}`,
      Alert && `label--alert`,
      className
   );

   return (
      <label className={LabelClass} {...restProps} data-valid={LabelCheck}>
         {Alert ? Alert : children}
      </label>
   );
}
export default Label;
