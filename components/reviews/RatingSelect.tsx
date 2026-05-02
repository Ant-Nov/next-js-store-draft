import { Field, FieldLabel } from "../ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const RatingSelect = () => {
  const ratingValues = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <Field className="mb-5">
      <FieldLabel>Rating</FieldLabel>

      <Select name="rating">
        <SelectTrigger>
          <SelectValue placeholder='Select rating' />
        </SelectTrigger>

        <SelectContent position="popper">
          <SelectGroup>
            {
              ratingValues.map(value => <SelectItem key={value} value={`${value}`}>{value}</SelectItem>)
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
export default RatingSelect