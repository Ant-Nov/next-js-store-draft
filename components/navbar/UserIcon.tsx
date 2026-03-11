import { useUser } from "@clerk/nextjs";
import { LuUser } from "react-icons/lu";

const UserIcon = () => {
  const { user } = useUser();
  const image = user?.imageUrl || '';

  if (!!image) {
    return <img
      src={image}
      alt={user?.firstName + ' ' + user?.lastName}
      className='w-6 h-6 rounded-full object-cover'
    />
  }

  return (
    <LuUser className='rounded-full size-6 text-white bg-primary' />
  )
}
export default UserIcon