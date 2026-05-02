import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface FormInputProps {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
}

const FormTextarea = ({ label, name, required, defaultValue }: FormInputProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea id={name} name={name} defaultValue={defaultValue} required={!!required} />
    </Field>
  )
}
export default FormTextarea