import { HomeHero } from '@/components/home/hero'
import React, { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { HomeRequest } from '@/components/home/request'

export default function Home() {
  return (
    <main className='w-full min-h-screen flex flex-col items-center '>
      <div className='w-full max-w-6xl overflow-x-hidden'>
        <HomeHero />
      </div>
      <HomeRequest />
    </main>
  )
}
