import 'server-only'
import {
  BrandSchema,
  ProductSchema,
  ProductUrlSchema,
  ProductWithoutDescriptionSchema,
  TagUrlSchema
} from "@/schemas/data";
import {TagUrl} from "@/app/[lang]/[urlTag]/types";
import {Lang} from "@/dictionaries/get-dictionary";

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

export async function getProducts(): Promise<ProductWithoutDescriptionSchema[]> {
  const res = await fetch(`${api}/showcase/products`, {next: {revalidate: 60}})
  return await res.json()
}

export async function getProductUrls(): Promise<ProductUrlSchema[]> {
  const res = await fetch(`${api}/showcase/light`, {next: {revalidate: 60}})
  return await res.json()
}

export async function getProductsDataByBrandId(brandId: number): Promise<ProductWithoutDescriptionSchema[] | undefined> {
  try {
    const res = await fetch(`${api}/showcase/products-by-brand-id/${brandId}`, {next: {revalidate: 60}})
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.log('There was an error', error);
  }
}

export async function getProductData(url: string): Promise<ProductSchema | null | undefined> {
  try {
    const res = await fetch(`${api}/showcase/product-by-url/${url}`, {next: {revalidate: 60}})
    if (res.ok)
      return await res.json()
    if (res.status === 404) {
      return null
    }
  } catch (error) {
    return undefined
  }
}

export async function getTagsUrlData(): Promise<TagUrlSchema[]> {
  const res = await fetch(`${api}/tag_url/`, {next: {revalidate: 3600}})
  return await res.json()
}

export const convertTagUrlFromDB = (tagUrlDB: TagUrlSchema, lang: Lang): TagUrl => {
  return {
    url: tagUrlDB.url,
    search: lang === 'en' ? tagUrlDB.search : tagUrlDB.search_ua,
    desc: lang === 'en' ? tagUrlDB.desc : tagUrlDB.desc_ua,
    text: lang === 'en' ? tagUrlDB.text : tagUrlDB.text_ua
  }
}


export async function getTagUrlData(url: string): Promise<TagUrlSchema | undefined> {
  try {
    const res = await fetch(`${api}/tag_url/${url}`, {next: {revalidate: 3600}})
    if (res.ok)
      return await res.json()
  } catch (error) {
    console.log('There was an error', error);
  }
}

