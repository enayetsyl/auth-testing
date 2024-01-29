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
        try {
          await connect()
          const userExist = await User.findOne({email})
          // const password = null
          if(!userExist){
            const res = await fetch('https://auth-testing-mu.vercel.app/api/register', {
              method:"POST",
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({
                name, email, 
                // password,
              })
            })
            if(res.ok){
              return user;
            }
          }

          return user
        
        } catch (error) {
        console.log(error)   
        }
       
      }
      if(account.provider === 'credentials'){
        return user
      }
    },
    async jwt({token, user}){
    
       return token
    }, 
    async session({session, token}){
      
          session.user.name = token.name
          session.user.email = token.email
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