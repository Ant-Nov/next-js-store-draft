import SectionTitle from "@/components/global/SectionTitle";
import Sidebar from "./Sidebar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SectionTitle title="Dashboard" />

      <div className="flex gap-5 mt-5">
        <Sidebar />

        <div className="grow">
          {children}
        </div>
      </div>
    </>
  )
}
export default AdminLayout