'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const LogoutButton = ({text}) => {
  return (
    <Link href={'/login'}>
    <button 
    onClick={signOut}
    className='px-4 py-2 bg-slate-500 text-white font-semibold text-lg rounded-lg shadow-xl'>{text}</button>
    </Link>
  )
}

export default LogoutButton