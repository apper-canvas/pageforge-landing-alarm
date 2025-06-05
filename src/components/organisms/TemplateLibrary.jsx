import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Title from '@/components/atoms/Title'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import ThemeCard from '@/components/molecules/ThemeCard'
import { themeService } from '@/services'

const TemplateLibrary = ({ onThemeSelect }) => {
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      setLoading(true)
      const data = await themeService.getAll()
      setThemes(data || [])
    } catch (err) {
      setError('Failed to load themes')
      toast.error('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme)
    if (onThemeSelect) {
      onThemeSelect(theme)
    }
    toast.success(`Selected ${theme.name} template`)
  }

  const categories = ['all', ...new Set(themes?.map(theme => theme.category) || [])]
  const filteredThemes = filter === 'all' 
    ? themes 
    : themes?.filter(theme => theme.category === filter) || []

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <Icon name="AlertCircle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <Title level={3} className="mb-2">Failed to Load Templates</Title>
        <Text className="text-gray-600 mb-4">{error}</Text>
        <Button onClick={loadThemes}>Try Again</Button>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Title level={2} className="text-2xl md:text-3xl font-bold mb-2 text-white">
              More Templates Coming Soon! 🚀
            </Title>
            <Text className="text-purple-100 text-lg">
              We're crafting amazing new templates for every industry. Get notified when they launch!
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="secondary" 
              className="bg-white text-purple-600 hover:bg-purple-50 border-0"
            >
              <Icon name="Bell" className="h-4 w-4 mr-2" />
              Notify Me
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Icon name="Eye" className="h-4 w-4 mr-2" />
              Preview Coming
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white opacity-5"
        />
      </motion.div>

      {/* Template Library Header */}
      <div>
        <Title level={1} className="text-3xl font-bold mb-2">Template Library</Title>
        <Text className="text-gray-600 text-lg">
          Choose from our curated collection of professional templates
        </Text>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Templates' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredThemes?.map((theme) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ThemeCard
              theme={theme}
              isSelected={selectedTheme?.id === theme.id}
              onClick={() => handleThemeSelect(theme)}
            />
          </motion.div>
        )) || []}
      </div>

      {/* Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Title level={2} className="text-2xl font-bold text-primary">{themes?.length || 0}</Title>
            <Text className="text-gray-600">Total Templates</Text>
          </div>
          <div>
            <Title level={2} className="text-2xl font-bold text-secondary">{categories.length - 1}</Title>
            <Text className="text-gray-600">Categories</Text>
          </div>
          <div>
            <Title level={2} className="text-2xl font-bold text-accent">15+</Title>
            <Text className="text-gray-600">More Coming</Text>
          </div>
          <div>
            <Title level={2} className="text-2xl font-bold text-purple-600">100%</Title>
            <Text className="text-gray-600">Free to Use</Text>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TemplateLibrary