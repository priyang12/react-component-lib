import * as React from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';
import { cx } from '@chakra-ui/utils';
import './Label.scss';

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
   const { children, hidden, size, alert, className, ...restProps } = props;

   const LabelClass = cx(
      'label',
      hidden ? 'visually-hidden' : 'show',
      size && `label--${size}`,
      alert && `label--alert`,
      className
   );

   return (
      <chakra.label className={LabelClass} {...restProps}>
         {alert ? alert : children}
      </chakra.label>
   );
}
export default Label;
