import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils"


type Props ={
  name: string
  label: string // ✅ Fixed typo: "lable" → "label"
  placeholder?: string
  value?: string | number
  error?: string | undefined  // ✅ Single error string (client or server combined before passing)
  required?: boolean
  type?: string
  onChangeEvent: (value: string) => void // ✅ Accepts the new value
  className?: string // ✅ Optional for extra styling

}  & React.InputHTMLAttributes<HTMLInputElement>;

function FormField({
    name,
    label,
    placeholder,
    value,
    error,
    required,
    type = "text",
    onChangeEvent,
    className,
    ...props // ✅ For any extra Input props (e.g., disabled, autoComplete, etc.)
} : Props) {
  return (
<div  className={"flex flex-col space-y-2 "}>
        <Label htmlFor={name}>
            {label} {required && <span className="text-red-400">*</span>}
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeEvent(e.target.value)}

          className={cn(
          "py-5",
          error && "border-red-500", // ✅ Use the error prop you received
          className // ✅ Merge custom className
        )}
        {...props}
        />
            {error && (
            <p className="text-sm text-red-400 ms-6 font-bold">
            {error}
            </p>
            )}
      </div>
  )
}
export default FormField
