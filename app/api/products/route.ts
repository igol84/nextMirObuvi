import {NextResponse} from 'next/server'
import {Data} from "@/schemas/brands";

export async function GET() {
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {next: {revalidate: 3600}})
  const data: Data = await res.json()
  const products = data.products

  return NextResponse.json(products)
}