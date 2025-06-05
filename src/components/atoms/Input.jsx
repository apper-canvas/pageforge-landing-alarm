import React from 'react'
      
const Input = ({ type = 'text', value, onChange, placeholder, className = '', maxLength, hasError, ...props }) => {
  const { hasError: _, ...inputProps } = { hasError, ...props }
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-input ${hasError ? 'border-red-300 focus:border-red-500' : ''} ${className}`}
      maxLength={maxLength}
      {...inputProps}
    />
  )
      }
      
      export default Input