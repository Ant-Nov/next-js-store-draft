'use client';

import { Field, FieldLabel } from "../ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
  defaultValue?: string;
  updateAmountFn?: (value: string) => Promise<void>;
};

const AmountSelect = ({ defaultValue = '1', updateAmountFn }: Props) => {
  const amounts = Array.from({ length: 10 }, (_, i) => i + 1)

  const handleValueChange = (value: string) => {
    if (updateAmountFn) updateAmountFn(value);
  }

  return (
    <Field className="max-w-32">
      <FieldLabel>Amount:</FieldLabel>

      <Select name="amount" defaultValue={defaultValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue/>
        </SelectTrigger>

        <SelectContent position="popper">
          <SelectGroup>
            {
              amounts.map(value => (
                <SelectItem key={value} value={`${value}`}>
                  {value}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
export default AmountSelect