import React, {useContext} from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {ProductProps} from "@/components/Products/types";

type Props = {
  product: ProductProps
}
const ProductCard = ({product}: Props) => {
  const {name, product_key, price} = product
  const lang = useContext(LangContext)
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex flexDirection='column' gap={4}>
      <Link
        as={NextLink} href={`/${lang}/brands`}
        _hover={{}}
      >
        <ChakraNextImage
          shadow='base' borderRadius={[30, 15]} as={NextImage}
          width={249} height={249} alt={name}
          src={`https://mirobuvi.com.ua/ftp_products/${product_key}/02.jpg`}
        />
        <Center width={249}><Text>{name}</Text></Center>
        <Center alignItems='baseline' color='price'>
          <Text fontSize={24} fontWeight='bold'>
            {UAHFormat.format(price)}
          </Text>
          <Text fontSize={16} fontWeight='bold'>грн.</Text>
        </Center>
      </Link>
    </Flex>
  );
};

export default ProductCard;