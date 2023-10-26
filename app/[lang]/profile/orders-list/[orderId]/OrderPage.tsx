'use client'
import React from 'react';
import {Box, Heading, Table, TableContainer, Tbody, Td, Tr} from "@chakra-ui/react";
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
      <TableContainer layerStyle='orderInProfile'>
        <Table variant='unstyled'>
          <Tbody>
            <Tr>
              <Td w='30px'>{d('status')}</Td>
              <Td>new</Td>
            </Tr>
            <Tr>
              <Td>{d('firstLastName')}</Td>
              <Td>{order.firstName} {order.lastName}</Td>
            </Tr>
            <Tr>
              <Td>Е-mail</Td>
              <Td>{order.email}</Td>
            </Tr>
            <Tr>
              <Td>{d('phoneNumber')}</Td>
              <Td>{order.phone}</Td>
            </Tr>
            <Tr>
              <Td>{d('delivery')}</Td>
              <Td>{order.delivery}</Td>
            </Tr>
            <Tr>
              <Td colSpan={2}>
                <OrderItems orderItems={order.orderItems}/>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderPage;