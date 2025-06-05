import React from 'react'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Text from '@/components/atoms/Text'
      
      const FormField = ({
        label,
        value,
        onChange,
        placeholder,
        type = 'text',
        maxLength,
        error,
        charCount,
        charLimit
}) => {
        const hasError = !!error
        
        const inputProps = {
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder,
          maxLength,
          hasError,
          type
        }
      
        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>{label}</Label>
              {charCount !== undefined && charLimit !== undefined && (
                <span className={`text-xs ${charCount > charLimit ? 'text-red-500' : 'text-gray-500'}`}>
                  {charCount}/{charLimit}
                </span>
              )}
            </div>
{type === 'textarea' ? (
              <textarea
                {...inputProps}
                className={`form-input resize-none h-24 ${hasError ? 'border-red-300 focus:border-red-500' : ''}`}
              />
            ) : (
              <Input {...inputProps} hasError={hasError} />
            )}
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
          </div>
        )
      }
      
      export default FormField