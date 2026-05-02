import FormCheckbox from "@/components/form/FormCheckbox"
import FormContainer from "@/components/form/FormContainer"
import FormImageInput from "@/components/form/FormImageInput"
import FormInput from "@/components/form/FormInput"
import FormTextarea from "@/components/form/FormTextarea"
import SubmitButton from "@/components/form/SubmitButton"
import SectionTitle from "@/components/global/SectionTitle"
import { FieldGroup } from "@/components/ui/field"
import { createProduct } from "@/utils/actions"
import { faker } from '@faker-js/faker';

const CreateProduct = () => {
  const productName = faker.commerce.product();
  const companyName = faker.company.name();
  const price = Math.round(+faker.commerce.price());
  const description = faker.lorem.paragraph(3);

  return (
    <section>
      <SectionTitle title="Create Product" />

      <FormContainer actionFn={createProduct} className="mt-5">
        <FieldGroup>
          <FieldGroup className="grid grid-cols-2 grid-rows-2">
            <FormInput label="Product Name" name="name" type="text" defaultValue={productName}/>
            <FormInput label="Company" name="company" type="text" defaultValue={companyName}/>
            <FormInput label="Price ($)" name="price" type="number" defaultValue={price}/>
            <FormImageInput label="Image" name="image" />
          </FieldGroup>

          <FormTextarea name="description" label="Product Description" defaultValue={description} />
          <FormCheckbox name="featured" label="Featured" />
        </FieldGroup>

        <SubmitButton text="Create Product"/>
      </FormContainer>
    </section>
  )
}
export default CreateProduct