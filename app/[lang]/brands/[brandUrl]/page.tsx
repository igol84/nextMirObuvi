import React from 'react';
import '@/app/theme/style.scss'
import BrandPage from "@/app/[lang]/brands/[brandUrl]/BrandPage";
import {getBrandData, getBrandsData, getProductData, getProductsDataByBrandId} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {BrandProps} from "@/components/Brands/types";
import {ProductType} from "@/components/Products/types";
import {redirect} from "next/navigation";
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {cookies} from "next/headers";
import {createProduct} from "@/app/[lang]/brands/[brandUrl]/functions";

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
  const products: ProductType[] = productsData.map(product => createProduct(product, lang))
  const breadCrumbData: BreadCrumbData = {
    brand: brandData.name,
    brandUrl: brandData.url,
    current: 'brand'
  }
  const viewedProductsJSON: string | undefined = cookies().get("viewedProducts")?.value
  const viewedProductUrls: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const viewedProducts: ProductType[] = []
  for (const viewedProductUrl of viewedProductUrls) {
    const productData = await getProductData(viewedProductUrl)
    if (productData)
      viewedProducts.push(createProduct(productData, lang))
  }
  return (
    <BrandPage brandData={brand} productsData={products} breadCrumbData={breadCrumbData}
               viewedProducts={viewedProducts}/>
  )
}

export default Page;