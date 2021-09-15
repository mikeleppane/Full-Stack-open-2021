import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onButtonClick }) => {
  return (
    <button style={{ margin: "5px" }} onClick={onButtonClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Button;
