import * as mdxComponents from '@/components/mdx'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // @ts-ignore
  return {
    ...mdxComponents,
    ...components,
  }
}
