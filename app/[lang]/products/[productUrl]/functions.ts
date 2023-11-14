import Cookies from "js-cookie";

export const saveViewedProducts = (url: string) => {
  const viewedProductsJSON = Cookies.get('viewedProducts')
  const viewedProducts: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const setProductsUrl = new Set(viewedProducts)
  setProductsUrl.delete(url)
  setProductsUrl.add(url)
  const newViewedProducts = Array.from(setProductsUrl)
  const newViewedProductsJSON = JSON.stringify(newViewedProducts)
  Cookies.set('viewedProducts', newViewedProductsJSON)
}