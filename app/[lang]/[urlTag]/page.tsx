import React from 'react';
import '@/app/theme/style.scss'
import {Lang} from "@/dictionaries/get-dictionary";
import {redirect} from "next/navigation";
import {
  convertToTagUrlFromDB,
  isColor,
  isGender,
  isProductType,
  isSeason,
  ParentTagForBreadCrumb,
  TagUrl
} from "@/app/[lang]/[urlTag]/types";
import {getProducts, getTagsUrlData, getTagUrlData} from "@/app/api/fetchFunctions";
import ProductsList from "@/components/base/productsList";
import TagPage from "@/app/[lang]/[urlTag]/TagPage";
import {
  filterProductsByMaxPrice,
  filterProductsByMinPrice,
  filterProductsByProductType,
  filterProductsBySize,
  filterProductsByTag,
  getBreadCrumbData,
  getBreadCrumbDataSinglePage,
  getFiltersType,
  isSinglePage,
  searchProducts,
  searchProductsByTag
} from "@/app/[lang]/[urlTag]/serverFunctions/serverFunctions";
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
    productType?: string
    size?: string | string[]
    gender?: string
    color?: string
    season?: string
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
  const {
    page = '1', sortingBy = 'byOrder', search, minPrice, maxPrice, productType, size, gender, color, season
  } = searchParams
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
  if (tagData.search !== 'header')
    products = searchProductsByTag(products, tagData.search)
  if (search)
    products = searchProducts(products, search)

  const {
    filterMenuPriceType,
    filterProductType,
    filterSizesType
  } = getFiltersType(products, minPriceValue, maxPriceValue, productType, size, gender, color, season)
  if (productType && isProductType(productType))
    products = filterProductsByProductType(products, productType)

  if (filterSizesType.selectedSizes && filterSizesType.selectedSizes.length > 0) {
    products = filterProductsBySize(products, filterSizesType.selectedSizes)
  }

  if (isGender(gender)) {
    products = filterProductsByTag(products, gender)
  }

  if (isColor(color)) {
    products = filterProductsByTag(products, color)
  }

  if (isSeason(season)) {
    products = filterProductsByTag(products, season)
  }

  if (minPriceValue)
    products = filterProductsByMinPrice(products, minPriceValue)
  if (maxPriceValue)
    products = filterProductsByMaxPrice(products, maxPriceValue)

  const filterMenuType = getFiltersType(
    products, minPriceValue, maxPriceValue, productType, size, gender, color, season, filterSizesType.sizesList,
    filterProductType.hidden
  )

  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page))
  return (
    <TagPage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts} sortingBy={sortingBy}
             filterMenuType={{...filterMenuType, filterMenuPriceType}}
    >
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </TagPage>
  )
};

export default Page;