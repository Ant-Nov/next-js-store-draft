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
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";

const LinksDropdown = () => {

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
            <SignInButton mode="modal" />
          </DropdownMenuItem>
          
          <DropdownMenuSeparator/>

          <DropdownMenuItem>
            <SignUpButton mode="modal" />
          </DropdownMenuItem>
        </Show>

        <Show when="signed-in">
          {
            links.map(item => (
              <DropdownMenuItem key={item.label}>
                <Link href={item.href} className="capitalize">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))
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