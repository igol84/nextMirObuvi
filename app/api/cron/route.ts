import {NextResponse} from 'next/server'
import {clearOldCart} from "@/lib/db/cart";

export async function GET() {
  await clearOldCart()
  return NextResponse.json(
    { message: 'Old carts clear' },
    { status: 200 },
  );
}