import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useUserInfo } from './utils/Auth';
 
export function middleware(request: NextRequest) {
    const jwt = require('jsonwebtoken');
    const currentUser = request.cookies.get('AuthToken')?.value

    // if(!currentUser && request.nextUrl.pathname.startsWith('/user')){
    //   return NextResponse.redirect(new URL('/', request.url))
    // }

    if (!currentUser  && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const decodedToken = jwt.decode(currentUser);
    console.log(decodedToken?.role)
    if(decodedToken?.role === "USER" && request.nextUrl.pathname.startsWith('/dashboard')){
      return NextResponse.redirect(new URL('/', request.url))
    }

}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)','/dashboard/:path*','/user/:path*'],
}