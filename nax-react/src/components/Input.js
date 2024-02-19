import React, { useState } from "react";
import proptype from "prop-types"

function Input({ placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={placeholder}
        className={`border-b-2 py-1 border-[#AFC1D6] focus:outline-none bg-white focus:border-b-2 transition-colors duration-100 ${
          focused || inputValue ? "pb-1" : "pb-1"
        }`}
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <label
        htmlFor={placeholder}
        className={`absolute left-0 top-1 bg-white cursor-text transition-all duration-100 ${
          focused || inputValue ? "-top-4 text-xs" : "top-1 text-base"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

Input.propTypes = {
placeholder: proptype.string.isRequired,
}
export default Input;
