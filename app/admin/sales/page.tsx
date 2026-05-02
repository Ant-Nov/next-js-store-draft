import OrdersList from "@/components/orders/OrdersList";
import { getAllOrders } from "@/utils/actions"

const SalesPage = async () => {
  const orders = await getAllOrders();

  if (!orders?.length) return <h2>There are no orders</h2>

  return (
    <OrdersList orders={orders} isSalesPage={true} />
  )
}
export default SalesPage