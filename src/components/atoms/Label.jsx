import React from 'react'
      
      const Label = ({ children, htmlFor, className = '' }) => {
        return (
          <label htmlFor={htmlFor} className={`form-label ${className}`}>
            {children}
          </label>
        )
      }
      
      export default Label