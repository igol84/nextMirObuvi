'use client'
import React from 'react';
import {Box, Heading, VStack} from "@chakra-ui/react";
import {OrderWithItems} from "@/lib/db/order";
import Order from "@/app/[lang]/profile/orders-list/Order";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  orders: OrderWithItems[]
}

const OrdersPage = ({orders}: Props) => {
  const d = useDictionaryTranslate("orderList")
  return (
    <Box>
      <Heading pb={4}>{d('orders')}</Heading>
      <VStack>
        {orders.map(order => <Order key={order.id} order={order}/>)}
      </VStack>
    </Box>
  );
};

export default OrdersPage;