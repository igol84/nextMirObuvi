import {NextResponse} from 'next/server'
import {Data} from "@/schemas/brands";

export async function GET() {
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const product: Data = await res.json()
  const brands = product.brands

  return NextResponse.json(brands)
}