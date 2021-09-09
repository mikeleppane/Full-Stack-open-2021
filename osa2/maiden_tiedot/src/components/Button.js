import React from "react";

const Button = ({ text, country, onButtonClick }) => {
  return (
    <button style={{ margin: "5px" }} onClick={() => onButtonClick(country)}>
      {text}
    </button>
  );
};

export default Button;
