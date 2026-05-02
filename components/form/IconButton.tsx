'use client';

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type ActionType = 'edit' | 'delete';

const IconButton = ({ actionType }: { actionType: ActionType; }) => {
  const { pending } = useFormStatus()

  return (
    <Button size="icon-lg" variant="ghost">
      {
        pending ? <Spinner data-icon="inline-start" />
          : actionType === 'edit' ? <FaEdit />
          : <RiDeleteBin6Line />
      }
    </Button>
  )
}
export default IconButton