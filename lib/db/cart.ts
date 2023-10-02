import {prisma} from "@/lib/db/prisma";
import {cookies} from "next/headers";
import {Prisma} from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {items: true};
}>;

export type ShoppingCart = CartWithProducts & {
  cartSize: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get('localCartId')?.value
  const cart = localCartId
    ? await prisma.cart.findUnique({
      where: {id: localCartId},
      include: {items: true}
    })
    : null

  if (!cart) {
    return null
  }

  return  {
    ...cart,
    cartSize: cart.items.reduce((acc, item) => acc + item.quantity, 0)
  }

}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {}
  })

  cookies().set('localCartId', newCart.id)

  return {
    ...newCart,
    items: [],
    cartSize: 0,
  };
}