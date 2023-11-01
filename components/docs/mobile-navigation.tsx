import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Navigation, useMobileOpenStore } from './navigation'

export const MobileNavigation = () => {
  const { setMobileOpen, mobileOpen } = useMobileOpenStore()
  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger>
        <HamburgerMenuIcon className='w-6 h-6' />
      </SheetTrigger>
      <SheetContent>
        <Navigation className='lg:mt-10 lg:block' />
      </SheetContent>
    </Sheet>
  )
}
