"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserIcon from "./UserIcon"

import { VscListSelection } from "react-icons/vsc";
import { links } from "@/utils/link"
import Link from "next/link"


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
        {
          links.map(item => (
            <DropdownMenuItem key={item.label}>
              <Link href={item.href} className="capitalize">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown