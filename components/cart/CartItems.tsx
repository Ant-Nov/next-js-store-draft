'use client';

import { CartItem, Product } from "@prisma/client";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import AmountSelect from "../single-product/AmountSelect";
import { formatCurrency } from "@/utils/format";
import { removeCartItem, updateCartItem } from "@/utils/actions";
import { toast } from "sonner";
import FormContainer from "../form/FormContainer";
import SubmitButton from "../form/SubmitButton";

const CartItems = ({ cartItems }: { cartItems: (CartItem & { product: Product })[] }) => {
  const updateCartItemFn = async (cartItemId: string,amount: string) => {
    try {
      await updateCartItem(cartItemId, amount)

      toast.success('Cart item has been successfully updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'There was an error...')
    }
  };

  return (
    <div className="grid gap-y-5">
      {
        cartItems.map(item => (
          <Card key={item.id} className="p-5 flex lg:flex-row gap-x-5">
            <div className="h-64 lg:h-35 lg:w-35 relative overflow-hidden rounded">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grow flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-5 sm:mb-0 flex-1">
                <CardTitle className="capitalize mb-4">{item.product.name}</CardTitle>
                <CardDescription>{item.product.company}</CardDescription>
              </div>

              <FormContainer actionFn={async () => await removeCartItem(item.id)} className="flex-1">
                <AmountSelect
                  defaultValue={String(item.amount)}
                  updateAmountFn={
                    async (amount: string) => await updateCartItemFn(item.id, amount)
                  }
                />

                <SubmitButton text="Remove" />
              </FormContainer>

              <p className="mt-5 sm:mt-0">{ formatCurrency(item.product.price) }</p>
            </div>
          </Card>
        ))
      }
    </div>
  )
}
export default CartItems;