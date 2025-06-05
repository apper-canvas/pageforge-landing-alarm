import React from 'react'
      import { motion } from 'framer-motion'
      
      const FeaturePreview = ({ content, theme }) => {
        if (!theme) return <div className="h-full bg-gray-100 rounded-lg animate-pulse"></div>
      
        const themeClasses = {
          'modern': 'bg-gradient-to-br from-blue-50 to-indigo-100',
          'minimal': 'bg-white',
          'bold': 'bg-gradient-to-r from-purple-600 to-pink-600',
          'elegant': 'bg-gradient-to-br from-gray-900 to-gray-700',
          'creative': 'bg-gradient-to-br from-yellow-50 to-orange-100',
          'tech': 'bg-gradient-to-br from-gray-50 to-blue-50'
        }
      
        const textClasses = {
          'modern': 'text-gray-900',
          'minimal': 'text-gray-900',
          'bold': 'text-white',
          'elegant': 'text-white',
          'creative': 'text-gray-900',
          'tech': 'text-gray-900'
        }
      
        return (
          <div className={`h-full rounded-lg p-8 flex flex-col justify-center items-center text-center ${themeClasses[theme.category] || 'bg-white'}`}>
            <motion.h1 
              key={content.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-3xl md:text-4xl font-bold mb-4 ${textClasses[theme.category] || 'text-gray-900'}`}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              key={content.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-lg mb-8 max-w-md ${textClasses[theme.category] || 'text-gray-600'}`}
            >
              {content.description}
            </motion.p>
            <motion.button 
              key={content.ctaText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              {content.ctaText}
            </motion.button>
          </div>
        )
      }
      
      export default FeaturePreview