import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{ className?: string; }>;

const Container = ({ className, children }: Props) => {
  return (
    <div className={cn('px-5 xl:px-0 max-w-6xl mx-auto', className)}>
      {children}
    </div>
  )
}
export default Container