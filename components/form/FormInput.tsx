import { HTMLInputTypeAttribute } from "react";
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

interface FormInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  defaultValue?: any;
}

const FormInput = ({ name, type, defaultValue, label }: FormInputProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input id={name} name={name} type={type} min={0} required  defaultValue={defaultValue}/>
    </Field>
  )
}
export default FormInput