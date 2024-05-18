"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  onSelect?: () => void;
  emptyState: string;
  form: any;
}

const SearchableSelect = ({ control, name, label, placeholder, id, data, onSelect, emptyState, form }: CustomInput) => {

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // })

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="form-label">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "flex justify-between border-gray-300 rounded-2xl py-6",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.find(
                      (item) => item.value === field.value
                    )?.name
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                <CommandEmpty>{emptyState}</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      value={item.value}
                      key={item.id}
                      onSelect={() => {
                        form.setValue("receiver", item.value)
                      }}
                      className=""
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="form-message mt-2" />
        </FormItem>
      )}
    />
  )
}

export default SearchableSelect