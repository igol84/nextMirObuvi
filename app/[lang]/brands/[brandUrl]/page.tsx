import React from 'react';
import '@/app/theme/style.scss'
import BrandPage from "@/app/[lang]/brands/[brandUrl]/BrandPage";
import {getBrandData, getBrandsData, getProductsDataByBrandId} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {BrandProps} from "@/components/Brands/types";
import {ProductType} from "@/components/Products/types";
import {redirect} from "next/navigation";
import {getViewedProducts} from "@/lib/productsGetter";
import {createProduct} from "@/lib/productCardData";
import _ from "lodash";
import {SortingType} from "@/components/base/SortingSelect/types";
import {sortingProducts} from "@/lib/store/serverFunctions";

type Props = {
  params: {
    brandUrl: string
    lang: Lang
  }
  searchParams: {
    sortingBy?: SortingType
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

const Page = async ({params: {brandUrl, lang}, searchParams: {sortingBy='byOrder'}}: Props) => {
  const brandData = await getBrandData(brandUrl)
  if (!brandData) redirect(`/`)
  const productsData = await getProductsDataByBrandId(brandData.id)
  if (!productsData) redirect(`/`)
  const brand: BrandProps = {
    brandId: brandData.id, brandName: brandData.name, url: brandData.url,
    desc: lang === 'en' ? brandData.desc : brandData.desc_ua
  }
  const sortedProductsDataByAvailable = _.orderBy(productsData, [product => product.qty > 0], ['desc'])
  let products: ProductType[] = sortedProductsDataByAvailable.map(product => createProduct(product, lang))
  products = sortingProducts(products, sortingBy)
  const viewedProducts = await getViewedProducts(lang)
  return (
    <BrandPage brandData={brand} productsData={products} sortingBy={sortingBy} viewedProducts={viewedProducts}/>
  )
}

export default Page;