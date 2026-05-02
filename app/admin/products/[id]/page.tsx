import FormCheckbox from "@/components/form/FormCheckbox";
import FormContainer from "@/components/form/FormContainer";
import FormImageInputContainer from "@/components/form/FormImageInputContainer";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import SubmitButton from "@/components/form/SubmitButton";
import SectionTitle from "@/components/global/SectionTitle";
import { FieldGroup } from "@/components/ui/field";
import { fetchSingleProduct, updateProduct } from "@/utils/actions";

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const {id} = await params;
  const product = await fetchSingleProduct(id);
  console.log('admin single product: ', product);

  return (
    <section>
      <SectionTitle title="Update Product" />

      <FormContainer actionFn={updateProduct} className="mt-5">
        <input type="hidden" name="id" value={id} />

        <FieldGroup>
          <FieldGroup className="grid grid-cols-2 grid-rows-[repeat(2_auto)] items-end">
            <FormInput label="Product Name" name="name" type="text" defaultValue={product.name}/>
            <FormInput label="Company" name="company" type="text" defaultValue={product.company}/>
            <FormInput label="Price ($)" name="price" type="number" defaultValue={product.price}/>
            <FormImageInputContainer label="Image" name="image" initImagePath={product.image} />
          </FieldGroup>

          <FormTextarea name="description" label="Product Description" defaultValue={product.description} />
          <FormCheckbox name="featured" label="Featured" defaultValue={product.featured}/>
        </FieldGroup>

        <SubmitButton text="Update Product"/>
      </FormContainer>
    </section>
  )
}
export default EditProduct