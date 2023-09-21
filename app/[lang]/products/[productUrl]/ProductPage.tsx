'use client'
import {ProductType} from "@/components/product/types";
import {productFactory} from "@/components/product/ProductFactory";
import React from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import Gallery from "@/components/product/Galarey";


type Props = {
  productData: ProductType
}
const IMAGES = ['03', '13', '23', '33']
const ProductPage = ({productData}: Props) => {
  const product = productFactory(productData)
  const images = productData.images.filter(url=> IMAGES.some(name => url.includes(name)))
  return (
    <>
      <Flex flexDirection={{base: 'column', lg: 'row'}} pb={8}>
        <Box w={{base: '100%', lg: '60%'}}>
          <Gallery images={images}/>
        </Box>
        <Box w={{base: '100%', lg: '38%'}}>
          {product}
        </Box>
      </Flex>
      <Heading>{productData.name}</Heading>
      <div className='desc' dangerouslySetInnerHTML={{__html: productData.desc}}/>
    </>
  )
};

export default ProductPage;