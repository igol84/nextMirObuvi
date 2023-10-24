'use server'
import {SafeParseReturnType} from "zod";
import {ErrorField, OrderFormSchema, ProductNamesByUrl, Response, schema} from "./types";
import {createOrder} from "@/lib/db/order";
import {revalidatePath} from "next/cache";
import {deleteCart, getCart} from "@/lib/db/cart";
import {getProductData} from "@/app/api/fetchFunctions";

export const serverAction = async (orderFormData: OrderFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<OrderFormSchema, OrderFormSchema> = schema.safeParse(orderFormData)

  await new Promise(release => setTimeout(release, 1000))
  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof OrderFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  const cart = await getCart()
  if (cart && cart.items.length) {
    const productNamesByUrl:  ProductNamesByUrl = new Map()
    for (const item of cart.items) {
      const productData = await getProductData(item.productId)
      if(productData)
        productNamesByUrl.set(item.productId, {ua: productData.name_ua, en: productData.name})
    }
    await createOrder(cart, orderFormData, productNamesByUrl)
    await deleteCart(cart.id)
    revalidatePath("/")
    return {success: true}
  }
  return {success: false, serverErrors: 'Cart not defined or empty'}
}