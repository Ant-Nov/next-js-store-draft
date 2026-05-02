import { Checkbox } from "../ui/checkbox";
import { Field, FieldLabel } from "../ui/field";

interface FormCheckboxProps {
  label: string;
  name: string;
  orientation?: "vertical" | "horizontal" | "responsive" | null | undefined;
  defaultValue?: boolean;
}

const FormCheckbox = ({ label, name, orientation = 'horizontal', defaultValue = false }: FormCheckboxProps) => {
  return (
    <Field orientation={orientation}>
      <Checkbox id={name} name={name} defaultChecked={defaultValue}/>
      <FieldLabel htmlFor={name} className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50">{label}</FieldLabel>
    </Field>
  )
}
export default FormCheckbox