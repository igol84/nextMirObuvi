import React from 'react';
import '@/app/theme/style.scss'
import BrandPage from "@/app/[lang]/brands/[brandUrl]/BrandPage";
import {getBrandData, getBrandsData, getProductsDataByBrandId} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {BrandProps} from "@/components/Brands/types";
import {ProductType} from "@/components/Products/types";
import {redirect} from "next/navigation";

type Props = {
  params: {
    brandUrl: string
    lang: Lang
  }
}

export async function generateMetadata({params: {brandUrl, lang}}: Props) {
  const brandData = await getBrandData(brandUrl)
  if (!brandData) redirect('/')
  const title = lang === 'en' ? brandData.title : brandData.title_ua
  return {
    title,
    openGraph: {
      images: [`https://mirobuvi.com.ua/ftp_brands/${brandData.id}.jpg`],
    },
  }
}

export async function generateStaticParams() {
  const brandsData = await getBrandsData()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}

const Page = async ({params: {brandUrl, lang}}: Props) => {
  const brandData = await getBrandData(brandUrl)
  if (!brandData) redirect(`/`)
  const productsData = await getProductsDataByBrandId(brandData.id)
  if (!productsData) redirect(`/`)

  const brand: BrandProps = {
    brandId: brandData.id, brandName: brandData.name, url: brandData.url,
    desc: lang === 'en' ? brandData.desc : brandData.desc_ua
  }
  const products: ProductType[] = productsData.map(product => {
    const name = lang === 'en' ? product.name : product.name_ua
    const price_prefix = lang === 'en' ? '₴' : 'грн.'
    switch (product.type) {
      case "product": {
        return {
          id: product.id, name, url: product.url, product_key: product.product_key,
          price: product.price, price_prefix, type: 'product'
        }
      }
      case "shoes": {
        const sizes: number[] = product.sizes.map(size => size.size)
        return {
          id: product.id, name, url: product.url, product_key: product.product_key,
          price: product.price, price_prefix, type: 'shoes', sizes
        }
      }
    }
  })
  return (
    <BrandPage brandData={brand} productsData={products}/>
  )
}

export default Page;