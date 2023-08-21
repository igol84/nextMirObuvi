import 'server-only'
import {BrandSchema, ProductSchema} from "@/schemas/data";

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/brands`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getBrandData(name: string): Promise<BrandSchema> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/brands?name=${name}`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getProductsDataByBrandId(brandId: number): Promise<ProductSchema[]> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/products?brandId=${brandId}`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getProductData(url: string): Promise<ProductSchema> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/products?url=${url}`, {next: {revalidate: 3600}})
  return await res.json()
}