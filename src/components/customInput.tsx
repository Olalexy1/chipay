import React, { FocusEventHandler, forwardRef } from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema, updatePersonalInfoFormSchema, updatePasswordSchema, cn } from '@/lib/utils'

const authFormsSchema = authFormSchema('sign-up')

const updatePersonalFormSchema = updatePersonalInfoFormSchema()

const updatePasswordFormSchema = updatePasswordSchema()

interface CustomInputProps {
  authControl?: Control<z.infer<typeof authFormsSchema>>;
  authName?: FieldPath<z.infer<typeof authFormsSchema>>;
  infoUpdateControl?: Control<z.infer<typeof updatePersonalFormSchema>>;
  infoName?: FieldPath<z.infer<typeof updatePersonalFormSchema>>;
  passwordUpdateControl?: Control<z.infer<typeof updatePasswordFormSchema>>;
  passwordName?: FieldPath<z.infer<typeof updatePasswordFormSchema>>;
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
  schemaType: "auth" | "info" | "password";
  disabled?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({
  authControl,
  authName,
  infoUpdateControl,
  infoName,
  passwordUpdateControl,
  passwordName,
  label,
  placeholder,
  inputType,
  autoComplete,
  id,
  rightIcon,
  onRightIconClick,
  className,
  wrapperClassName,
  schemaType,
  disabled
}, ref) => {


  const getControl = () => {
    switch (schemaType) {
      case "auth":
        return authControl
      case "info":
        return infoUpdateControl
      case "password":
        return passwordUpdateControl
      default:
        return undefined
    }
  }


  return (
    <FormField
      control={getControl() as Control<z.infer<typeof authFormsSchema> | z.infer<typeof updatePersonalFormSchema> | z.infer<typeof updatePasswordFormSchema>>}
      name={schemaType === "auth" ? authName! : schemaType === "info" ? infoName! : passwordName!}
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
                  disabled={disabled}
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