import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Badge from '@/components/atoms/Badge'
      
      const SidebarItem = ({ item, activeTab, onClick }) => {
        const isActive = activeTab === item.id && item.active
      
        return (
          <button
            key={item.id}
            onClick={onClick}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon name={item.icon} className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <Badge>{item.badge.includes('Premium') ? 'Pro' : 'Soon'}</Badge>}
            {!item.active && (
              <Icon name="Lock" className="h-4 w-4 ml-2 text-gray-400" />
            )}
          </button>
        )
      }
      
      export default SidebarItem