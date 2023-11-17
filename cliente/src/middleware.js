'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";

export const middleware = async(request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);

    const isTokenValidated =  await validateToken(token);

    const pgDashboard = new URL ('/pages/dashboard', request.url);
    
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        } else if (request.nextUrl.pathname === '/pages/register' || request.nextUrl.pathname === '/pages/alterar') {
            return NextResponse.redirect(urlLogin);
        }
    } 
    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(pgDashboard);
        }
    } 
  
  NextResponse.next();

} 
    
// Verifica  se o token não é válido ou não existe
export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/register', '/pages/alterar']
};
