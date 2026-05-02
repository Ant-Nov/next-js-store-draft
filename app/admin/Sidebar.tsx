'use client';

import { adminLinks } from '@/utils/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className='flex flex-col items-center'>
      {
        adminLinks.map(link => (
          <Button key={link.label} asChild variant={link.href === path ? "default" : "ghost"}>
            <Link href={link.href} className='capitalize w-full'>{link.label}</Link>
          </Button>
        ))
      }
    </aside>
  )
}
export default Sidebar