import {Roboto} from 'next/font/google'
import React from "react";
import {Providers} from "@/app/providers";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import './globals.scss'
import Container from "@/components/Container";
import {getBrandsData} from "@/app/api/fetchFunctions";
import {getCart} from "@/lib/db/cart";
import {getCartData, ProductCart} from "@/lib/cartFunctions";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {env} from "@/lib/env";
import {getUser} from "@/lib/db/user";
import {userConvertFromDB} from "@/lib/store/user";

export const dynamic = 'force-dynamic'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    metadataBase: new URL(env.URL),
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}


export default async function RootLayout(
  {
    children,
    params: {lang},
  }: {
    children: React.ReactNode
    params: { lang: Lang }
  }) {
  const dict = await getDictionary(lang)
  const brandsData = await getBrandsData()
  const cart = await getCart();
  const session = await getServerSession(authOptions)
  const userEmail = String(session?.user?.email)
  const admins = JSON.parse(env.ADMINS)
  const isAdmin = admins.includes(userEmail)
  const cartProducts: ProductCart[] = cart ? await getCartData(cart, lang) : []
  const userId = session?.user.id
  let user = null
  if (userId) {
    const userDB = await getUser(userId)
    if (userDB) {
      user = userConvertFromDB(userDB)
    }
  }
  return (
    <html lang={lang} suppressHydrationWarning={true}>
    <body className={roboto.className} suppressHydrationWarning={true}>
    <Providers dict={dict} lang={lang} isAdmin={isAdmin}>
      <Container brands={brandsData} cartProducts={cartProducts} user={user}>
        {children}
      </Container>
    </Providers>
    </body>
    </html>
  )
}
