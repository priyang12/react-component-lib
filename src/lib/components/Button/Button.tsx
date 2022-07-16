import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import './Button.scss';
import { Variant } from '../interface';

interface IProps {
   text?: string;
   style?: any;
   StyleClass?: any;
   ellipsis?: boolean;
   variant?: Variant['variant'];
   radius?: string;
   className?: any;
   children?: React.ReactNode;
}

function Button({
   text,
   style,
   StyleClass,
   ellipsis,
   variant,
   radius,
   children,
   className,
   ...props
}: IProps): JSX.Element {
   const btnClass = cx(
      'btn',
      ellipsis && 'ellipsis',
      StyleClass,
      variant,
      radius,
      className
   );

   return (
      <button
         className={btnClass}
         style={{
            ...style,
            borderRadius: radius,
         }}
         {...props}
      >
         {text ? text : children}
      </button>
   );
}

Button.defaultProps = {
   variant: 'primary',
};

export default Button;
