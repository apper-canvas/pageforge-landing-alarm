import React from 'react'
      
      const Button = ({ children, onClick, className = '', disabled = false, type = 'button', ...props }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`btn-primary ${className}`}
            disabled={disabled}
            {...props}
          >
            {children}
          </button>
        )
      }
      
      export default Button