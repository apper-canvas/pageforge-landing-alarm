import { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import { landingPageService } from '@/services'
      import DashboardLayout from '@/components/templates/DashboardLayout'
      import PageBuilderForm from '@/components/organisms/PageBuilderForm'
      import PageList from '@/components/organisms/PageList'
      import SettingsPanel from '@/components/organisms/SettingsPanel'
      
      const HomePage = () => {
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
            setError(null)
          } catch (err) {
            setError(err.message || 'Failed to load pages')
            console.error('Error loading pages:', err)
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
          { id: 'templates', label: 'Templates', icon: 'Layout', badge: 'Premium templates launching soon', active: false },
          { id: 'analytics', label: 'Analytics', icon: 'BarChart3', badge: 'Analytics coming next month', active: false },
          { id: 'settings', label: 'Settings', icon: 'Settings', active: true }
        ]
      
        const comingSoonFeatures = [
          { title: 'Upload Images', icon: 'Upload', status: 'Coming soon', locked: true },
          { title: 'Custom Colors', icon: 'Palette', status: 'Premium feature', locked: true },
          { title: 'SEO Tools', icon: 'Search', status: 'Launching Q2 2024', locked: false },
          { title: 'Form Builder', icon: 'FormInput', status: 'In development', locked: false }
        ]
      
        return (
          <DashboardLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarItems={sidebarItems}
            showComingSoon={showComingSoon}
            setShowComingSoon={setShowComingSoon}
          >
            {activeTab === 'builder' && (
              <PageBuilderForm onPageCreated={handlePageCreated} />
            )}
            
            {activeTab === 'pages' && (
              <div className="space-y-6">
                <PageList
                  pages={myPages}
                  loading={loading}
                  error={error}
                  onDeletePage={handleDeletePage}
                  onCreateFirstPage={() => setActiveTab('builder')}
                />
              </div>
)}
            
            {activeTab === 'settings' && (
              <SettingsPanel comingSoonFeatures={comingSoonFeatures} />
            )}
          </DashboardLayout>
        )
      }
      
      export default HomePage