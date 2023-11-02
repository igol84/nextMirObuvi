'use server'
import {SafeParseReturnType} from "zod"
import {ErrorEditField, OrderEditFormSchema, Response, schema} from "./types"

import {revalidatePath} from "next/cache"
import {deleteOrder, editOrder} from "@/lib/db/order"

export const serverActionEditOrder = async (orderFormData: OrderEditFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<OrderEditFormSchema, OrderEditFormSchema> = schema.safeParse(orderFormData)

  const zodErrors: ErrorEditField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof OrderEditFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  await editOrder(orderFormData)
  revalidatePath("/[lang]/admin/orders")
  return {success: true}
}

export const serverActionDeleteOrder = async (orderId: string) => {
  await deleteOrder(orderId)
  revalidatePath("/[lang]/admin/orders")
}
