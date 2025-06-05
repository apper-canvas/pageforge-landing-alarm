import React from 'react'
      import { AnimatePresence, motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import Sidebar from '@/components/organisms/Sidebar'
      
      const DashboardLayout = ({
        activeTab,
        setActiveTab,
        sidebarItems,
        showComingSoon,
        setShowComingSoon,
        children
      }) => {
        return (
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
              sidebarItems={sidebarItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setShowComingSoon={setShowComingSoon}
            />
      
            <div className="flex-1 lg:ml-64">
              <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16">
                <div className="flex items-center justify-between h-full px-4 lg:px-8">
                  <div className="flex items-center lg:hidden">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                      <Icon name="Zap" className="h-5 w-5 text-white" />
                    </div>
                    <Title level={2} className="text-xl">PageForge</Title>
                  </div>
                  
                  <div className="hidden lg:block">
<Title level={1}>
                      {activeTab === 'builder' && 'Landing Page Builder'}
                      {activeTab === 'templates' && 'Template Library'}
                      {activeTab === 'pages' && 'My Pages'}
                      {activeTab === 'settings' && 'Settings'}
                    </Title>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Icon name="Bell" className="h-5 w-5" />
                    </button>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </header>
      
              <main className="p-4 lg:p-8">
                {children}
              </main>
            </div>
      
            <AnimatePresence>
              {showComingSoon && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowComingSoon(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-morphism rounded-2xl p-8 max-w-md w-full text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Clock" className="h-8 w-8 text-white" />
                    </div>
                    <Title level={3} className="text-xl mb-4">Coming Soon!</Title>
                    <p className="text-gray-600 mb-6">
                      We're working hard to bring you amazing new features. Stay tuned for updates!
                    </p>
                    <Button
                      onClick={() => setShowComingSoon(false)}
                      className="w-full"
                    >
                      Got it!
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
      
      export default DashboardLayout