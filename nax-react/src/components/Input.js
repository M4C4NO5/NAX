import React, { useState } from "react";

function Input({
  type = 'text',
  value,
  placeholder,
  required = false,
  action = () => {}
}) {
  const [focused, setFocused] = useState(false);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={placeholder}
          onChange={action}
          value={value}
          className={`border-b-2 border-secondary py-1 focus:outline-none bg-white focus:border-b-2 transition-colors duration-100 peer ${focused || value ? "pb-1" : ""}`}
          required={required}
          autoComplete="off"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <label
          htmlFor={placeholder}
          className={`absolute left-0 bg-white cursor-text transition-all duration-100 ${focused || value ? "-top-5 text-xs" : ""}`}
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
}

export default Input;
