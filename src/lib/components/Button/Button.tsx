import * as React from 'react';

import './Button.scss';

interface IProps {
   text?: string;
   style?: any;
   StyleClass?: any;
   ellipsis?: boolean;
   variant?: string;
   radius?: string;
   className?: any;
   children?: React.ReactNode;
}

const Button: React.FC<IProps> = ({
   text,
   style,
   StyleClass,
   ellipsis,
   variant,
   radius,
   children,
   className,
   ...props
}) => {
   const btnClass = `btn ${StyleClass} ${className} ${variant} ${
      ellipsis && 'ellipsis'
   }`;

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
};

Button.defaultProps = {
   variant: 'primary',
};

export default Button;
