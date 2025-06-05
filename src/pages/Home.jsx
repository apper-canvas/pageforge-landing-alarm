import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { landingPageService } from '../services'

const Home = () => {
  const [myPages, setMyPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('builder')
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    const loadMyPages = async () => {
      setLoading(true)
      try {
        const pages = await landingPageService.getAll()
        setMyPages(pages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (activeTab === 'pages') {
      loadMyPages()
    }
  }, [activeTab])

  const handlePageCreated = async (newPage) => {
    try {
      const createdPage = await landingPageService.create(newPage)
      setMyPages(prev => [createdPage, ...prev])
      toast.success("Landing page created successfully!")
    } catch (err) {
      toast.error("Failed to create landing page")
    }
  }

  const handleDeletePage = async (pageId) => {
    try {
      await landingPageService.delete(pageId)
      setMyPages(prev => prev.filter(page => page.id !== pageId))
      toast.success("Page deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete page")
    }
  }

  const sidebarItems = [
    { id: 'builder', label: 'Page Builder', icon: 'Zap', active: true },
    { id: 'pages', label: 'My Pages', icon: 'FileText', active: true },
    { id: 'templates', label: 'Templates', icon: 'Layout', badge: 'Premium templates launching soon' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', badge: 'Analytics coming next month' },
    { id: 'settings', label: 'Settings', icon: 'Settings', active: true }
  ]

  const comingSoonFeatures = [
    { title: 'Upload Images', icon: 'Upload', status: 'Coming soon', locked: true },
    { title: 'Custom Colors', icon: 'Palette', status: 'Premium feature', locked: true },
    { title: 'SEO Tools', icon: 'Search', status: 'Launching Q2 2024', locked: false },
    { title: 'Form Builder', icon: 'FormInput', status: 'In development', locked: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PageForge</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.active) {
                  setActiveTab(item.id)
                } else {
                  setShowComingSoon(true)
                }
              }}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id && item.active
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ApperIcon name={item.icon} className="h-5 w-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                  Soon
                </span>
              )}
              {!item.active && (
                <ApperIcon name="Lock" className="h-4 w-4 ml-2 text-gray-400" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center lg:hidden">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PageForge</span>
            </div>
            
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'builder' && 'Landing Page Builder'}
                {activeTab === 'pages' && 'My Pages'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ApperIcon name="Bell" className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {activeTab === 'builder' && (
            <MainFeature onPageCreated={handlePageCreated} />
          )}
          
          {activeTab === 'pages' && (
            <div className="space-y-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : myPages?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myPages.map(page => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card p-6 group hover:shadow-soft transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 truncate">{page.title}</h3>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{page.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(page.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => window.open(page.url, '_blank')}
                          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                        >
                          <ApperIcon name="ExternalLink" className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="FileText" className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                  <p className="text-gray-600 mb-6">Create your first landing page to get started</p>
                  <button
                    onClick={() => setActiveTab('builder')}
                    className="btn-primary"
                  >
                    Create First Page
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Display Name</label>
                    <input type="text" className="form-input" defaultValue="PageForge User" />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" defaultValue="user@example.com" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comingSoonFeatures.map(feature => (
                    <div key={feature.title} className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-white rounded-lg mr-3">
                        <ApperIcon name={feature.icon} className="h-5 w-5 text-gray-600" />
                        {feature.locked && (
                          <ApperIcon name="Lock" className="h-3 w-3 text-gray-400 -mt-1 -mr-1" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Coming Soon Modal */}
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
                <ApperIcon name="Clock" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you amazing new features. Stay tuned for updates!
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="btn-primary w-full"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home