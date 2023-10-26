import React from 'react';
import OrdersPage from "@/app/[lang]/profile/orders-list/OrdersPage";
import {getUserOrders} from "@/lib/db/order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {Lang} from "@/dictionaries/get-dictionary";
import {IOrder, IOrderItem} from "@/app/[lang]/profile/orders-list/types";

type Props = {
  params: {
    lang: Lang
  }
}

const OrdersListPage = async ({params: {lang}}: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const orders = await getUserOrders(session.user.id)
    if (!orders)
      return <div>User not find</div>
    if (orders.length === 0)
      return <div>Order is Empty</div>

    const orderData: IOrder[] = orders.map(order => {
      const orderItems: IOrderItem[] = order.orderItems.map(orderItem => ({
        productNameUa: orderItem.productNameUa,
        productNameEn: orderItem.productNameEn,
        price: orderItem.price,
        quantity: orderItem.quantity,
        size: orderItem.size
      }))
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        orderItems: orderItems
      }
    })
    return (
      <OrdersPage orders={orderData}/>
    )
  } else {
    redirect(`/api/auth/signin?callbackUrl=/${lang}/profile/orders-list`)
  }
}

export default OrdersListPage;