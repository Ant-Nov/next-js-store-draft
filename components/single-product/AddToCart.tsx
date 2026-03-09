import { addToCart } from "@/utils/actions";
import { Button } from "../ui/button"

const AddToCart = ({ productId }: { productId: string }) => {
  const addWithId = addToCart.bind(null, productId);

  return (
    <form action={addWithId}>
      <Button type="submit">Add To Cart</Button>
    </form>
  )
}
export default AddToCart