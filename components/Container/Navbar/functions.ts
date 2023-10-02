'use client'
import {ProductCart} from "@/lib/cartFunctions";

export const getCartProductsCount = (cartProducts: ProductCart[]): number => {
  return cartProducts.reduce((accumulator, currentValue) => currentValue.quantity + accumulator, 0)
}