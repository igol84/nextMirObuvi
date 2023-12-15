import React from 'react';
import '@/app/theme/style.scss'
import {Lang} from "@/dictionaries/get-dictionary";
import {redirect} from "next/navigation";
import {convertToTagUrlFromDB, ParentTagForBreadCrumb, TagUrl} from "@/app/[lang]/[urlTag]/types";
import {getProducts, getTagsUrlData, getTagUrlData} from "@/app/api/fetchFunctions";
import ProductsList from "@/components/base/productsList";
import TagPage from "@/app/[lang]/[urlTag]/TagPage";
import {getBreadCrumbData, getBreadCrumbDataSinglePage, isSinglePage} from "@/app/[lang]/[urlTag]/serverFunctions";
import {getViewedProducts} from "@/lib/productsGetter";
import _ from "lodash";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {getPageData} from "@/lib/store/serverFunctions";

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
  const tagData: TagUrl = convertToTagUrlFromDB(fetchData, lang)
  return {
    title: tagData.search ? tagData.search : tagData.desc,
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


const Page = async ({params: {lang, urlTag}, searchParams: {page = '1'}}: Props) => {
  const tagsUrlData = await getTagsUrlData()
  const fetchData = tagsUrlData.find(tag => tag.url === urlTag)
  if (!fetchData) redirect(`/`)

  const tagData = convertToTagUrlFromDB(fetchData, lang)
  const viewedProducts = await getViewedProducts(lang)
  if (isSinglePage(tagData)) {
    const breadCrumbs = getBreadCrumbDataSinglePage(tagData.desc)
    return (
      <TagPage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}/>
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
  products = products.filter(product => {
    const searchInTags = _.startCase(product.tags)
    const whatSearchInTags = _.startCase(tagData.search)
    return searchInTags.includes(whatSearchInTags)
  })
  const sortedProductsDataByAvailable = _.orderBy(products, [product => product.qty > 0], ['desc'])
  const [productsSlice, paginationBar] = await getPageData(sortedProductsDataByAvailable, parseInt(page))

  return (
    <TagPage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}>
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </TagPage>
  )
};

export default Page;