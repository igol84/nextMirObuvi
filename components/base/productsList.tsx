'use client'
import React from 'react';
import {Flex, Heading, Wrap, WrapItem} from "@chakra-ui/react";
import Product from "@/components/Products/Product";
import {ProductType} from "@/components/Products/types";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";
import {useSearchParams} from "next/navigation";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  products: ProductType[]
  paginationBar: PaginationBarProps
}

const ProductsList = ({products, paginationBar: {pageSize, totalPages, currentPage}}: Props) => {
  const d = useDictionaryTranslate("home")
  const searchParams = useSearchParams()
  if (products.length === 0) {
    return <Heading>{d('notFound')}</Heading>
  }
  const search = searchParams.get('search') ? searchParams.get('search') as string : ''
  const path = search ? `?search=${search}&` : '?'
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
        <PaginationBar currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} path={path}/>
      </Flex>
    </Flex>

  );
};

export default ProductsList;