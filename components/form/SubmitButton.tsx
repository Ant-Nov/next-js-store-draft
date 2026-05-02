'use client'

import { cn } from "@/lib/utils"
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text, className }: { text: string; className?: string; }) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className={cn("mt-5", className)} disabled={pending}>
      {
        pending
          ? <>
            <Spinner data-icon="inline-start" />
            Please wait...
          </>
          : text
      }
    </Button>
  )
}
export default SubmitButton