import User from "@/models/User"
import connect from "@/utils/mongodbConnect"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials", 
      credentials: {},
      async authorize(credentials){
        const { email, password } = credentials
        // console.log(email)
        try {
          await connect()
          const user = await User.findOne({email})

          if(!user){
            return null
          }

          if (user.password !== password){
            return null
          }

          return user;

        } catch (error) {
          console.log(error)
        }

      }
    })
  ],
  callbacks: {
    async signIn({user, account}){
      if(account.provider === 'google'){
        const {name, email} = user
        // console.log('google user info', user)
        // console.log('google user name and email', name, email)
        try {
          await connect()
          const userExist = await User.findOne({email})
          const password = null
          if(!userExist){
            const res = await fetch('https://auth-testing-mu.vercel.app/api/register', {
              method:"POST",
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({
                name, email, 
                password,
              })
            })
            if(res.ok){
              return user;
            }
          }

          return user
          // else {
          //   try {
          //     await connect()
          //     const user = await User.findOne({email})
          //     console.log('server user',user)
          //     return user
          //   } catch (error) {
          //     console.log(error)
          //   }
          // }
        } catch (error) {
        console.log(error)   
        }
       
      }
      if(account.provider === 'credentials'){
        return user
      }
    },
    async jwt({token, user}){
      // console.log('google user in jwt', user)
      // console.log('token', token)
      const email = token.email
      console.log('email in token', email
      )
      await connect()
      try {
        const user = await User.findOne({email})
        console.log('user in token', user._id)
        console.log('token in token', token)
        
      } catch (error) {
        
      }
      return token
    }, 
    async session({session, token}){
      const id = token.sub;
      console.log('token in session',token)
      // await connect()
          // const user = await User.findById(id)
          session.user.name = token.name
          session.user.email = token.email
          // session.user.createdAt = user.createdAt
          // console.log('session user', user)
      console.log('session', session )
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}