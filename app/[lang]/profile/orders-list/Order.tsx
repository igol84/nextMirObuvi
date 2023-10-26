import React, {useContext} from 'react';
import {OrderWithItems} from "@/lib/db/order";
import {Badge, Box, Flex, ListItem, Spacer, Text, UnorderedList} from "@chakra-ui/react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useRouter} from "next/navigation";

interface Props {
  order: OrderWithItems
}

const Order = ({order}: Props) => {
  const lang = useContext(LangContext)
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const d = useDictionaryTranslate("orderList")
  const router = useRouter();
  const onClick = () => {
    router.push(`/${lang}/profile/orders-list/${order.id}`, {scroll: false})
  }
  return (
    <Flex direction={{base: "column", md: "row"}} onClick={onClick} layerStyle='ordersInProfile'>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{d('order')} №{order.orderNumber} </Text>
        <Text>{order.createdAt.toLocaleString()}</Text>
      </Box>
      <Box>
        <Badge ml='1' colorScheme='green'>
          New
        </Badge>
      </Box>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{d('orders')}:</Text>
        <UnorderedList>
          {order.orderItems.map(item => {
            summa += item.quantity * item.price
            const productName = lang === 'en' ? item.productNameEn : item.productNameUa
            const size = item.size ? ' ' + item.size : ''
            return <ListItem key={item.id}>{productName}{size} — {item.quantity}{d('PC')}</ListItem>
          })}
        </UnorderedList>
      </Box>
      <Spacer/>
      <Box alignSelf='center'>{UAHFormat.format(summa)}{d('pricePrefix')}</Box>
    </Flex>
  );
};

export default Order;