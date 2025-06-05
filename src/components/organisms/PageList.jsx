import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import PageCard from '@/components/molecules/PageCard'
      
      const PageList = ({ pages, loading, error, onDeletePage, onCreateFirstPage }) => {
        if (loading) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )
        }
      
        if (error) {
          return <div className="text-red-500 text-center py-12">Error: {error}</div>
        }
      
        if (!pages || pages.length === 0) {
          return (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="FileText" className="h-12 w-12 text-gray-400" />
              </div>
              <Title level={3} className="mb-2">No pages yet</Title>
              <p className="text-gray-600 mb-6">Create your first landing page to get started</p>
              <Button onClick={onCreateFirstPage}>
                Create First Page
              </Button>
            </div>
          )
        }
      
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map(page => (
              <PageCard
                key={page.id}
                page={page}
                onDelete={onDeletePage}
                onView={(url) => window.open(url, '_blank')}
              />
            ))}
          </div>
        )
      }
      
      export default PageList