import React from 'react'
      import Card from '@/components/atoms/Card'
      import Title from '@/components/atoms/Title'
      import Input from '@/components/atoms/Input'
      import Label from '@/components/atoms/Label'
      import FeatureList from '@/components/organisms/FeatureList'
      
      const SettingsPanel = ({ comingSoonFeatures }) => {
        return (
          <div className="max-w-2xl space-y-8">
            <Card>
              <Title level={3} className="mb-4">Account Settings</Title>
              <div className="space-y-4">
                <div>
                  <Label>Display Name</Label>
                  <Input type="text" defaultValue="PageForge User" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="user@example.com" />
                </div>
              </div>
            </Card>
            
            <FeatureList features={comingSoonFeatures} />
          </div>
        )
      }
      
      export default SettingsPanel