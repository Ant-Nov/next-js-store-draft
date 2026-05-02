"use client"

import { Input } from "../ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.replace(`?${params.toString()}`)
  }
  
  const debounced = useDebouncedCallback(setSearch,300);

  return (
    <Input type="search" placeholder="search items..." className="max-w-xs dark:bg-muted" onChange={(e) => debounced(e.target.value)}/>
  )
}
export default NavSearch