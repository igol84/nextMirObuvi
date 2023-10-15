import 'server-only'
import {NextResponse} from 'next/server'
import {clearOldCart} from "@/lib/db/cart";

export async function GET() {
  const carts = await clearOldCart()
  return NextResponse.json(
    { message: {deletedCarts: carts} },
    { status: 200 },
  );
}