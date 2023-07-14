import {NextRequest, NextResponse} from 'next/server'
import acceptLanguage from 'accept-language'
import {defaultLanguage, languages} from "@/app/locale/settings";





acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  let language
  if (req.cookies.has(cookieName)) language = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!language) language = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!language) language = defaultLanguage

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${language}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '')
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}