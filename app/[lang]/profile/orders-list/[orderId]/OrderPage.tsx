'use client'
import React from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";
import OrderItems from "@/app/[lang]/profile/orders-list/[orderId]/OrderItems";
import {IOrder} from "@/app/[lang]/profile/orders-list/[orderId]/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


interface Props {
  order: IOrder
}

const OrderPage = ({order}: Props) => {
  const d = useDictionaryTranslate("orderList")
  return (
    <Box>
      <Heading>{d('order')} №{order.orderNumber}</Heading>
      <Flex direction='column' layerStyle='orderInProfile' p={{base: 4, sm: 8}}>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{d('status')}</Box>
          <Box>new</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{d('firstLastName')}</Box>
          <Box>{order.firstName} {order.lastName}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>Е-mail</Box>
          <Box>{order.email}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{d('phoneNumber')}</Box>
          <Box>{order.phone}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{d('delivery')}</Box>
          <Box>{order.delivery}</Box>
        </Flex>
        <OrderItems orderItems={order.orderItems}/>
      </Flex>
    </Box>
  );
};

export default OrderPage;