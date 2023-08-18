import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import './style.css'
import BrandPage from "@/app/[lang]/brands/[brandUrl]/BrandPage";
import {getBrandData, getBrandsData, getProductsDataByBrandId} from "@/app/api/fetchFunctions";
import {ProductProps} from "@/components/Products/types";

type Props = {
  params: {
    brandUrl: string
  }
}

export async function generateStaticParams() {
  const brandsData: BrandSchema[] = await getBrandsData()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}

const Page = async ({params: {brandUrl}}: Props) => {
  const brandData = await getBrandData(brandUrl)
  if (!brandData) {
    throw new Error(`Fail to fetch brand data with url ${brandUrl}`)
  }
  const productsData = await getProductsDataByBrandId(brandData.id)
  if (!productsData) {
    throw new Error(`Fail to fetch products data with brand id ${brandData.id}`)
  }

  const products:ProductProps[] = productsData.map(product => {
    return {id: product.id, name: product.name, url: product.url, product_key: product.product_key}
  })
  return (
    <BrandPage brandData={brandData} productsData={products}/>
  )
}

export default Page;