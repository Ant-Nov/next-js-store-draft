import CartItems from "@/components/cart/CartItems"
import CartTotal from "@/components/cart/CartTotal"
import FormContainer from "@/components/form/FormContainer"
import SubmitButton from "@/components/form/SubmitButton"
import SectionTitle from "@/components/global/SectionTitle"
import { fetchOrCreateCart, getCartItems, createOrder } from "@/utils/actions"

const Cart = async () => {
  const cart = await fetchOrCreateCart();
  const cartItems = await getCartItems(cart.id);
  const createOrderWithCart = createOrder.bind(null, cart);

  return (
    <div>
      <SectionTitle title="Shopping Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] mt-8 gap-8 items-start">
        {
          !cartItems?.length
            ? <p>No items exist...</p>
            : <>
              <FormContainer className="lg:order-2" actionFn={createOrderWithCart}>
                <CartTotal cart={cart} />
                <SubmitButton text="Place Order" className="w-full" />
              </FormContainer>

              <CartItems cartItems={cartItems} />
            </>
        }
      </div>
    </div>
  )
}
export default Cart