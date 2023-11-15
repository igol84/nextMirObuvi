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
import {getViewedProducts} from "@/lib/viewedProducts";

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

function productFabrice(lang: Lang, product: ProductSchema): ProductType {
  const name = lang === 'en' ? product.name : product.name_ua
  const desc = lang === 'en' ? product.desc : product.desc_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  switch (product.type) {
    case "product": {
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'product',
        images: product.images, desc
      }
    }
    case "shoes": {
      const allSizes = createWithEmptySizes(product.sizes)
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'shoes',
        images: product.images, desc, sizes: allSizes
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
  const productData: ProductType = productFabrice(lang, productFetchData)
  const breadCrumbData: BreadCrumbData = getBreadCrumbData(lang, productFetchData)
  const viewedProducts = await getViewedProducts(lang)
  return (
    <ProductPage productData={productData} breadCrumbData={breadCrumbData} viewedProducts={viewedProducts}/>
  )
}

export default Page;