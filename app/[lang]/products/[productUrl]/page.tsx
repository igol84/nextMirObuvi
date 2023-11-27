import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import {getProductData, getProductsData} from "@/app/api/fetchFunctions";
import ProductPage from "@/app/[lang]/products/[productUrl]/ProductPage";
import {ProductType} from "@/components/product/types";
import {ProductSchema} from "@/schemas/data";
import {createWithEmptySizes} from "@/utility/sizes";
import '@/app/theme/style.scss'
import {redirect} from 'next/navigation'
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getViewedProducts} from "@/lib/productsGetter";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {getUser} from "@/lib/db/user";
import {dateDiffInDays, DAYS_IS_NEW, formatStringToData} from "@/utility/functions";

type Props = {
  params: {
    productUrl: string
    lang: Lang
  }
}

export async function generateMetadata({params: {productUrl, lang}}: Props) {
  const productData = await getProductData(productUrl)
  if (!productData) redirect(`/`)
  const title = lang === 'en' ? productData.name : productData.name_ua
  return {
    title,
    openGraph: {
      images: [`https://mirobuvi.com.ua/ftp_products/${productData.product_key}/02.jpg`],
    },
  }
}

export async function generateStaticParams() {
  const productsData = await getProductsData()
  return productsData.map((product) => ({productUrl: product.url}))
}

function productFabrice(lang: Lang, product: ProductSchema, userId: string | undefined, isFavorite: boolean): ProductType {
  const name = lang === 'en' ? product.name : product.name_ua
  const desc = lang === 'en' ? product.desc : product.desc_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  const date = formatStringToData(product.date)
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  switch (product.type) {
    case "product": {
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'product',
        images: product.images, desc, userId, isFavorite, isNew
      }
    }
    case "shoes": {
      const allSizes = createWithEmptySizes(product.sizes)
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'shoes',
        images: product.images, desc, userId, isFavorite, isNew, sizes: allSizes
      }
    }
  }
}

function getBreadCrumbData(lang: Lang, product: ProductSchema): BreadCrumbData {
  const name = lang === 'en' ? product.name : product.name_ua
  return {
    product: name,
    brand: product.brand ? product.brand : '',
    brandUrl: product.brand_url ? product.brand_url : '',
    current: 'product'
  }
}

async function Page({params: {productUrl, lang}}: Props) {
  const productFetchData = await getProductData(productUrl)
  if (!productFetchData) redirect(`/`)
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const favoriteProducts = []
  if (userId) {
    const user = await getUser(userId)
    if (user) {
      favoriteProducts.push(...user.favoriteProducts)
    }
  }
  const isProductFavorite = favoriteProducts.includes(productUrl)
  const productData: ProductType = productFabrice(lang, productFetchData, userId, isProductFavorite)
  const breadCrumbData: BreadCrumbData = getBreadCrumbData(lang, productFetchData)
  const viewedProducts = await getViewedProducts(lang)
  return (
    <ProductPage productData={productData} breadCrumbData={breadCrumbData} viewedProducts={viewedProducts}/>
  )
}

export default Page;