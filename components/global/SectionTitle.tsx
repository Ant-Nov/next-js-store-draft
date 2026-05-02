import { Separator } from "@/components/ui/separator"

const SectionTitle = ({ title }: { title: string; }) => {
  return (
    <>
      <h2 className="font-bold text-2xl mb-5 capitalize tracking-wide">{title}</h2>
      <Separator />
    </>
  )
}
export default SectionTitle