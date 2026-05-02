import SectionTitle from "@/components/global/SectionTitle"
import { PropsWithChildren } from "react"

export default function layout ({ children }: { children: PropsWithChildren }) {
  return (
    <>
      <SectionTitle title="My Reviews" />
      {children}
    </>
  )
}
