'use client'
import {Box} from "@chakra-ui/react";
import React from 'react';
import {IOrder} from "./types";
import Order from "./Order";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";

interface Props {
  orders: IOrder[]
  pagination: PaginationBarProps
}

const OrdersPage = ({orders, pagination: {currentPage, totalPages, pageSize}}: Props) => {
  return (
    <Box>
      <Box pb={2}>
        <PaginationBar currentPage={currentPage} totalPages={totalPages} pageSize={pageSize}/>
      </Box>
      {orders.map(order => <Order key={order.id} order={order}/>)}
      <Box pt={2}>
        <PaginationBar currentPage={currentPage} totalPages={totalPages} pageSize={pageSize}/>
      </Box>
    </Box>
  );
};

export default OrdersPage;