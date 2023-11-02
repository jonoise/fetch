import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search } from './search'
import { Button } from '../ui/button'
import { TERRITORIOS_URL, fullHost } from '@/lib/constants/global'
import { Globe } from 'lucide-react'
import { MobileNavigation } from './mobile-navigation'

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className='text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  { className?: string }
>(function Header({ className }, ref) {
  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between md:gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80'
      )}
    >
      <div className={clsx('absolute inset-x-0 top-full h-px transition')} />
      <Search />
      <div className='flex md:hidden justify-between items-center w-full'>
        <Link href={'/docs'} className='flex items-center space-x-2'>
          <Globe />
          <p>Fetch - Territorios API</p>
        </Link>
        <MobileNavigation />
      </div>
      <div className='flex items-center gap-5'>
        <nav className='hidden md:block'>
          <ul role='list' className='flex items-center gap-8'>
            <TopLevelNavItem href={`/docs/todos`}>API</TopLevelNavItem>
            <TopLevelNavItem href='/docs'>Documentación</TopLevelNavItem>
            <TopLevelNavItem href='https://github.com/fetchcr'>
              Github
            </TopLevelNavItem>
            <TopLevelNavItem href={fullHost}>Fetch</TopLevelNavItem>
          </ul>
        </nav>
        <div className='hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15' />
        <div className='flex gap-4'>
          {/* <MobileSearch />
          <ThemeToggle /> */}
        </div>
      </div>
    </motion.div>
  )
})
