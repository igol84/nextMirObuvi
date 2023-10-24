'use client'
import React from 'react';
import {Box, Heading, VStack} from "@chakra-ui/react";
import {OrderWithItems} from "@/lib/db/order";
import Order from "@/app/[lang]/profile/orders-list/Order";

interface Props {
  orders: OrderWithItems[]
}

const OrdersPage = ({orders}: Props) => {
  return (
    <Box>
      <Heading pb={4}>Orders</Heading>
      <VStack>
        {orders.map(order => <Order key={order.id} order={order}/>)}
      </VStack>
    </Box>
  );
};

export default OrdersPage;