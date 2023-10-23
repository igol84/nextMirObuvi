'use server'
import {SafeParseReturnType} from "zod";
import {ErrorField, OrderFormSchema, Response, schema} from "./types";
import {createOrder} from "@/lib/db/order";
import {revalidatePath} from "next/cache";
import {deleteCart, getCart} from "@/lib/db/cart";

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
    await createOrder(cart, orderFormData)
    await deleteCart(cart.id)
    revalidatePath("/")
    return {success: true}
  }
  return {success: false, serverErrors: 'Cart not defined or empty'}
}