"use client";
import {ShoppingCart} from "@/lib/db/cart";
import {Box, IconButton} from "@chakra-ui/react";
import {MdShoppingCart} from "react-icons/md";
import React from "react";

interface Props {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({cart}: Props) {
  return (
    <Box position='relative'>
      <IconButton
        isRound={true}
        aria-label='Cart'
        fontSize={[20, 25, 30, 35]}
        icon={<MdShoppingCart/>}
      />
      {!!cart?.cartSize && (
        <Box position='absolute' textAlign='center'
             justifyContent='center' h={5} w={6}
             borderRadius={25} right={0} top={0}
             backgroundColor={'green'} fontWeight='bold'
             _hover={{cursor: 'pointer'}}
        >
          <Box position='absolute' alignItems='center' justifyContent='center'
               left='0px' top='-1px' padding='0px 2px' w={6} fontSize='14px' whiteSpace='nowrap'>
            {cart?.cartSize}
          </Box>
        </Box>
      )}
    </Box>
  );
}
