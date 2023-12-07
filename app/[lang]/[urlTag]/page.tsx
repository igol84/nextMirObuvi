import React from 'react';
import '@/app/theme/style.scss'
import {Lang} from "@/dictionaries/get-dictionary";
import {redirect} from "next/navigation";
import {TagUrl} from "@/app/[lang]/[urlTag]/types";
import {getProducts, getTagsUrlData, getTagUrlData} from "@/app/api/fetchFunctions";
import _ from "lodash";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {PaginationBarProps} from "@/components/base/PaginationBar";
import ProductsList from "@/components/base/productsList";
import TagPage from "@/app/[lang]/[urlTag]/TagPage";

type Props = {
  params: {
    lang: Lang
    urlTag: string
  },
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({params: {lang, urlTag}}: Props) {
  const fetchData = await getTagUrlData(urlTag)
  if (!fetchData) redirect(`/`)
  const tagData: TagUrl = lang === 'ua'
    ? {url:fetchData.url, search: fetchData.search_ua, desc: fetchData.desc_ua, text: fetchData.text_ua}
    : {url:fetchData.url, search: fetchData.search, desc: fetchData.desc, text: fetchData.text}
  return {
    title: tagData.search,
    description: tagData.desc,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

export async function generateStaticParams() {
  const tagsUrlData = await getTagsUrlData()
  return tagsUrlData.map((tag) => ({urlTag: tag.url}))
}

const productsOnPage = 24
const Page = async ({params: {lang, urlTag}, searchParams: {page = '1'}}: Props) => {
  const fetchData = await getTagUrlData(urlTag)
  if (!fetchData) redirect(`/`)
  const tagData: TagUrl = lang === 'ua'
    ? {url:fetchData.url, search: fetchData.search_ua, desc: fetchData.desc_ua, text: fetchData.text_ua}
    : {url:fetchData.url, search: fetchData.search, desc: fetchData.desc, text: fetchData.text}

  let currentPage = parseInt(page)
  const productsData = await getProducts()

  const sortedProductsDataByAvailable = _.orderBy(productsData, [product => product.qty > 0], ['desc'])
  let products: ProductType[] = sortedProductsDataByAvailable.map(product => createProduct(product, lang))

  products = products.filter(product => {
    const whereSearch = product.name.toLowerCase()
    const whatSearch = tagData.search.toLowerCase()
    return whereSearch.includes(whatSearch)
  })

  const totalProductsCount = products.length
  const totalPages = Math.ceil(totalProductsCount / productsOnPage)
  currentPage = currentPage > totalPages ? totalPages : currentPage
  const skip = (currentPage - 1) * productsOnPage
  const productsSlice = products.slice(skip, skip + productsOnPage)
  const paginationBar: PaginationBarProps = {pageSize: productsOnPage, totalPages, currentPage}

  return (
    <TagPage desc={tagData.text}>
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </TagPage>

  )
};

export default Page;