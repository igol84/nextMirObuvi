import {cookies} from "next/headers";
import {PageType, ProductType} from "@/components/Products/types";
import {getProductData} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {createProduct} from "@/lib/productCardData";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {getUser} from "@/lib/db/user";

export const getViewedProducts = async (lang: Lang) => {
  const page: PageType = 'viewed'
  const viewedProductsJSON: string | undefined = cookies().get("viewedProducts")?.value
  const viewedProductUrls: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const viewedProducts: ProductType[] = []
  for (const viewedProductUrl of viewedProductUrls.reverse()) {
    const productData = await getProductData(viewedProductUrl)
    if (productData)
      viewedProducts.push(createProduct(productData, lang, page))
  }
  return viewedProducts
}

export const getFavoriteProductUrls = async (): Promise<string[]> => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const favoriteProducts = []
  if (userId) {
    const user = await getUser(userId)
    if (user) {
      favoriteProducts.push(...user.favoriteProducts)
    }
  }

  return favoriteProducts
}