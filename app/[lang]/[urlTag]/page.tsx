import React from 'react';
import '@/app/theme/style.scss'
import {Lang} from "@/dictionaries/get-dictionary";
import {redirect} from "next/navigation";
import {convertToTagUrlFromDB, ParentTagForBreadCrumb, TagUrl} from "@/app/[lang]/[urlTag]/types";
import {getProducts, getTagsUrlData, getTagUrlData} from "@/app/api/fetchFunctions";
import ProductsList from "@/components/base/productsList";
import TagPage from "@/app/[lang]/[urlTag]/TagPage";
import {
  filterProductsByMaxPrice,
  filterProductsByMinPrice,
  getBreadCrumbData,
  getBreadCrumbDataSinglePage,
  getFiltersType,
  isSinglePage,
  searchProducts,
  searchProductsByTag
} from "@/app/[lang]/[urlTag]/serverFunctions";
import {getViewedProducts} from "@/lib/productsGetter";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {getPageData, sortingProducts} from "@/lib/store/serverFunctions";
import {SortingType} from "@/components/base/SortingSelect/types";
import SimplePage from "@/app/[lang]/[urlTag]/SimplePage";

type Props = {
  params: {
    lang: Lang
    urlTag: string
  },
  searchParams: {
    page?: string
    sortingBy?: SortingType
    search?: string
    minPrice?: string
    maxPrice?: string
  }
}

export async function generateMetadata({params: {lang, urlTag}}: Props) {
  const fetchData = await getTagUrlData(urlTag)
  if (!fetchData) redirect(`/`)
  const tagData: TagUrl = convertToTagUrlFromDB(fetchData, lang)
  return {
    title: tagData.search && tagData.search !== 'header' ? tagData.search : tagData.desc,
    description: tagData.desc,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

export async function generateStaticParams() {
  const tagsUrlData = await getTagsUrlData()
  return tagsUrlData.filter(tag => tag.search !== '').map(tag => ({urlTag: tag.url}))
}


const Page = async ({params: {lang, urlTag}, searchParams}: Props) => {
  const {page = '1', sortingBy = 'byOrder', search, minPrice, maxPrice} = searchParams
  const minPriceValue = minPrice ? Number(minPrice) : undefined
  const maxPriceValue = maxPrice ? Number(maxPrice) : undefined
  const tagsUrlData = await getTagsUrlData()
  const fetchData = tagsUrlData.find(tag => tag.url === urlTag)
  if (!fetchData) redirect(`/`)

  const tagData = convertToTagUrlFromDB(fetchData, lang)
  const viewedProducts = await getViewedProducts(lang)
  if (isSinglePage(tagData)) {
    const breadCrumbs = getBreadCrumbDataSinglePage(tagData.desc)
    return (
      <SimplePage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}/>
    )
  }
  const parentData = tagsUrlData.find(tag => tag.url === fetchData.parent)
  const parentTagForBreadCrumb: ParentTagForBreadCrumb | undefined = parentData ? {
    name: lang === 'en' ? parentData.search : parentData.search_ua,
    url: parentData.url
  } : undefined
  const breadCrumbs = await getBreadCrumbData(lang, tagData.search, parentTagForBreadCrumb)

  const productsData = await getProducts()
  let products: ProductType[] = productsData.map(product => createProduct(product, lang))

  const filterMenuType = getFiltersType(products, minPriceValue, maxPriceValue)
  if (minPriceValue)
    products = filterProductsByMinPrice(products, minPriceValue)
  if (maxPriceValue)
    products = filterProductsByMaxPrice(products, maxPriceValue)
  if (tagData.search !== 'header')
    products = searchProductsByTag(products, tagData.search)
  if (search)
    products = searchProducts(products, search)
  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page))

  return (
    <TagPage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts} sortingBy={sortingBy}
             filterMenuType={filterMenuType}
    >
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </TagPage>
  )
};

export default Page;