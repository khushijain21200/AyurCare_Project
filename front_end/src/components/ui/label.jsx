// label.jsx
import React from 'react';

const Label = ({ text, htmlFor, required = false, color = '#333', fontSize = '14px' }) => {
  const styles = {
    label: {
      color,
      fontSize,
      fontWeight: '600',
      display: 'inline-block',
      marginBottom: '6px',
    },
    required: {
      color: 'red',
      marginLeft: '4px',
    },
  };

  return (
    <label htmlFor={htmlFor} style={styles.label}>
      {text}
      {required && <span style={styles.required}>*</span>}
    </label>
  );
};

export default Label;
