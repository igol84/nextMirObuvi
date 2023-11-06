import React, {useContext} from 'react';
import {Box, Divider, Flex, Link} from "@chakra-ui/react";
import {IOrder} from "@/app/[lang]/admin/orders/types";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import NextLink from "next/link";
import {Icon} from "@chakra-ui/icons";
import {AiFillEdit} from "react-icons/ai";
import {BiUser} from 'react-icons/bi';

interface Props {
  order: IOrder
  isUserPage?: boolean
}

const Order = ({order, isUserPage = false}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  let sum = 0
  const products = order.orderItems.map((item, index) => {
    sum += item.quantity * item.price
    const productName = lang === 'en' ? item.productNameEn : item.productNameUa
    const size = item.size ? ' ' + item.size : ''
    return (
      <Box key={index}>
        <Link as={NextLink} href={`/${lang}/products/${item.url}`} display='flex' alignItems='center'
              _hover={{color: 'hoverLinkTextColor'}}
        >
          <ChakraNextImage
            as={NextImage} src={`https://mirobuvi.com.ua/ftp_products/${item.imgUrl}/02.jpg`}
            alt={'image'} width={49} height={49} sizes="100vw" borderRadius={[30, 15]}
          />
          {productName}
          {size} — {UAHFormat.format(item.price)}{d('pricePrefix')} {item.quantity}{d('PC')}
        </Link>
      </Box>
    )
  })

  return (
    <Box layerStyle='adminOrderWithItems' boxShadow='2xl'>
      <Flex layerStyle='adminOrder' direction={{base: "column", md: "row"}}>
        <Flex justifyContent='center' gap={2}>
          №{order.orderNumber}
          <Link as={NextLink} href={`/${lang}/admin/orders/${order.id}`}>
            <Icon as={AiFillEdit} boxSize={6}/>
          </Link>
          {!!order.userId && !isUserPage && (
            <Link as={NextLink} href={`/${lang}/admin/orders/user/${order.userId}`}>
              <Icon as={BiUser} boxSize={6}/>
            </Link>
          )}
        </Flex>
        <Box>{order.createdAt.toLocaleString()}</Box>
        <Box>{order.firstName} {order.lastName}</Box>
        <Box>{order.phone}</Box>
        <Box>{order.delivery}</Box>
        {!!order.email && <Box>{order.email}</Box>}
        <Box>{UAHFormat.format(sum)}{d('pricePrefix')}</Box>
      </Flex>
      <Divider/>
      <Flex direction="column" p={2} gap={2}>{products}</Flex>
    </Box>
  );
};

export default Order;