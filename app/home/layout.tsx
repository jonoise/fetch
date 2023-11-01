import { TERRITORIOS_URL } from '@/lib/constants/global'
import { GithubIcon, Globe } from 'lucide-react'
import Link from 'next/link'
import React, { FC, PropsWithChildren } from 'react'

const HomeLayout: FC<PropsWithChildren> = (props) => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <header className='flex justify-between items-center max-w-6xl w-full my-10 px-4'>
        <Link href={'/'} className='flex items-center space-x-2'>
          <Globe />
          <p>Fetch</p>
        </Link>
        <div>
          <Link href={`${TERRITORIOS_URL}/docs`}>Docs</Link>
        </div>
      </header>
      {props.children}
    </div>
  )
}

export default HomeLayout
