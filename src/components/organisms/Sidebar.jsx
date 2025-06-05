import React from 'react'
import Icon from '@/components/atoms/Icon'
import Title from '@/components/atoms/Title'
import SidebarItem from '@/components/molecules/SidebarItem'

const Sidebar = ({ sidebarItems, activeTab, setActiveTab, setShowComingSoon }) => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" className="h-5 w-5 text-white" />
          </div>
          <Title level={2} className="text-xl">PageForge</Title>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            onClick={() => {
              if (item.active || item.id === 'templates') {
                setActiveTab(item.id)
              } else {
                setShowComingSoon(true)
              }
            }}
          />
        ))}
      </nav>
    </div>
  )
}

export default Sidebar