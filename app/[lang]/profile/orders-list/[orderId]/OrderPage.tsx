'use client'
import React from 'react';
import {Box, Heading, Table, TableContainer, Tbody, Td, Tr} from "@chakra-ui/react";
import {OrderWithItems} from "@/lib/db/order";
import OrderItems from "@/app/[lang]/profile/orders-list/[orderId]/OrderItems";
import {ProductDetailsByUrl} from "@/app/[lang]/make-order/types";

interface Props {
  order: OrderWithItems
  productDetailsByUrl: ProductDetailsByUrl
}

const OrderPage = ({order, productDetailsByUrl}: Props) => {

  return (
    <Box>
      <Heading>Order №{order.orderNumber}</Heading>
      <TableContainer layerStyle='orderInProfile'>
        <Table variant='unstyled'>
          <Tbody>
            <Tr>
              <Td w='30px'>Статус</Td>
              <Td>new</Td>
            </Tr>
            <Tr>
              <Td>Ім'я та прізвище</Td>
              <Td>{order.firstName} {order.lastName}</Td>
            </Tr>
            <Tr>
              <Td>Е-пошта</Td>
              <Td>{order.email}</Td>
            </Tr>
            <Tr>
              <Td>Телефон</Td>
              <Td>{order.phone}</Td>
            </Tr>
            <Tr>
              <Td>Спосіб доставки</Td>
              <Td>{order.delivery}</Td>
            </Tr>
            <Tr>
              <Td colSpan={2}>
                <OrderItems orderItems={order.orderItems} productDetailsByUrl={productDetailsByUrl}/>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderPage;