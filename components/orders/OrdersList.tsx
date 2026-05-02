import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/utils/format";
import { Order } from "@prisma/client";

const OrdersList = ({ orders, isSalesPage }: { orders: Order[], isSalesPage: boolean }) => {
  return (
    <div>
      <Table>
        <TableCaption>Total Orders: {orders?.length}</TableCaption>

        <TableHeader>
          <TableRow>
            {isSalesPage && <TableHead>Email</TableHead>}
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              {isSalesPage && <TableCell>{ order.email }</TableCell>}
              <TableCell>{ order.products }</TableCell>
              <TableCell>{ formatCurrency(order.orderTotal) }</TableCell>
              <TableCell>{formatCurrency(order.tax)}</TableCell>
              <TableCell>{formatCurrency(order.shipping)}</TableCell>
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default OrdersList