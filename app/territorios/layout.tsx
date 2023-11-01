import { Layout } from '@/components/territorios/layout'
import glob from 'fast-glob'
import { Metadata } from 'next'
import React, { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - API Territorios',
    default: 'Fetch: APIs Para Costa Rica',
  },
  description:
    'Una API para acceder a la codificación geográfica de Costa Rica.',
}

const TerritoriosLayout: FC<PropsWithChildren> = async (props) => {
  let pages = await glob('**/*.mdx', { cwd: 'app/territorios/docs' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./docs/${filename}`)).sections,
    ])
  )) as Array<[string, Array<any>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <Layout allSections={allSections}>
      <article className='flex h-full flex-col pb-10 pt-16 '>
        <div className='prose dark:prose-invert flex-auto'>
          {props.children}
        </div>
      </article>
    </Layout>
  )
}

export default TerritoriosLayout
