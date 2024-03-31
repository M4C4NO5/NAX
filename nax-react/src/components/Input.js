import React, { useState } from "react";

function Input({
  id,
  type = 'text',
  value,
  placeholder,
  required = false,
  active = false,
  className,
  action = () => {}
}) {
  const [focused, setFocused] = useState(active);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    if (!active) {
      setFocused(false);
    }
  };

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      onChange={action}
      value={value}
      className={`${className} w-full h-9 border border-primary py-1 px-2 focus:outline-none bg-transparent focus:border-b-2 transition-colors duration-100 peer ${focused || value ? "pb-1" : ""}`}
      required={required}
      autoComplete="off"
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
}

export default Input;
