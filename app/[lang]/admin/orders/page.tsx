import React from 'react';
import OrdersPage from "./OrdersPage";
import {getOrders, getTotalOrderCount} from "@/lib/db/order";
import {IOrder, IOrderItem} from "./types";
import {getProductData} from "@/app/api/fetchFunctions";

interface Props {
  searchParams: { page: string };
}

const pageSize = 6
const Page = async ({searchParams: {page = "1"}}: Props) => {
  const currentPage = parseInt(page)
  const totalOrderCount = await getTotalOrderCount()
  const totalPages = Math.ceil(totalOrderCount / pageSize);
  const ordersData = await getOrders(currentPage, pageSize)
  if (!ordersData || ordersData.length === 0)
    return <div>Orders not find</div>
  const orders: IOrder[] = []

  for (const order of ordersData) {
    const orderItems: IOrderItem[] = []
    for (const item of order.orderItems) {
      const productData = await getProductData(item.productId)
      if (productData) {
        orderItems.push({
          productNameUa: item.productNameUa,
          productNameEn: item.productNameEn,
          size: item.size,
          price: item.price,
          url: productData.url,
          quantity: item.quantity,
          imgUrl: productData.product_key
        })
      }
    }
    orders.push({
      id: order.id,
      createdAt: order.createdAt,
      orderItems: orderItems,
      firstName: order.firstName,
      lastName: order.lastName,
      orderNumber: order.orderNumber,
      delivery: order.delivery,
      email: order.email ? order.email : '',
      phone: `0${order.phone}`
    })
  }

  return (
    <OrdersPage orders={orders} pagination={{pageSize, totalPages, currentPage}}/>
  );
};

export default Page;