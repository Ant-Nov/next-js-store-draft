import { getFavouriteProduct } from "@/utils/actions"
import { currentUser } from "@clerk/nextjs/server";
import { FavoriteSignInButton } from "./FavoriteSignInButton";
import { FavoriteButtonContainer } from "./FavoriteButtonContainer";

const FavoriteToggleForm = async ({ productId }: { productId: string; }) => {
  const user = await currentUser();

  if (!user) return (<FavoriteSignInButton />);

  const favourite = await getFavouriteProduct(productId);

  return (<FavoriteButtonContainer favourite={favourite} productId={productId} />)
}
export default FavoriteToggleForm