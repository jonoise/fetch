'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { motion } from 'framer-motion'

import { SectionProvider } from '../docs/section-provider'
import { withoutFirstPath } from '@/lib/utils'
import { Header } from '../docs/header'
import { Navigation } from '../docs/navigation'
import { Globe } from 'lucide-react'
import { MobileNavigation } from '../docs/mobile-navigation'

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<any>>
}) {
  let pathname = usePathname()

  pathname = pathname === '/docs' ? '/' : pathname.replace('/docs', '')

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className='h-full lg:ml-72 xl:ml-80'>
        <motion.header
          layoutScroll
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'
        >
          <div className='contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80'>
            <div className='hidden lg:flex'>
              <Link href={'/docs'} className='flex items-center space-x-2'>
                <Globe />
                <p>Fetch - Territorios API</p>
              </Link>
            </div>
            <Header className='bg-background' />
            <Navigation className='hidden lg:mt-10 lg:block' />
          </div>
        </motion.header>
        <div className='relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8'>
          <main className='flex-auto'>{children}</main>
          {/* <Footer /> */}
        </div>
      </div>
    </SectionProvider>
  )
}
