import {NextResponse} from 'next/server'
import {Data} from "@/schemas/brands";



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brandUrl = searchParams.get('name')
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Data = await res.json()
  const brands = data.brands
  if(brandUrl){
    const brand = brands.find(brand => brand.url === brandUrl)
    return NextResponse.json(brand)
  }
  return NextResponse.json(brands)
}