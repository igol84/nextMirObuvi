import React, {useContext} from 'react';
import {Box, Flex, IconButton, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {formatPrice} from "@/lib/format";
import {ProductCart} from "@/lib/cartFunctions";
import {LangContext} from "@/locale/LangProvider";
import {BsFillTrashFill} from "react-icons/bs";
import {TiMinus, TiPlus} from "react-icons/ti";

interface Props {
  cartItem: ProductCart
}

const CartItem = ({cartItem}: Props) => {
  const lang = useContext(LangContext)
  return (

    <Flex gap={2}>

      <Flex alignItems={'center'}>
        <IconButton aria-label='Trash' size='sm' icon={<BsFillTrashFill/>}/>
        <Link as={NextLink} href={`/${lang}/products/${cartItem.url}`}>
          <ChakraNextImage as={NextImage} src={cartItem.img} alt={cartItem.name} width={0} height={0}
                           sizes="100vw" style={{width: '100%', height: 'auto'}}
          />
        </Link>
      </Flex>
      <Flex flexDirection={'column'}>
        <Box textOverflow={'ellipsis'} display={'block'} overflow={'hidden'} maxHeight={12} w={200}>
          <Link as={NextLink} href={`/${lang}/products/${cartItem.url}`}>
            {cartItem.name}
          </Link>
        </Box>
        {!!cartItem.size && (
          <Box> {cartItem.size}</Box>
        )}
        <Box>{formatPrice(cartItem.price, lang)}/ шт.</Box>
        <Flex justifyContent={'space-between'} alignItems={'center'} pr={1}>
          <Flex alignItems={'center'} gap={4}>
            <IconButton variant={'cart'} aria-label='Plus' size='sm' icon={<TiPlus/>}/>
            {cartItem.quantity}
            <IconButton variant={'cart'} aria-label='Minus' size='sm' icon={<TiMinus/>}/>
          </Flex>
          <Box>{formatPrice(cartItem.price * cartItem.quantity, lang)}</Box>
        </Flex>
      </Flex>
    </Flex>


  );
};

export default CartItem;