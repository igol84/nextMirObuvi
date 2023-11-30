'use client'
import React from 'react';
import {Flex, Wrap, WrapItem} from "@chakra-ui/react";
import Product from "@/components/Products/Product";
import {ProductType} from "@/components/Products/types";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";

interface Props {
  products: ProductType[]
  paginationBar: PaginationBarProps
}

const ProductsPage = ({products, paginationBar: {pageSize, totalPages, currentPage}}: Props) => {
  return (
    <Flex flexDirection='column' gap={4} pb={{base: 4, sm: 0}}>
      <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[0, 0, 0, 1, 0]}>
        {products.map(product => {
          return (
            <WrapItem as='article' key={product.id}>
              <Product product={product}/>
            </WrapItem>
          )
        })}
      </Wrap>
      <Flex w='full' justifyContent='center'>
        <PaginationBar currentPage={currentPage} totalPages={totalPages} pageSize={pageSize}/>
      </Flex>

    </Flex>

  );
};

export default ProductsPage;