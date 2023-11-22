import React, {useContext} from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {ShoesType} from "@/components/Products/types";
import Sizes from "@/components/Products/ShoesCard/Sizes";

type Props = {
  product: ShoesType
}

const ShoesCard = ({product}: Props) => {
  const {name, product_key, price, price_prefix, sizes, url} = product
  const lang = useContext(LangContext)
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex flexDirection='column' gap={4} w={product.page === 'viewed' ? [200, 249] : 249}>
      <Link as={NextLink} href={`/${lang}/products/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <ChakraNextImage
          borderRadius={[30, 15]} as={NextImage} width={0} height={0} sizes="100vw" alt={name}
          style={{width: '100%', height: 'auto'}} src={`https://mirobuvi.com.ua/ftp_products/${product_key}/02.jpg`}
        />
        <Center><Text>{name}</Text></Center>
        <Center alignItems='baseline' color='price'>
          <Text fontSize={24} fontWeight='bold'>
            {UAHFormat.format(price)}
          </Text>
          <Text fontSize={16}>{price_prefix}</Text>
        </Center>
        <Center>
          <Sizes sizes={sizes}/>
        </Center>
      </Link>
    </Flex>
  );
};

export default ShoesCard;