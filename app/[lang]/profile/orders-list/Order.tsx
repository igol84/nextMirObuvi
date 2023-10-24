import React, {useContext} from 'react';
import {OrderWithItems} from "@/lib/db/order";
import {Box, Flex, ListItem, Spacer, Text, UnorderedList} from "@chakra-ui/react";
import {LangContext} from "@/locale/LangProvider";

interface Props {
  order: OrderWithItems
}

const Order = ({order}: Props) => {
  const lang = useContext(LangContext)
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  return (
    <Flex direction={{base: "column", md: "row"}} borderRadius={8} borderColor={'beige.400'} borderWidth={2}
          width={'full'} p={4} alignItems='start' gap={8}>
      <Box>
        <Text fontWeight='bold' fontSize={24}>Order Date: </Text>
        <Text>{order.createdAt.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text fontWeight='bold' fontSize={24}>Orders:</Text>
        <UnorderedList>
          {order.orderItems.map(item=>{
            summa += item.quantity*item.price
            const productName = lang==='en' ? item.productNameEn : item.productNameUa
            const size = item.size ? ' ' + item.size : ''
            return <ListItem key={item.id}>{productName}{size} — {item.quantity}шт.</ListItem>
          })}
        </UnorderedList>
      </Box>
      <Spacer/>
      <Box alignSelf='center'>{UAHFormat.format(summa)}{price_prefix}</Box>
    </Flex>
  );
};

export default Order;