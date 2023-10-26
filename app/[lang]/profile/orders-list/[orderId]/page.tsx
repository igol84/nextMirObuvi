import React from 'react';
import OrderPage from "@/app/[lang]/profile/orders-list/[orderId]/OrderPage";
import {getOrder} from "@/lib/db/order";
import {ProductDetailsByUrl} from "@/app/[lang]/make-order/types";
import {getProductData} from "@/app/api/fetchFunctions";

type Props = {
  params: {
    orderId: string
  }
}

async function orderPage({params: {orderId}}: Props) {
  const order = await getOrder(orderId)
  const productDetailsByUrl: ProductDetailsByUrl = new Map()
  if (order)
    for (const item of order.orderItems) {
      const productData = await getProductData(item.productId)
      if (productData)
        productDetailsByUrl.set(item.productId,
          {ua: productData.name_ua, en: productData.name, price: productData.price, url: productData.product_key}
        )
    }
  return order ? (
    <OrderPage order={order} productDetailsByUrl={productDetailsByUrl}/>
  ) : (
    <div>Order not found.</div>
  )
}

export default orderPage;