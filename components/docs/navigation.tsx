'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { useSectionStore } from './section-provider'
import { Tag } from '@/components/docs/tag'
import { remToPx, withoutFirstPath } from '@/lib/utils'

import { create } from 'zustand'
import { fullHost } from '@/lib/constants/global'

export const useMobileOpenStore = create<{
  mobileOpen: boolean
  setMobileOpen: (mobileOpen: boolean) => void
}>((set) => ({
  mobileOpen: false,
  setMobileOpen: (mobileOpen: boolean) => set({ mobileOpen }),
}))

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <li className='md:hidden'>
      <Link
        href={href}
        className='block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  const { setMobileOpen } = useMobileOpenStore((s) => s)
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      )}
      onClick={() => setMobileOpen(false)}
    >
      <span className='truncate'>{children}</span>
      {tag && (
        <Tag variant='small' color='zinc'>
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    false
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className='absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5'
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className='absolute left-2 h-6 w-px bg-emerald-500'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = false
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  pathname = withoutFirstPath(pathname)

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout='position'
        className='text-xs font-semibold text-zinc-900 dark:text-white'
      >
        {group.title}
      </motion.h2>
      <div className='relative mt-3 pl-2'>
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className='absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5'
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role='list' className='border-l border-transparent'>
          {group.links.map((link) => (
            <motion.li key={link.href} layout='position' className='relative'>
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode='popLayout' initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role='list'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation: Array<any> = [
  {
    title: 'Guías',
    links: [
      { title: 'Introducción', href: '/docs' },
      { title: 'Quickstart', href: '/docs/quickstart' },
      // { title: 'SDKs', href: '/sdks' },
      // { title: 'Authentication', href: '/authentication' },
      // { title: 'Pagination', href: '/pagination' },
      { title: 'Errores', href: '/docs/errors' },
      // { title: 'Webhooks', href: '/webhooks' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { title: 'Todos', href: '/docs/todos' },
      { title: 'Provincias', href: '/docs/provincias' },
      { title: 'Cantones', href: '/docs/cantones' },
      { title: 'Distritos', href: '/docs/distritos' },
      // { title: 'Zip', href: '/docs/zip' },
    ],
  },
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const { setMobileOpen } = useMobileOpenStore()

  return (
    <nav {...props}>
      <ul role='list'>
        <TopLevelNavItem
          onClick={() => setMobileOpen(false)}
          href='/docs/todos'
        >
          API
        </TopLevelNavItem>
        <TopLevelNavItem onClick={() => setMobileOpen(false)} href='/docs'>
          Documentación
        </TopLevelNavItem>
        <TopLevelNavItem href={`https://github.com/fetchcr`}>
          Github
        </TopLevelNavItem>
        <TopLevelNavItem href={fullHost}>Fetch</TopLevelNavItem>

        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
