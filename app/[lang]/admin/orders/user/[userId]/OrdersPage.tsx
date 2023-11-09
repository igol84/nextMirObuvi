'use client'
import React, {useState} from 'react';
import {IUser} from "./types";
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import Order from "./Order";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {DndContext, DragOverEvent} from "@dnd-kit/core";

interface Props {
  user: IUser
}

const OrdersPage = ({user}: Props) => {
  const d = useDictionaryTranslate("orderList")
  const summa = user.orders.reduce((total, order) =>
      total + order.orderItems.reduce((total, item) =>
          total + item.quantity * item.price
        , 0)
    , 0)
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const [draggableProduct, setDraggableProduct] = useState<string | null>(null)
  const onDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const draggedOrder = event.active.id as string
      setDraggableProduct(draggedOrder)
    }
  }

  return (
    <Box>
      <Flex alignItems='center' wrap='wrap' gap={[2, 3, 4, 6]} direction={{base: 'column', md: 'row'}}
            justifyContent='center' p={2}>
        <Avatar name={user.name || ''} src={user.image || undefined} size={'sm'} sx={{cursor: 'pointer'}}/>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>Замовлень: {user.orders.length}</Text>
        <Text>Сумма заказа: {UAHFormat.format(summa)}{d('pricePrefix')}</Text>
      </Flex>
      <Box>
        <DndContext onDragOver={onDragOver} id='orders'>
          {user.orders.map(order => (
            <Order key={order.id} order={order} draggableProduct={draggableProduct}/>
          ))}
        </DndContext>
      </Box>
    </Box>
  )
}

export default OrdersPage