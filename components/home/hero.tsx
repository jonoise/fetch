'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const colors = {
  default: {
    blob: 'bg-emerald-500',
    text: { left: 'from-emerald-500', right: 'to-yellow-300' },
  },
  available: {
    blob: 'bg-red-500',
    text: { left: 'from-red-500', right: 'to-red-300' },
  },
  open: {
    blob: 'bg-yellow-500',
    text: { left: 'from-yellow-500', right: 'to-orange-200' },
  },
  free: {
    blob: 'bg-purple-500',
    text: { left: 'from-blue-500', right: 'to-blue-300' },
  },
}
export const HomeHero = () => {
  const [currentColor, setCurrentColor] = useState(colors.default)

  return (
    <section className='relative z-10 py-20 w-full text-center'>
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px] transition ease-out duration-300',
          currentColor && currentColor.blob
        )}
      ></div>
      <h1
        className={cn(
          `inline-flex flex-col gap-1 transition font-display text-6xl font-bold leading-none md:text-[8rem] bg-gradient-to-r from-20% bg-clip-text text-transparent`,
          currentColor && `${currentColor.text.left} ${currentColor.text.right}`
        )}
      >
        <span>Software</span>
        <span>para PYMES</span>
      </h1>

      <div className='my-20 grid lg:grid-cols-3 gap-5 px-4'>
        {features.map((feat) => (
          <div
            className='group/hero-product relative space-y-4 flex flex-col items-center p-6 md:p-8 cursor-default bg-white/5 backdrop-blur transition rounded-lg first:rounded-t-3xl last:rounded-b-3xl md:first:rounded-t-lg md:last:rounded-b-lg md:first:!rounded-l-4xl md:last:!rounded-r-4xl hover:scale-[1.02] hover:bg-white/10'
            key={feat.id}
            onMouseEnter={() => {
              setCurrentColor(colors[feat.key as keyof typeof colors])
            }}
            onMouseLeave={() => setCurrentColor(colors.default)}
          >
            {feat.disabled && (
              <div className='absolute top-3 right-4 text-xs px-2 py-0.5 bg-red-500 rounded-full'>
                En progreso
              </div>
            )}
            <h2 className='text-xl font-bold'>{feat.title}</h2>
            <p className=''>{feat.description}</p>
            <div>
              <Link href={feat.href}>
                <Button disabled={feat.disabled} className='w-fit'>
                  <span>{feat.cta}</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className='flex flex-col space-y-5 items-center'>
        <p className='text-muted-foreground'>Somos el equipo detrás de </p>
        <div className='flex space-x-10 items-center'>
          <Link
            href={'https://bando.tienda'}
            className='flex space-x-2 items-center opacity-80 hover:opacity-100 transition duration-300 ease-out'
          >
            <Image
              src={`/static/bando-b.svg`}
              width={40}
              height={40}
              alt='Bando Logo'
            />
            <h4 className='text-xl'>Bando</h4>
          </Link>
          <Link
            href={'https://getlumify.com'}
            className='flex space-x-2 items-center opacity-80 hover:opacity-100 transition duration-300 ease-out'
          >
            <h1 className='text-4xl font-bold'>L</h1>
            <h4 className='text-xl'>Lumify</h4>
          </Link>
        </div>
      </div> */}
    </section>
  )
}

const features = [
  {
    id: 1,
    title: 'Territorios API',
    description: 'Información sobre la codificación territorial de Costa Rica.',
    cta: 'Ver Documentación',
    href: 'https://territorios.fetchcr.com/docs',
    key: 'available',
  },
  {
    id: 2,
    title: 'Comprobantes API',
    description: 'La forma más fácil de firmar comprobantes electrónicos.',
    cta: 'Ver Documentación',
    href: '#',
    key: 'open',
    disabled: true,
  },
  {
    id: 3,
    title: 'Mensajes API',
    description: 'Envía mensajes de texto a tus clientes de forma sencilla.',
    cta: 'Ver Documentación',
    href: '#',
    key: 'free',
    disabled: true,
  },
]
