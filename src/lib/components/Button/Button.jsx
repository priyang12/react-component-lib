import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
   text,
   style,
   StyleClass,
   ellipsis,
   variant,
   radius,
   children,
   ...props
}) => {
   return (
      <button
         className={`btn ${StyleClass} ${variant} ${ellipsis && 'ellipsis'}`}
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

Button.propTypes = {
   text: PropTypes.string.isRequired,
};

Button.defaultProps = {
   variant: 'primary',
};

export default Button;
