import User from "@/models/User"
import connect from "@/utils/mongodbConnect"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  try {
    const {email, password, name} = await req.json()
    console.log(email, password, name)
    await connect()

    const existingUser = await User.findOne({email})

    if(existingUser){
      return new NextResponse("Email is already in use", {status: 400})
    }

    const newUser = new User({
      email, password, name
    })

    try {
      await newUser.save()
      return new NextResponse("User successfully created", {status: 200})
    } catch (error) {
      console.log(error)
      return new NextResponse(error, {status: 500})
    }

  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", {status: 500})
  }
}