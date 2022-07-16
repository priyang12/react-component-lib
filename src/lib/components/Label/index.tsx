import * as React from 'react';
import { chakra, HTMLChakraProps } from '@chakra-ui/system';
import './Label.scss';

interface LabelProps extends HTMLChakraProps<any> {
   children: React.ReactNode;
   className?: string;
   htmlFor?: string;
   hidden?: boolean;
   size?: 'small' | 'medium' | 'large';
   alert?: boolean | string;
}

function Label(props: LabelProps) {
   const { children, hidden, size, alert, ...restProps } = props;

   return (
      <chakra.label
         {...restProps}
         className={`${size} ${hidden ? 'visually-hidden' : 'show'} `}
         style={alert ? { color: 'red' } : {}}
      >
         {alert ? alert : children}
      </chakra.label>
   );
}
export default Label;
