import SectionTitle from "@/components/global/SectionTitle"
import OrdersList from "@/components/orders/OrdersList";
import { getUserOrders } from "@/utils/actions"

const Orders = async () => {
  const orders = await getUserOrders();

  if (!orders.length) return <h2>There are no orders</h2>

  return (
    <div>
      <SectionTitle title="Your Orders" />
      <OrdersList orders={orders} isSalesPage={false} />
    </div>
  )
}
export default Orders