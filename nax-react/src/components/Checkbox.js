import React from 'react';
import PropTypes from 'prop-types';

export function Checkbox({
    checked = false,
    name,
    label,
    required = false,
    classes,
    action = () => {}
  }) {
  return (
    <>
      <input type="checkbox"
        id={name}
        onChange={action}
        checked={checked}
        required={required}
        className={classes + " h-4 w-4 text-indigo-500 focus:ring-indigo-800 border-gray-300 rounded"}
      />
      {
        label
        ? <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
        : ''
      }
    </>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  classes: PropTypes.string,
  action: PropTypes.func
}

export function RoundCheckbox({
    checked = false,
    name,
    classes,
    action = () => {}
  }) {
  return (
    <span className={classes + " relative inline-flex rounded-full cursor-pointer"}>
      <input type="checkbox"
        id={name}
        onChange={action}
        checked={checked}
        className="peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all checked:border-gray-900 checked:bg-orange-500 hover:scale-105"
      />
      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
          <path fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd">
          </path>
        </svg>
      </span>
    </span>
  );
}

RoundCheckbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  action: PropTypes.func
}