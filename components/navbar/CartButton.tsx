import Link from "next/link"
import { Button } from "../ui/button"
import { TiShoppingCart } from "react-icons/ti";
import { fetchCartItemsNumber } from "@/utils/actions";

const CartButton = async () => {
  const cartItemsNum = await fetchCartItemsNumber();

  return (
    <Button asChild size="icon" variant="ghost" className="relative">
      <Link href="/cart">
        <span
          className="absolute rounded-full bg-primary text-white h-4 w-4 right-0 top-0 text-[10px] flex items-center justify-center"
        >{ cartItemsNum }</span>

        <TiShoppingCart className="size-6" />
      </Link>
    </Button>
  )
}
export default CartButton