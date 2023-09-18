import {BrandSchema} from "@/schemas/data";

export const fetchAllBrands = async (): Promise<BrandSchema[]> => {
  const response = await fetch('https://31.148.245.50/brand/', {next: {revalidate: 60}})
  if (!response) throw new Error('Unable to fetch posts')
  return response.json()
}