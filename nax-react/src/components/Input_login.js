import React from 'react';
import PropTypes from 'prop-types';

export function Input({
    type,
    name,
    label,
    value,
    placeholder,
    required = false,
    classes,
    action = () => {}
  }) {
  return (
    <>
      {
        label
        ? <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        : ''
      }
      <input type={type}
        id={name}
        onChange={action}
        value={value}
        placeholder={placeholder}
        required={required}
        className={classes + " w-full rounded-md shadow-sm px-2.5 py-1.5 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"}
      />
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  classes: PropTypes.string,
  action: PropTypes.func
}