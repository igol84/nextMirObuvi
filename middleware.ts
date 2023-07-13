import {NextRequest, NextResponse} from 'next/server'

let locales = ['en', 'ua']

// Get the preferred locale, similar to above or using a library
const setLocale = (request: NextRequest, locale: string) =>{
  request.cookies.set('NEXT_LOCALE', locale)
}

function getLocale(request: NextRequest) {
  return request.cookies.get('NEXT_LOCALE')?.value || 'ua'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )


  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
  else {
    const local = pathname.split('/')
    if(pathname !== '/ua/socket.io') {
      setLocale(request, local[1])
      console.log(pathnameIsMissingLocale, pathname)
    }
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}