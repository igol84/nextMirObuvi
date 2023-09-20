import 'server-only'
import {BrandSchema, ProductSchema} from "@/schemas/data";

const api = 'https://31.148.245.50'

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`${api}/brand/`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getBrandData(name: string): Promise<BrandSchema> {
  const res = await fetch(`${api}/brand/by-url/${name}`, {next: {revalidate: 3600}})
  return await res.json()
}

export async function getProductsData(): Promise<ProductSchema[]> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/products`, {next: {revalidate: 3600}})
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