'use client';

import { ActionResult, FormProps } from "@/interfaces";
import { useActionState, useEffect } from "react"
import { toast } from "sonner";

const initState: ActionResult = { success: false, message: '' };

const FormContainer = ({ children, actionFn, className }: FormProps) => {
  const [state, formAction] = useActionState(actionFn, initState)

  useEffect(() => {
    const msg = state?.message;

    if (!msg) return;

    if (state.success) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }, [state])

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  )
}
export default FormContainer