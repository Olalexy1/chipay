"use client"

import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator
} from "@/components/ui/select"

import { Control, FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('transfer')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    id?: string;
    data: any[];
}

const SelectInput = ({ control, name, label, placeholder, data, id }: CustomInput) => {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item w-full">
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <Select onValueChange={value => field.onChange({
                        target: {
                            name: field.name,
                            value,
                        },
                    })}>
                        <FormControl>
                            <SelectTrigger className="flex border-[1px] border-gray-300 rounded-2xl placeholder:text-gray-500">
                                <SelectValue placeholder={placeholder} className="placeholder:text-gray-500 text-16 outline-none" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full bg-white py-3">
                            {
                                data?.map((item) => (

                                    <SelectItem
                                        id={id}
                                        className="cursor-pointer border-b text-16 outline-none text-gray-900"
                                        key={item.id}
                                        value={item.value}>
                                        {item.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <FormMessage className="form-message mt-2" />
                </div>
            )}
        />
    )
}

export default SelectInput
