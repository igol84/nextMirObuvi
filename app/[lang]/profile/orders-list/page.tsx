import React from 'react';
import OrdersPage from "@/app/[lang]/profile/orders-list/OrdersPage";
import {getUserOrders} from "@/lib/db/order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {Lang} from "@/dictionaries/get-dictionary";

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
      return <div>Empty</div>
    return (
      <main>
        <OrdersPage orders={orders}/>
      </main>
    )
  } else {
    redirect(`/api/auth/signin?callbackUrl=/${lang}/profile/orders-list`)
  }
}

export default OrdersListPage;