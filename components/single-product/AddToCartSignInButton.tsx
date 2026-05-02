import { SignInButton } from "@clerk/nextjs"
import { Button } from "../ui/button"

const AddToCartSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button>Add To Cart</Button>
    </SignInButton>
  )
}
export default AddToCartSignInButton