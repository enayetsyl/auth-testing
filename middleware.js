// import { NextResponse } from "next/server";

export {default} from "next-auth/middleware"

// export function middleware(request){
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === "/login" || path === "/register"
//   // console.log(path)
//   const token = request.cookies.get('__Secure-next-auth.session-token')?.value || ''

//   __Secure-next-auth.session-token

//   if(isPublicPath && token){
//     return NextResponse.redirect(new URL('/client', request.nextUrl))
//   }
//   if(!isPublicPath && !token){
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }

//   // console.log(token)
// }

export const config = {matcher: ["/client/:path*"]}