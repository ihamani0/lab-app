

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LucideIcon } from 'lucide-react'


export type SelectOption = {
  id: string
  name: string,
  icon?: LucideIcon
}

// Props interface
export interface CustomSelectProps {
  options: SelectOption[]
value: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  groupLabel?: string // Optional group label (e.g., "Fruits")
  className?: string
  triggerClassName?: string
  contentClassName?: string
}



function SelectField({
    options = [],
    value,
    onValueChange,
    placeholder = 'Select an option',
    disabled = false,
    groupLabel,
    className = '',
    triggerClassName = '',
    contentClassName = '',
}: CustomSelectProps) {
  return (
    <div className={`my-6 ${className}`} >

    <Select value={value} onValueChange={onValueChange} disabled={disabled} >
        <SelectTrigger className={`w-full ${triggerClassName}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className={contentClassName}>
        {groupLabel ? (
          <SelectGroup>
            <SelectLabel>{groupLabel}</SelectLabel>
            {(options ?? []).map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                    {option.name}
                </SelectItem>
            ))}
          </SelectGroup>
        ) : (
          (options ?? []).map((option) => (
            <SelectItem key={option.id} value={option.id}>
                <div className="flex items-center gap-2">
                      {option.icon && <option.icon className="h-4 w-4" />}
                      {option.name}
                </div>
            </SelectItem>
          ))
        )}
      </SelectContent>


    </Select>
    </div>
  )
}
export default SelectField;
