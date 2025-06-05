import React, { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import Card from '@/components/atoms/Card'
      import Button from '@/components/atoms/Button'
      import Title from '@/components/atoms/Title'
      import Icon from '@/components/atoms/Icon'
      import FormField from '@/components/molecules/FormField'
      import ThemeCard from '@/components/molecules/ThemeCard'
      import { themeService, landingPageService } from '@/services'
      import FeaturePreview from '@/components/templates/FeaturePreview'
      import PreviewDeviceSwitcher from '@/components/molecules/PreviewDeviceSwitcher'
      
      const PageBuilderForm = ({ onPageCreated }) => {
        const [formData, setFormData] = useState({
          title: '',
          description: '',
          ctaText: '',
          themeId: ''
        })
        const [themes, setThemes] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [generating, setGenerating] = useState(false)
        const [showSuccess, setShowSuccess] = useState(false)
        const [generatedUrl, setGeneratedUrl] = useState('')
        const [previewDevice, setPreviewDevice] = useState('desktop')
        const [validationErrors, setValidationErrors] = useState({})
      
        useEffect(() => {
          const loadThemes = async () => {
            setLoading(true)
            try {
              const themesData = await themeService.getAll()
              setThemes(themesData)
              if (themesData.length > 0) {
                setFormData(prev => ({ ...prev, themeId: themesData[0].id }))
              }
            } catch (err) {
              setError(err.message)
            } finally {
              setLoading(false)
            }
          }
          loadThemes()
        }, [])
      
        const validateForm = () => {
          const errors = {}
          if (!formData.title.trim()) errors.title = 'Title is required'
          if (formData.title.length > 60) errors.title = 'Title must be 60 characters or less'
          if (!formData.description.trim()) errors.description = 'Description is required'
          if (formData.description.length > 160) errors.description = 'Description must be 160 characters or less'
          if (!formData.ctaText.trim()) errors.ctaText = 'CTA text is required'
          if (!formData.themeId) errors.themeId = 'Please select a theme'
          
          setValidationErrors(errors)
          return Object.keys(errors).length === 0
        }
      
        const handleInputChange = (field, value) => {
          setFormData(prev => ({ ...prev, [field]: value }))
          if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: null }))
          }
        }
      
        const generatePage = async () => {
          if (!validateForm()) return
      
          setGenerating(true)
          try {
            const pageData = {
              ...formData,
              url: `https://pageforge.app/${Date.now().toString(36)}`,
              createdAt: new Date().toISOString()
            }
            
            const createdPage = await landingPageService.create(pageData)
            setGeneratedUrl(createdPage.url)
            setShowSuccess(true)
            onPageCreated?.(createdPage)
            
            // Reset form
            setFormData({
              title: '',
              description: '',
              ctaText: '',
              themeId: themes[0]?.id || ''
            })
          } catch (err) {
            toast.error('Failed to generate page')
          } finally {
            setGenerating(false)
          }
        }
      
        const copyToClipboard = async () => {
          try {
            await navigator.clipboard.writeText(generatedUrl)
            toast.success('URL copied to clipboard!')
          } catch (err) {
            toast.error('Failed to copy URL')
          }
        }
      
        const selectedTheme = themes.find(theme => theme.id === formData.themeId)
      
        const getPreviewContent = () => {
          const title = formData.title || 'Your Amazing Product'
          const description = formData.description || 'Create compelling descriptions that convert visitors into customers.'
          const ctaText = formData.ctaText || 'Get Started'
          
          return { title, description, ctaText }
        }
      
        if (loading) {
          return (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )
        }
      
        if (error) {
          return (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">Error: {error}</div>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          )
        }
      
        return (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
            {/* Form Panel */}
            <div className="xl:col-span-5 space-y-6">
              <Card>
                <Title level={2} className="mb-6">Page Details</Title>
                
                <div className="space-y-6">
                  <FormField
                    label="Page Title"
                    value={formData.title}
                    onChange={(val) => handleInputChange('title', val)}
                    placeholder="Enter your page title..."
                    maxLength={60}
                    error={validationErrors.title}
                    charCount={formData.title.length}
                    charLimit={60}
                  />
      
                  <FormField
                    label="Description"
                    value={formData.description}
                    onChange={(val) => handleInputChange('description', val)}
                    placeholder="Describe your product or service..."
                    maxLength={160}
                    error={validationErrors.description}
                    charCount={formData.description.length}
                    charLimit={160}
                    type="textarea"
                  />
      
                  <FormField
                    label="Call-to-Action Text"
                    value={formData.ctaText}
                    onChange={(val) => handleInputChange('ctaText', val)}
                    placeholder="Get Started, Buy Now, Learn More..."
                    error={validationErrors.ctaText}
                  />
                </div>
              </Card>
      
              <Card>
                <Title level={3} className="mb-4">Choose Theme</Title>
                <div className="grid grid-cols-2 gap-4">
                  {themes.map(theme => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      isSelected={formData.themeId === theme.id}
                      onClick={() => handleInputChange('themeId', theme.id)}
                    />
                  ))}
                </div>
                {validationErrors.themeId && (
                  <p className="text-red-500 text-sm mt-2">{validationErrors.themeId}</p>
                )}
              </Card>
      
              <Button
                onClick={generatePage}
                disabled={generating}
                className="w-full h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Icon name="Zap" className="h-5 w-5 mr-2" />
                    Generate Page
                  </div>
                )}
              </Button>
            </div>
      
            {/* Preview Panel */}
            <div className="xl:col-span-7">
              <Card className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <Title level={3}>Live Preview</Title>
                  <PreviewDeviceSwitcher previewDevice={previewDevice} setPreviewDevice={setPreviewDevice} />
                </div>
                
                <div className="h-96 md:h-[500px] flex items-center justify-center">
                  <div className={`${previewDevice === 'mobile' ? 'w-80 h-full' : 'w-full h-full'} transition-all duration-300`}>
                    <FeaturePreview content={getPreviewContent()} theme={selectedTheme || themes[0]} />
                  </div>
                </div>
              </Card>
            </div>
      
            {/* Success Modal */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowSuccess(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-morphism rounded-2xl p-8 max-w-md w-full text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-secondary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <Icon name="Check" className="h-10 w-10 text-white" />
                    </div>
                    
                    <Title level={2} className="text-2xl mb-4">🎉 Page Created!</Title>
                    <p className="text-gray-600 mb-6">
                      Your landing page has been generated and is live on the web!
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate flex-1 mr-2">{generatedUrl}</span>
                        <button
                          onClick={copyToClipboard}
                          className="p-2 text-primary hover:text-primary-dark transition-colors"
                          title="Copy URL"
                        >
                          <Icon name="Copy" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => window.open(generatedUrl, '_blank')}
                        className="flex-1"
                      >
                        <Icon name="ExternalLink" className="h-5 w-5 mr-2" />
                        View Page
                      </Button>
                      <Button
                        onClick={() => setShowSuccess(false)}
                        className="btn-secondary flex-1"
                      >
                        Create Another
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
      
      export default PageBuilderForm