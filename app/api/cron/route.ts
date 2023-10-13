import {NextResponse} from 'next/server'
import {clearOldCart} from "@/lib/db/cart";

export async function GET() {
  await clearOldCart()
  return NextResponse.json({text: 'Complete'})
}