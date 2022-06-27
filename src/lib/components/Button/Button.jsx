import './Button.scss';

const Button = ({
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
