import React, {useContext} from 'react';
import {Box, Flex, Link} from "@chakra-ui/react";
import {IOrder} from "./types";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import NextLink from "next/link";
import {Icon} from "@chakra-ui/icons";
import {AiFillEdit} from "react-icons/ai";
import {BiUser} from 'react-icons/bi';
import Product from "./Product";
import {useDroppable} from "@dnd-kit/core";

interface Props {
  order: IOrder
  isUserPage?: boolean
}

const Order = ({order, isUserPage = false}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const summa = order.orderItems.reduce((total, item) =>
      total + item.quantity * item.price
    , 0)
  const {isOver, setNodeRef} = useDroppable({id: order.id});
  const sx = isOver ? {
    bgColor: 'green.200',
    _dark: {
      bgColor: 'green.500',
    }
  } : {}
  return (
    <Box layerStyle='adminOrderWithItems' boxShadow='2xl' ref={setNodeRef}>
      <Flex layerStyle='adminOrder' sx={sx} direction={{base: "column", md: "row"}}>
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
        <Box>{UAHFormat.format(summa)}{d('pricePrefix')}</Box>
      </Flex>
      <Flex direction="column" p={2} gap={2}>
        {order.orderItems.map(item => (
          <Product key={item.id} item={item}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Order;