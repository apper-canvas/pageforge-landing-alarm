import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { themeService, landingPageService } from '../services'

const MainFeature = ({ onPageCreated }) => {
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

  const renderPreview = () => {
    const content = getPreviewContent()
    const theme = selectedTheme || themes[0]
    
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
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
      {/* Form Panel */}
      <div className="xl:col-span-5 space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Page Details</h2>
          
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="form-label">Page Title</label>
                <span className={`text-xs ${formData.title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.title.length}/60
                </span>
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`form-input ${validationErrors.title ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Enter your page title..."
                maxLength={60}
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
              )}
            </div>

            {/* Description Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="form-label">Description</label>
                <span className={`text-xs ${formData.description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.description.length}/160
                </span>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`form-input resize-none h-24 ${validationErrors.description ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Describe your product or service..."
                maxLength={160}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
              )}
            </div>

            {/* CTA Text Input */}
            <div>
              <label className="form-label">Call-to-Action Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
                className={`form-input ${validationErrors.ctaText ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Get Started, Buy Now, Learn More..."
              />
              {validationErrors.ctaText && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.ctaText}</p>
              )}
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            {themes.map(theme => (
              <motion.button
                key={theme.id}
                onClick={() => handleInputChange('themeId', theme.id)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  formData.themeId === theme.id
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
                  <h4 className="font-medium text-gray-900 text-sm">{theme.name}</h4>
                  <p className="text-xs text-gray-500 capitalize">{theme.category}</p>
                </div>
                {formData.themeId === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="Check" className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          {validationErrors.themeId && (
            <p className="text-red-500 text-sm mt-2">{validationErrors.themeId}</p>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePage}
          disabled={generating}
          className="btn-primary w-full h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 mr-2" />
              Generate Page
            </div>
          )}
        </button>
      </div>

      {/* Preview Panel */}
      <div className="xl:col-span-7">
        <div className="card p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  previewDevice === 'desktop'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ApperIcon name="Monitor" className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  previewDevice === 'mobile'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ApperIcon name="Smartphone" className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="h-96 md:h-[500px] flex items-center justify-center">
            <div className={`${previewDevice === 'mobile' ? 'w-80 h-full' : 'w-full h-full'} transition-all duration-300`}>
              {renderPreview()}
            </div>
          </div>
        </div>
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
              {/* Celebration Animation */}
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <ApperIcon name="Check" className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Page Created!</h3>
              <p className="text-gray-600 mb-6">
                Your landing page has been generated and is live on the web!
              </p>
              
              {/* URL Display */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate flex-1 mr-2">{generatedUrl}</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-primary hover:text-primary-dark transition-colors"
                    title="Copy URL"
                  >
                    <ApperIcon name="Copy" className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.open(generatedUrl, '_blank')}
                  className="btn-primary flex-1"
                >
                  <ApperIcon name="ExternalLink" className="h-5 w-5 mr-2" />
                  View Page
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn-secondary flex-1"
                >
                  Create Another
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature