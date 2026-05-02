'use client';

import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { LuShare2 } from "react-icons/lu";
import { XShareButton, XIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

const ShareButton = ({ productId }: { productId: string; }) => {
  const shareLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${productId}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size='icon'>
          <LuShare2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="flex items-center gap-x-2 w-auto">
        <XShareButton url={shareLink}>
          <XIcon size={32} round />
        </XShareButton>

        <LinkedinShareButton url={shareLink}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton url={shareLink}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton