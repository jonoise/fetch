import Link from 'next/link'
import React from 'react'
import dayjs from 'dayjs'

const DocsFooter = () => {
  return (
    <div className='border-t px-6 lg:px-14 py-4 font-thin text-sm'>
      <p>
        Hecho en Costa Rica <span className='mx-2'>🇨🇷</span> por{' '}
        <Link
          href='https://fetchcr.com'
          className='text-emerald-300 underline font-normal'
        >
          Fetch
        </Link>{' '}
        - {dayjs().year()}.
      </p>
    </div>
  )
}

export default DocsFooter
