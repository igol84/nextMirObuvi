import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getProducts} from "@/app/api/fetchFunctions";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import ProductsPage from "@/app/[lang]/products/ProductsPage";
import {getViewedProducts} from "@/lib/productsGetter";
import {getPageData, sortingProducts} from "@/lib/store/serverFunctions";
import {SortingType} from "@/components/base/SortingSelect/types";
import {searchProducts} from "@/app/[lang]/products/serverFunctions";

type Props = {
  params: {
    lang: Lang
  },
  searchParams: {
    page: string
    search?: string
    sortingBy?: SortingType
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

const Page = async ({params: {lang}, searchParams: {page = '1', search, sortingBy='byOrder'}}: Props) => {
  const productsData = await getProducts()

  let products: ProductType[] = productsData.map(product => createProduct(product, lang))
  if (search) {
    products = searchProducts(products, search)
  }
  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page))
  const viewedProducts = await getViewedProducts(lang)
  return (
    <ProductsPage products={productsSlice} sortingBy={sortingBy} paginationBar={paginationBar} viewedProducts={viewedProducts}/>
  )
}

export default Page