import React, {useContext} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {LangContext} from "@/locale/LangProvider";
import {useRouter} from "next/navigation";
import {IOrderItem} from "@/app/[lang]/profile/orders-list/[orderId]/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  orderItem: IOrderItem
}

const OrderItem = ({orderItem}: Props) => {
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const lang = useContext(LangContext)
  const productName = lang === 'en' ? orderItem.productNameEn: orderItem.productNameUa
  const router = useRouter();
  const onClick = () => {
    router.push(`/${lang}/products/${orderItem.url}`, {scroll: false})
  }
  const size = orderItem.size ? ' ' + orderItem.size : ''
  return (
    <Flex p={4} gap={8} w='full' direction='row' sx={{borderWidth: '1px 0 0 0'}}>
      <Box  onClick={onClick} sx={{cursor: 'pointer'}}>
        <ChakraNextImage
          shadow='base' borderRadius={[30, 15]} as={NextImage}
          width={249} height={249} alt={productName}
          src={`https://mirobuvi.com.ua/ftp_products/${orderItem.imgUrl}/02.jpg`}
        />
      </Box>
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