import { SignInButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { FaRegHeart } from "react-icons/fa"

export const FavoriteSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button variant='outline' size='icon'>
        <FaRegHeart/>
      </Button>
    </SignInButton>
  )
}
