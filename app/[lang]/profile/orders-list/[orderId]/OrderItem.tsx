import React, {useContext} from 'react';
import {Box, Flex, Link, Text} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {LangContext} from "@/locale/LangProvider";
import {IOrderItem} from "@/app/[lang]/profile/orders-list/[orderId]/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import NextLink from "next/link";

interface Props {
  orderItem: IOrderItem
}

const OrderItem = ({orderItem}: Props) => {
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const lang = useContext(LangContext)
  const productName = lang === 'en' ? orderItem.productNameEn : orderItem.productNameUa

  const size = orderItem.size ? ' ' + orderItem.size : ''
  return (
    <Flex p={4} gap={8} w='full' direction='row' sx={{borderWidth: '1px 0 0 0'}}>
      <Link
        as={NextLink} href={`/${lang}/products/${orderItem.url}`}
        _hover={{color: 'hoverLinkTextColor'}}
      >
        <ChakraNextImage
          shadow='base' borderRadius={[30, 15]} as={NextImage}
          width={249} height={249} alt={productName}
          src={`https://mirobuvi.com.ua/ftp_products/${orderItem.imgUrl}/02.jpg`}
        />
      </Link>
      <Flex direction='column'>
        <Box>{productName}{size}</Box>
        <Box>{UAHFormat.format(orderItem.price)}{d('pricePrefix')} × {orderItem.quantity} = {' '}
          <Text as='span' fontWeight='bold'>
            {UAHFormat.format(orderItem.price * orderItem.quantity)}{d('pricePrefix')}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrderItem;