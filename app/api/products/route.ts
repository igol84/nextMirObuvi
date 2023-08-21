import 'server-only'
import {NextResponse} from 'next/server'
import {Data} from "@/schemas/data";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {next: {revalidate: 3600}})
  const data: Data = await res.json()

  const brandId = Number(searchParams.get('brandId'))
  if(brandId!==null){
    const products = data.products.filter(product => product.brand_id === brandId)
    return NextResponse.json(products)
  }

  const productUrl = searchParams.get('url')
  if(productUrl!==null){
    const product = data.products.find(product => product.url === productUrl)
    return NextResponse.json(product)
  }

  const products = data.products
  return NextResponse.json(products)
}