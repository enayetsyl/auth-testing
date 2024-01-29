'use client'

import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const router = useRouter()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password)

    try{
      const res = await fetch("/api/register", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password, name
        })
      })

      if (res.status === 400){
        console.log('This email is already registered')
      }
      if(res.status === 200){
        console.log('Registration successful')
        router.push('/login')
      }
    } catch(error){
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleSubmit}
    className="flex justify-start items-start flex-col w-1/2 mx-auto gap-3 border border-green-400 p-5 shadow-2xl"
    >
      <div className="space-y-3">
        <label htmlFor="name">Name</label>
        <input 
        type='text'
        name="name"
        className='w-full p-2 border shadow-xl '
        placeholder='Name'
        />
      </div>
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
      <input type="submit" value="Register"
      
      className="py-2 px-4 bg-slate-500 rounded-lg "/>
      </div>
    </form>
    
  )
}

export default RegisterForm