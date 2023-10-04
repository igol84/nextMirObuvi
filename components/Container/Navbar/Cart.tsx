import React from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";
import {ProductCart} from "@/lib/cartFunctions";
import CartItem from "@/components/Container/Navbar/CartItem";

interface Props {
  cartProducts: ProductCart[]
}

const Cart = ({cartProducts}: Props) => {
  return (
    <Box>
      <Heading p={'8px'}>Shopping Cart</Heading>
      {!cartProducts && <p>Your cart is empty.</p>}
      <Flex flexDirection={'column'} gap={2} p={'8px 0'}>
        {cartProducts.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Cart;