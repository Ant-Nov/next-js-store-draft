"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserIcon from "./UserIcon"

import { VscListSelection } from "react-icons/vsc";
import { links } from "@/utils/link"
import Link from "next/link"
import SignOutLink from "./SignOutLink"
import { Show, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

const LinksDropdown = () => {
  const isAdmin = useUser().user?.publicMetadata?.role === 'admin'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4">
          <VscListSelection className="size-5"/>
          <UserIcon/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Show when="signed-out">
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full capitalize text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator/>

          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full capitalize text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>

        <Show when="signed-in">
          {
            links.map(item =>
              item.label !== 'dashboard' || isAdmin
                ? (
                  <DropdownMenuItem key={item.label}>
                    <Link href={item.href} className="capitalize w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
                : null
            )
          }

          <DropdownMenuSeparator/>

          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown