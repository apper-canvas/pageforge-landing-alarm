import React from 'react'
      import Card from '@/components/atoms/Card'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      
      const FeatureList = ({ features }) => {
        return (
          <Card>
            <Title level={3} className="mb-4">Coming Soon Features</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map(feature => (
                <div key={feature.title} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg mr-3 relative">
                    <Icon name={feature.icon} className="h-5 w-5 text-gray-600" />
                    {feature.locked && (
                      <Icon name="Lock" className="h-3 w-3 text-gray-400 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <div>
                    <Title level={4} className="font-medium text-gray-900">{feature.title}</Title>
                    <Text className="text-sm text-gray-600">{feature.status}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )
      }
      
      export default FeatureList