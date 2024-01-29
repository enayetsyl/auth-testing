import LoginForm from '@/app/_components/LoginForm'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Login = async() => {
  const session = await getServerSession(authOptions)

  console.log(session)
  // console.log(session?.status)
  if(session?.user){
    redirect('/')
  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-5'>Login</h1>
      <LoginForm/>
    </div>
  )
}

export default Login