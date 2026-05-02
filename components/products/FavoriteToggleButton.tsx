'use client'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button"
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Spinner } from "../ui/spinner";

const FavoriteToggleButton = ({ isInFavourites }: { isInFavourites: boolean; }) => {
  const { pending } = useFormStatus();

  return (
    <Button size="icon" variant="outline" disabled={pending}>
      {
        pending ? <Spinner data-icon="inline-start" />
          : isInFavourites ? <FaHeart />
          : <FaRegHeart />
      }
    </Button>
  )
}
export default FavoriteToggleButton