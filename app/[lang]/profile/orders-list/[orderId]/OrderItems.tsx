import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {OrderItemType} from "@/lib/db/order";
import OrderItem from "@/app/[lang]/profile/orders-list/[orderId]/OrderItem";
import {ProductDetailsByUrl} from "@/app/[lang]/make-order/types";

interface Props {
  orderItems: OrderItemType[]
  productDetailsByUrl: ProductDetailsByUrl
}

const OrderItems = ({orderItems, productDetailsByUrl}: Props) => {
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex direction='column' layerStyle='orderDetails'>
      <Box p={4}>Ваше замовлення</Box>
      {orderItems.map(orderItem => {
        summa += orderItem.price * orderItem.quantity
        const url = productDetailsByUrl.get(orderItem.productId)?.url
        return <OrderItem orderItem={orderItem} url={url ? url : ''}/>
      })}
      <Flex p={4} gap={8} w='full' justifyContent='end' sx={{borderWidth: '1px 0 0 0'}}>
        <Text>Всього: {' '}
          <Text fontSize={24} fontWeight='bold' display='inline'>
            {UAHFormat.format(summa)}грн.
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};

export default OrderItems;