import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIES_ADMIN_RAIZE_ACCESS_TOKEN,COOKIES_USER_TYPE } from './context/actionTypes';

// Step 1. HTTP Basic Auth Middleware for Challenge
export async function middleware(req: NextRequest) {
    const url:any = req.nextUrl.clone()
    console.log('middleware_called', url);
    let isAuth = req.cookies.has(COOKIES_ADMIN_RAIZE_ACCESS_TOKEN)
    if (req.nextUrl.pathname.startsWith('/')) {
        if (!isAuth) {
            url.pathname = `/auth/login`
            return NextResponse.redirect(url)
        }
        // else if (isAuth){
        //     try {
        //         henceforthApi.setToken(String(req.cookies.has(COOKIES_ADMIN_RAIZE_ACCESS_TOKEN)))
        //         const response = await fetch(`${API_ROOT}user/profile`);
        //         console.log(response,"response");
                
        //         const data = await response.json();
        //     } catch (error) {
        //         console.log(error,"errororororo");
                
        //     }
        // }
    }
}
export const config = {
    matcher: ['/'],
}