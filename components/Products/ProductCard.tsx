import React, {useContext} from 'react';
import {Box, Center, Flex, Link} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {ProductProps} from "@/components/Products/types";
type Props = {
  product: ProductProps
}
const ProductCard = ({product}: Props) => {
  const {name, product_key} = product
  const lang = useContext(LangContext)
  return (
    <Flex flexDirection='column' alignItems='center' gap={4}>
      <Link as={NextLink} href={`/${lang}/brands`}>
        <Box borderRadius={50} borderColor={'black'}>
          <ChakraNextImage
            shadow='base' borderRadius={[30, 15]} as={NextImage}
            width={249} height={249} alt={name}
            src={`https://mirobuvi.com.ua/ftp_products/${product_key}/02.jpg`}
          />
        </Box>
        <Center>{name}</Center>
      </Link>
    </Flex>
  );
};

export default ProductCard;