import React from 'react'
      
      const Title = ({ children, level = 1, className = '' }) => {
        const HeadingTag = `h${level}`
        return (
          <HeadingTag className={`font-bold text-gray-900 ${
            level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg'
          } ${className}`}>
            {children}
          </HeadingTag>
        )
      }
      
      export default Title