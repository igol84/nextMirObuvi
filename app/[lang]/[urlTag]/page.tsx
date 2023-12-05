import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import {data} from "@/app/[lang]/[urlTag]/data";
import {redirect} from "next/navigation";
import {Tag} from "@/app/[lang]/[urlTag]/types";
import {getProducts} from "@/app/api/fetchFunctions";
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
const productsOnPage = 24
const Page = async ({params: {lang, urlTag}, searchParams: {page = '1'}}: Props) => {
  const fetchData = data.find(tag => tag.tagUrl === urlTag)
  if (!fetchData) redirect(`/`)
  const tagData: Tag = lang === 'ua'
    ? {search: fetchData.searchUa, desc: fetchData.descUa}
    : {search: fetchData.search, desc: fetchData.desc}

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
    <TagPage title={tagData.search} desc={tagData.desc}>
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </TagPage>

  )
};

export default Page;