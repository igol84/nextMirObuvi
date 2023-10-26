import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";

import OrderItem from "./OrderItem";
import {IOrderItem} from "./types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  orderItems: IOrderItem[]
}

const OrderItems = ({orderItems}: Props) => {
  const d = useDictionaryTranslate("orderList")
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex direction='column' layerStyle='orderDetails'>
      <Box p={4}>{d('yourOrder')}</Box>
      {orderItems.map((orderItem, index) => {
        summa += orderItem.price * orderItem.quantity
        return <OrderItem key={index} orderItem={orderItem}/>
      })}
      <Flex p={4} gap={8} w='full' justifyContent='end' sx={{borderWidth: '1px 0 0 0'}}>
        <Text>{d('inTotal')}: {' '}
          <Text fontSize={24} fontWeight='bold' display='inline'>
            {UAHFormat.format(summa)}{d('pricePrefix')}
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};

export default OrderItems;