'use client'

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
  
  const handleSubmit = async(e)=> {

    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password)

    const res = await signIn("credentials", {
      redirect: false, 
      email,
      password
    })

    if(res.error){
      console.log('Invalid credentials')
    }
    
    router.push('/client')
    console.log('login successful')

  }
  return (
    <div>
      <form onSubmit={handleSubmit}
    className="flex justify-start items-start flex-col w-1/2 mx-auto gap-3 border border-green-400 p-5 shadow-2xl"
    >
      <div className="space-y-3">
        <label htmlFor="email">Email</label>
        <input 
        type='email'
        name="email"
        className='w-full p-2 border shadow-xl '
        placeholder='Email'
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="password">Password</label>
        <input 
        type='password'
        name="password"
        className='w-full p-2 border shadow-xl '
        placeholder='Password'
        />
      </div>
      <div className="flex items-center justify-center my-4">
      <input type="submit" value="Login"
      
      className="py-2 px-4 bg-slate-500 rounded-lg "/>
      </div>
    </form>
    <div className="flex justify-center items-center">
    <button className="mt-5 text-center py-2 px-4 rounded-lg bg-slate-500 text-white"
    onClick={() => signIn('google')}
    >Sign in With Google</button>
    </div>
    </div>
    
  )
}

export default LoginForm