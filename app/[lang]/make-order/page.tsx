import React from 'react';
import OrderForm from "@/app/[lang]/make-order/OrderForm";
import {getCart} from "@/lib/db/cart";
import EmptyCart from "@/app/[lang]/make-order/EmptyCart";

async function MakeOrderPage() {
  const cart = await getCart()
  return (cart && cart.items.length)
    ? <OrderForm/>
    : <EmptyCart/>
}

export default MakeOrderPage;