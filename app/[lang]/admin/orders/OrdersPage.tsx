'use client'
import {Box} from "@chakra-ui/react";
import React from 'react';
import {IOrder} from "./types";
import Order from "./Order";

interface Props {
  orders: IOrder[]
}

const OrdersPage = ({orders}: Props) => {
  return (
    <Box>
      {orders.map(order => <Order key={order.id} order={order}/>)}
    </Box>
  );
};

export default OrdersPage;