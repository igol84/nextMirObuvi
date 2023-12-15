import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getProducts} from "@/app/api/fetchFunctions";
import _ from "lodash";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import ProductsPage from "@/app/[lang]/products/ProductsPage";
import {getViewedProducts} from "@/lib/productsGetter";
import {getPageData} from "@/lib/store/serverFunctions";

type Props = {
  params: {
    lang: Lang
  },
  searchParams: {
    page?: string
    search?: string
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

const Page = async ({params: {lang}, searchParams: {page = '1', search}}: Props) => {
  const productsData = await getProducts()

  const sortedProductsDataByAvailable = _.orderBy(productsData, [product => product.qty > 0], ['desc'])
  let products: ProductType[] = sortedProductsDataByAvailable.map(product => createProduct(product, lang))
  if (search) {
    products = products.filter(product => {
      const searchInName = product.name.toLowerCase()
      const searchInTags = product.tags.toLowerCase()
      const whatSearch = search.trim().toLowerCase()
      return searchInName.includes(whatSearch) || searchInTags.includes(whatSearch)
    })
  }
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page))
  const viewedProducts = await getViewedProducts(lang)
  return (
    <ProductsPage products={productsSlice} paginationBar={paginationBar} viewedProducts={viewedProducts}/>
  )
}

export default Page