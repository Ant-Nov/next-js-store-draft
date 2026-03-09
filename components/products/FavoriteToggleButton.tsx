'use client'

import { Button } from "../ui/button"
import { FaHeart } from "react-icons/fa";

const FavoriteToggleButton = ({ productId }: { productId: string }) => {
  return (
    <Button size="icon" variant="outline" onClick={() => console.log('productId: ', productId)}>
      <FaHeart />
    </Button>
  )
}
export default FavoriteToggleButton