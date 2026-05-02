import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { Cart } from "@prisma/client";

const CartTotal = ({ cart }: { cart: Cart }) => {
  const valuesArr = [
    { id: 1, title: 'Subtotal', value: cart.cartTotal},
    { id: 2, title: 'Shipping', value: cart.shipping },
    { id: 3, title: 'Tax', value: cart.tax },
    { id: 4, title: 'Order Total', value: cart.orderTotal }
  ];

  return (
    <div className="bg-neutral rounded-2xl p-7 border-2 border-secondary">
      {
        valuesArr.map((item, i) => (
          <p
            key={item.id}
            className={cn(
              "flex items-center justify-between text-sm text-neutral-content",
              i !== 3 && "py-2 border-b-2 border-b-secondary",
              i === 3 && "font-semibold pt-5"
            )}
          >
            <span>{item.title}</span> { formatCurrency(item.value) }
          </p>
        ))
      }
    </div>
  );
}
export default CartTotal;