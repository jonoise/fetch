import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function remToPx(remValue: number) {
  let rootFontSize =
    typeof window === 'undefined'
      ? 16
      : parseFloat(window.getComputedStyle(document.documentElement).fontSize)

  return remValue * rootFontSize
}

export const withoutFirstPath = (path: string) => {
  const pathArray = path.split('/')
  pathArray.shift()
  return '/' + pathArray.join('/')
}
