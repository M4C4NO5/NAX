import React from 'react';
import PropTypes from 'prop-types';

export function ButtonPrimary({children, classes, action = () => {}}) {
  return (
    <button onClick={action} className={classes + " inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest text-white bg-tertiary hover:bg-auxiliar active:bg-auxiliar focus:bg-tertiary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"}>
      {children}
    </button>
  );
}

ButtonPrimary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  classes: PropTypes.string,
  action: PropTypes.func
}

export function ButtonSecondary({children, classes, action = () => {}}) {
  return (
    <button onClick={action} className={classes + " inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest text-white bg-primary hover:bg-secondary active:bg-tertiary focus:bg-orange-700 focus:outline-none focus:ring-2 focus:bd-secondary focus:ring-offset-2 transition ease-in-out duration-150"}>
      {children}
    </button>
  );
}

ButtonSecondary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  classes: PropTypes.string,
  action: PropTypes.func
}