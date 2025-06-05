import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      
      const ThemeCard = ({ theme, isSelected, onClick }) => {
        return (
          <motion.button
            key={theme.id}
            onClick={onClick}
            className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'border-primary ring-2 ring-primary/20 scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:scale-102'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-left bg-white">
              <Title level={4} className="text-sm">{theme.name}</Title>
              <Text className="text-xs text-gray-500 capitalize">{theme.category}</Text>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" className="h-4 w-4 text-white" />
              </div>
            )}
          </motion.button>
        )
      }
      
      export default ThemeCard