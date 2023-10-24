import React from 'react';
import OrderForm from "@/app/[lang]/make-order/OrderForm";
import {getCart} from "@/lib/db/cart";
import EmptyCart from "@/app/[lang]/make-order/EmptyCart";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";

async function MakeOrderPage() {
  const session = await getServerSession(authOptions)
  const cart = await getCart()
  return (cart && cart.items.length)
    ? <OrderForm isAuthorized={!!session}/>
    : <EmptyCart/>
}

export default MakeOrderPage;