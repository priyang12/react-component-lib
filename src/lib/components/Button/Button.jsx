import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, style, StyleClass, ellipsis, variant, radius }) => {
   return (
      <button
         className={`btn ${StyleClass} ${variant} ${ellipsis && 'ellipsis'}`}
         style={{
            ...style,
            borderRadius: radius,
         }}
      >
         {text}
      </button>
   );
};

Button.propTypes = {
   text: PropTypes.string.isRequired,
};

Button.defaultProps = {
   text: 'Button',
   variant: 'primary',
};

export default Button;
