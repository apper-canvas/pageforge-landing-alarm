import React from 'react'
      import Icon from '@/components/atoms/Icon'
      
      const PreviewDeviceSwitcher = ({ previewDevice, setPreviewDevice }) => {
        return (
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                previewDevice === 'desktop'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="Monitor" className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                previewDevice === 'mobile'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="Smartphone" className="h-4 w-4" />
            </button>
          </div>
        )
      }
      
      export default PreviewDeviceSwitcher