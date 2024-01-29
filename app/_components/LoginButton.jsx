import Link from 'next/link'
import React from 'react'

const LoginButton = ({text}) => {
  return (
    <Link href={'https://auth-testing-mu.vercel.app/login'}>
    <button className='px-4 py-2 bg-slate-500 text-white font-semibold text-lg rounded-lg shadow-xl'>{text}</button>
    </Link>
  )
}

export default LoginButton