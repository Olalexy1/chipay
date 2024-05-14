import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  inputType?: string;
  autoComplete?: string;
  id?: string;
  rightIcon?: React.ReactElement<any, string> | null;
  onRightIconClick?: () => void;
}

const CustomInput = ({ control, name, label, placeholder, inputType, autoComplete, id, rightIcon, onRightIconClick }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item w-full">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <div className='flex border-[1px] border-gray-300 rounded-2xl p-1'>
              <FormControl>
                <Input
                  id={id}
                  placeholder={placeholder}
                  className="input-class"
                  type={inputType}
                  autoComplete={autoComplete}
                  {...field}
                />
              </FormControl>
              {rightIcon && (
                <div onClick={onRightIconClick} className="cursor-pointer flex items-center justify-center px-3">
                  {rightIcon}
                </div>
              )}
            </div>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput