import 'server-only'
import {NextResponse} from 'next/server'
import {Data} from "@/schemas/brands";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const brandId = Number(searchParams.get('brandId'))
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {next: {revalidate: 3600}})
  const data: Data = await res.json()
  if(brandId!==null){
    const products = data.products.filter(product => product.brand_id === brandId)
    return NextResponse.json(products)
  }
  const products = data.products
  return NextResponse.json(products)
}