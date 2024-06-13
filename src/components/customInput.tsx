import React, { FocusEventHandler, forwardRef } from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema, cn } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  inputType?: string;
  autoComplete?: string;
  id?: string;
  rightIcon?: React.ReactElement<any, string> | null;
  onRightIconClick?: () => void;
  className?: string;
  wrapperClassName?: string;
  ref?: any;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({
  control,
  name,
  label,
  placeholder,
  inputType,
  autoComplete,
  id,
  rightIcon,
  onRightIconClick,
  className,
  wrapperClassName
}, ref) => {

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
            <div
              className={cn(
                "flex border-[1px] border-gray-300 rounded-2xl p-1 relative",
                wrapperClassName
              )}>
              <FormControl>
                <Input
                  id={id}
                  placeholder={placeholder}
                  className={cn(
                    "input-class",
                    className
                  )}
                  type={inputType}
                  autoComplete={autoComplete}
                  {...field}
                  ref={ref}
                />
              </FormControl>
              {rightIcon && (
                <div onClick={onRightIconClick} className="cursor-pointer flex items-center justify-center px-3 opacity-50">
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
});

CustomInput.displayName = "CustomInput"

export default CustomInput