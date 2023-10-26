import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {OrderItemType} from "@/lib/db/order";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";

interface Props {
  orderItem: OrderItemType
  url: string
}

const OrderItem = ({orderItem, url}: Props) => {
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex p={4} gap={8} w='full' direction='row' sx={{borderWidth: '1px 0 0 0'}}>
      <Box>
        <ChakraNextImage
          shadow='base' borderRadius={[30, 15]} as={NextImage}
          width={249} height={249} alt={orderItem.productNameUa}
          src={`https://mirobuvi.com.ua/ftp_products/${url}/02.jpg`}
        />
      </Box>
      <Flex direction='column'>
        <Box>{orderItem.productNameUa}</Box>
        <Box>{UAHFormat.format(orderItem.price)}грн. × {orderItem.quantity} =
          <Text as='span' fontWeight='bold'> {UAHFormat.format(orderItem.price * orderItem.quantity)}грн.</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrderItem;