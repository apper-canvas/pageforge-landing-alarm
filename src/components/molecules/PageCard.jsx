import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Title from '@/components/atoms/Title'
      
      const PageCard = ({ page, onDelete, onView }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 group hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <Title level={3} className="truncate">{page.title}</Title>
              <button
                onClick={() => onDelete(page.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                aria-label={`Delete ${page.title}`}
              >
                <Icon name="Trash2" className="h-4 w-4" />
              </button>
            </div>
            <Text className="mb-4 line-clamp-2">{page.description}</Text>
            <div className="flex items-center justify-between">
              <Text className="text-xs text-gray-500">
                {new Date(page.createdAt).toLocaleDateString()}
              </Text>
              <button
                onClick={() => onView(page.url)}
                className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
              >
                <Icon name="ExternalLink" className="h-4 w-4 mr-1" />
                View
              </button>
            </div>
          </motion.div>
        )
      }
      
      export default PageCard