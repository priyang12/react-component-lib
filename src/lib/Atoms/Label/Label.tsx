import * as React from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';
import { cx } from '@chakra-ui/utils';
import './Label.scss';
import { FormControlContext } from '../../Module/FormControl/FormControl';

export interface LabelProps extends ChakraProps {
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
   const LabelClass = cx(
      'label',
      LabelCheck && 'active',
      overlay && 'overlay',
      hidden ? 'visually-hidden' : 'show',
      size && `label--${size}`,
      Alert && `label--alert`,
      className
   );

   return (
      <chakra.label
         className={LabelClass}
         {...restProps}
         data-valid={LabelCheck}
      >
         {Alert ? Alert : children}
      </chakra.label>
   );
}
export default Label;
