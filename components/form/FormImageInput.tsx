import { ChangeEvent } from "react";
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

interface FormImageInputProps {
  label: string;
  name: string;
  required?: boolean;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

const FormImageInput = ({ name, label, required = true, handleFileChange }: FormImageInputProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input id={name} name={name} type="file" required={required} accept="image/*" onChange={handleFileChange} />
    </Field>
  )
}
export default FormImageInput