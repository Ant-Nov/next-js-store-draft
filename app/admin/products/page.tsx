import FormContainer from "@/components/form/FormContainer";
import IconButton from "@/components/form/IconButton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProduct, fetchAdminProducts } from "@/utils/actions"
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

const Products = async () => {
  const myProducts = await fetchAdminProducts();

  if (!myProducts.length) return <h2>No items found</h2>

  return (
    <div>
      <Table>
        <TableCaption>Total Products: {myProducts?.length}</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {myProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <Link href={`/products/${product.id}`} className="underline text-muted-foreground">
                  {product.name}
                </Link>
              </TableCell>

              <TableCell>{product.company}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>

              <TableCell className="flex items-center gap-x-2.5">
                <Link href={`/admin/products/${product.id}/`}>
                  <IconButton actionType="edit" />
                </Link>

                <FormContainer actionFn={deleteProduct.bind(null, product.id)}>
                  <IconButton actionType="delete" />
                </FormContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default Products