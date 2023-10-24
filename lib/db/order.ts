import {Prisma} from "@prisma/client";
import {OrderFormSchema, ProductNamesByUrl} from "@/app/[lang]/make-order/types";
import {prisma} from "@/lib/db/prisma";
import {ShoppingCart} from "@/lib/db/cart";


export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: true }
}>

type CreateOrderType = {
  (cart: ShoppingCart, orderFormData: OrderFormSchema, productNamesByUrl: ProductNamesByUrl): Promise<OrderWithItems>
}

export const createOrder: CreateOrderType = async (cart, orderFormData, productNamesByUrl) => {
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
          data: cart.items.map(item => {
            const productNameEn = productNamesByUrl.get(item.productId)?.en
            const productNameUa = productNamesByUrl.get(item.productId)?.ua
            return {
              productId: item.productId,
              productNameEn: productNameEn ? productNameEn : '',
              productNameUa: productNameUa ? productNameUa : '',
              size: item.size,
              quantity: item.quantity
            }
          })
        }
      }
    },
    include: {orderItems: true}
  })
}

