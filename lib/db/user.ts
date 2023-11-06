import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";


export type UserWithOrders = Prisma.UserGetPayload<{
  include: { orders: {include: { orderItems: true }}}
}>

export const getUserWithOrders = async (userId: string): Promise<UserWithOrders | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
    })
    if (!user) return null
    return user
  } catch {
    return null
  }
}