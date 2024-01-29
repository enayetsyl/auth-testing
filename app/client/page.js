'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import LogoutButton from "../_components/LogoutButton"

const ClientPage = () => {
  const session = useSession()
  console.log(session)
  // const { name, createdAt} = session?.data?.user

  if(session?.status === 'loading'){
    return <p>loading....</p>
  }
  return (
    <div>
 <LogoutButton text={'Logout'}/>

      <p>Name {session?.data?.user?.name}</p>
      <p>Email {session?.data?.user?.email}</p>
      {
        session?.data?.user?.image && (
          <Image src={session?.data?.user?.image} alt="user image" height={500} width={500}
          className="h-20 w-20 rounded-full"
          />
        )
      }

    </div>
  )
}

export default ClientPage