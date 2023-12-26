import React from 'react';

const Alert = ({ type, message }) => {
  const alertClass = `alert alert-${type} fixed-top w-100 text-center `;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

export default Alert;
