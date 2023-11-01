'use client'

import React from 'react'
import { CodeGroup } from '@/components/docs/code-prev'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { TERRITORIOS_URL } from '@/lib/constants/global'

export const HomeRequest = () => {
  return (
    <section className='max-w-6xl w-full'>
      <h1 className='text-6xl text-center font-bold my-10'>
        SIMPLE E INTUITIVO
      </h1>
      <div className='flex flex-col lg:flex-row pt-10 px-5  lg:space-x-10'>
        <div className='flex-1 space-y-4 flex flex-col'>
          <h3 className='text-4xl'>Territorios API</h3>
          <p>
            Territorios es una API RESTful que provee información sobre la
            codificación territorial de Costa Rica.
          </p>
          <Link href={`${TERRITORIOS_URL}/docs`}>
            <Button className='w-fit'>Ver la documentación</Button>
          </Link>
          <div className='flex items-center justify-center flex-1'>
            <Image
              src={'/static/Union.png'}
              alt='Union'
              width={300}
              height={300}
              className='object-cover'
            />
          </div>
        </div>
        <div className='lg:max-w-lg w-full'>
          <CodeGroup
            title='Request'
            tag='GET'
            label='https://territorios.fetchcr.com/provincias'
            code='curl https://territorios.fetchcr.com/provincias'
          >
            {elements.map((element) => element)}
          </CodeGroup>
          <CodeGroup
            title='Response'
            code='curl https://territorios.fetchcr.com/provincias'
          >
            {React.createElement(
              'pre',
              { key: '3', language: 'json' },
              JSON.stringify(
                [
                  {
                    value: '1',
                    label: 'San José',
                  },
                  {
                    value: '2',
                    label: 'Alajuela',
                  },
                  {
                    value: '3',
                    label: 'Cartago',
                  },
                  '...',
                ],
                null,
                2
              )
            )}
          </CodeGroup>
        </div>
      </div>
    </section>
  )
}
const elements = [
  React.createElement(
    'pre',
    { key: '1', title: 'cURL', language: 'bash' },
    `curl https://territorios.fetchcr.com/provincias`
  ),
  React.createElement(
    'pre',
    { key: '2', title: 'Node', language: 'js' },
    `const res = await fetch('https://territorios.fetchcr.com/provincias')\n\nconst data = await res.json()`
  ),
]
