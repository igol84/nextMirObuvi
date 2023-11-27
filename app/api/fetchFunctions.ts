import 'server-only'
import {BrandSchema, ProductSchema} from "@/schemas/data";

const api = 'https://31.148.245.50'

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`${api}/brand/`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getBrandData(name: string): Promise<BrandSchema | undefined> {
  try {
    const res = await fetch(`${api}/brand/by-url/${name}`, {next: {revalidate: 3600}})
    if (res.ok)
      return await res.json()
  } catch (error) {
    console.log('There was an error', error);
  }
}

export async function getProductsData(): Promise<ProductSchema[]> {
  const res = await fetch(`${api}/showcase/light`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getProductsDataByBrandId(brandId: number): Promise<ProductSchema[] | undefined> {
  try {
    const res = await fetch(`${api}/showcase/products-by-brand-id/${brandId}`, {next: {revalidate: 60}})
    if (res.ok)
      return await res.json()
  } catch (error) {
    console.log('There was an error', error);
  }
}

export async function getProductData(url: string): Promise<ProductSchema | null | undefined> {
  try {
    const res = await fetch(`${api}/showcase/product-by-url/${url}`, {next: {revalidate: 60}})
    if (res.ok)
      return await res.json()
    if (res.status === 404){
      return null
    }
  } catch (error) {
    return undefined
  }
}