import nextMDX from '@next/mdx'
import { recmaPlugins } from './lib/mdx/recma.mjs'
import { rehypePlugins } from './lib/mdx/rehype.mjs'
import { remarkPlugins } from './lib/mdx/remark.mjs'
import withSearch from './lib/mdx/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

const withMDX = nextMDX({
  options: { recmaPlugins, remarkPlugins, rehypePlugins },
})

export default withSearch(withMDX(nextConfig))
