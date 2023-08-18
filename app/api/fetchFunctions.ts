import {BrandSchema} from "@/schemas/brands";

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/brands`, {next: {revalidate: 3600}})
  return await res.json()
}
