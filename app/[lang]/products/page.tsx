import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import ProductsPage from "@/app/[lang]/products/productsPage";
import {getProducts} from "@/app/api/fetchFunctions";
import _ from "lodash";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {PaginationBarProps} from "@/components/base/PaginationBar";

type Props = {
  params: {
    lang: Lang
  },
  searchParams: {
    page: string
  }
}

export async function generateMetadata({params: {lang}}: Props) {
  const dict = await getDictionary(lang)
  return {
    title: dict.productList.title,
    description: dict.productList.description,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}
const pageSize = 48
const Page = async ({params: {lang}, searchParams: {page = '1'}}: Props) => {
  const currentPage = parseInt(page)
  const productsData = await getProducts()
  const totalProductsCount = productsData.length
  const totalPages = Math.ceil(totalProductsCount / pageSize)
  const sortedProductsDataByAvailable = _.orderBy(productsData, [product => product.qty > 0], ['desc'])
  const products: ProductType[] = sortedProductsDataByAvailable.map(product => createProduct(product, lang))
  const skip = (currentPage - 1) * pageSize
  const productsSlice = products.slice(skip, skip + pageSize)
  const paginationBar: PaginationBarProps = {pageSize, totalPages, currentPage}
  return (
    <ProductsPage products={productsSlice} paginationBar={paginationBar}/>
  )
}

export default Page