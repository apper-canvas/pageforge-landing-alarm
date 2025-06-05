import React from 'react'
      
      const Text = ({ children, className = '', ...props }) => {
        return (
          <p className={`text-sm text-gray-600 ${className}`} {...props}>
            {children}
          </p>
        )
      }
      
      export default Text