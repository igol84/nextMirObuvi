import React from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";
import {ProductCart} from "@/lib/cartFunctions";
import CartItem from "@/components/Container/Navbar/Cart/CartItem";

interface Props {
  cartProducts: ProductCart[]
}

const Cart = ({cartProducts}: Props) => {
  const isEmpty = cartProducts.length === 0
  return (
    <Box>
      {isEmpty && <Heading p={'8px'}>'Your cart is empty.'</Heading>}
      <Flex flexDirection={'column'} gap={2} p={'8px 0'}>
        {cartProducts.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Cart;