import {Prisma} from "@prisma/client";
import {OrderFormSchema} from "@/app/[lang]/make-order/types";
import {prisma} from "@/lib/db/prisma";
import {ShoppingCart} from "@/lib/db/cart";


export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: true }
}>

type CreateOrderType = {
  (cart: ShoppingCart, orderFormData: OrderFormSchema): Promise<OrderWithItems>
}

export const createOrder: CreateOrderType = async (cart, orderFormData) => {
  return await prisma.order.create({
    data: {
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      delivery: orderFormData.delivery,
      email: orderFormData.email,
      phone: orderFormData.phone,
      userId: cart.userId,
      orderItems: {
        createMany: {
          data: cart.items.map(item => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity
          }))
        }
      }
    },
    include: {orderItems: true}
  })
}

