import {Prisma} from "@prisma/client";
import {OrderFormSchema, ProductDetailsByUrl} from "@/app/[lang]/make-order/types";
import {prisma} from "@/lib/db/prisma";
import {ShoppingCart} from "@/lib/db/cart";


export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: true }
}>

type CreateOrderType = {
  (cart: ShoppingCart, orderFormData: OrderFormSchema, productNamesByUrl: ProductDetailsByUrl): Promise<OrderWithItems>
}

export const createOrder: CreateOrderType = async (cart, orderFormData, productDetailsByUrl) => {
  const orderNumber = await prisma.order.count() + 1
  return await prisma.order.create({
    data: {
      orderNumber: orderNumber,
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      delivery: orderFormData.delivery,
      email: orderFormData.email,
      phone: orderFormData.phone,
      userId: cart.userId,
      orderItems: {
        createMany: {
          data: cart.items.map(item => {
            const productNameEn = productDetailsByUrl.get(item.productId)?.en
            const productNameUa = productDetailsByUrl.get(item.productId)?.ua
            const price = productDetailsByUrl.get(item.productId)?.price
            return {
              productId: item.productId,
              productNameEn: productNameEn ? productNameEn : '',
              productNameUa: productNameUa ? productNameUa : '',
              size: item.size,
              quantity: item.quantity,
              price: price ? price : 0
            }
          })
        }
      }
    },
    include: {orderItems: true}
  })
}

export const getUserOrders = async (userId: string): Promise<OrderWithItems[] | null> => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
  })
  if (!user) return null
  return user.orders
}

export const getOrder = async (orderId: string): Promise<OrderWithItems | null> => {
  try {
    const order = await prisma.order.findUnique({
      where: {id: orderId},
      include: {orderItems: true}
    })
    if (!order) return null
    return order
  }
  catch {
    return null
  }

}