import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { Info } from 'lucide-react'
import Link from 'next/link'

export { CodeGroup, Pre as pre, Code as code } from '@/components/docs/code'
export const a = Link

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2'>
      {children}
    </div>
  )
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24'
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className='my-6'>
      <ul
        role='list'
        className='m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5'
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className='m-0 px-0 py-4 first:pt-0 last:pb-0'>
      <dl className='m-0 flex flex-wrap items-center gap-x-3 gap-y-2'>
        <dt className='sr-only'>Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className='sr-only'>Type</dt>
            <dd className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>
              {type}
            </dd>
          </>
        )}
        <dt className='sr-only'>Description</dt>
        <dd className='w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0'>
          {children}
        </dd>
      </dl>
    </li>
  )
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 16 16' aria-hidden='true' {...props}>
      <circle cx='8' cy='8' r='8' strokeWidth='0' />
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M6.75 7.75h1.5v3.5'
      />
      <circle cx='8' cy='4' r='.5' fill='none' />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className='my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]'>
      <Info className='mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200' />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>
        {children}
      </div>
    </div>
  )
}

export const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant?: string
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mx-2',
        variant === 'success' && 'bg-emerald-200 text-emerald-800',
        variant === 'warning' && 'bg-amber-200 text-amber-800',
        !variant &&
          `bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100`
      )}
    >
      {children}
    </span>
  )
}

export const Button = ({
  children,
  variant,
  ...props
}: {
  children: React.ReactNode
  variant?: string
} & React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition',
        variant === 'primary' &&
          'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600',
        variant === 'secondary' &&
          'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700',
        !variant &&
          'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
