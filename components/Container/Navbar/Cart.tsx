import React, {useContext} from 'react';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import {ProductCart} from "@/lib/cartFunctions";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";

import NextLink from "next/link";
import {LangContext} from "@/locale/LangProvider";

interface Props {
  cartProducts: ProductCart[]
}

const Cart = ({cartProducts}: Props) => {
  const lang = useContext(LangContext)
  return (
    <Box>
      <Heading>Shopping Cart</Heading>
      {!cartProducts && <p>Your cart is empty.</p>}
      <Flex flexDirection={'column'} gap={2} p={2}>
        {cartProducts.map((cartItem, index) => (
          <Link as={NextLink} href={`/${lang}/products/${cartItem.url}`} _hover={{color: 'hoverLinkTextColor'}}>
          <Flex key={index} gap={2}>

              <Box width={24}>
                <ChakraNextImage as={NextImage} src={cartItem.img} alt={cartItem.name} width={0} height={0}
                                 sizes="100vw"
                                 style={{width: '100%', height: 'auto'}}/>
              </Box>
              <Flex flexDirection={'column'}>
                <Box textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'} w={120}>{cartItem.name}</Box>
                <Box> {cartItem.quantity}</Box>
                <Box>{cartItem.price}</Box>
              </Flex>


          </Flex>
          </Link>
        ))}
      </Flex>
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total:
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </Box>
  );
};

export default Cart;