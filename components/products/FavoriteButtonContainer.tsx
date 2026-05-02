'use client'

import { Favorite } from "@prisma/client";
import { toggleFavourites } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import FavoriteToggleButton from "./FavoriteToggleButton"
import { usePathname } from "next/navigation";

export const FavoriteButtonContainer = ({ favourite, productId}: { favourite: Favorite  | null; productId: string }) => {
  const pathname = usePathname();
  const favouriteId = favourite?.id || null;

  const actionWithId = toggleFavourites.bind(null, { productId, favouriteId, pathname });

  return (
    <FormContainer actionFn={actionWithId}>
      <FavoriteToggleButton isInFavourites={!!favourite} />
    </FormContainer>
  )
}
