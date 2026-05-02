import { PropsWithChildren } from "react";

export interface ActionResult {
  success: boolean;
  message: string;
}

export type FormProps = PropsWithChildren<{
  actionFn: (initState: ActionResult, formData: FormData) => Promise<ActionResult>;
  className?: string;
}>

