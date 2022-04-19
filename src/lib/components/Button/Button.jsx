import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ label, style }) => {
  return (
    <button className="btn" style={style}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  label: "Button",
};

export default Button;
