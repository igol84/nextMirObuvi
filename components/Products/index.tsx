import React from 'react';
import {ProductProps} from "@/components/Products/types";
import {Wrap, WrapItem} from "@chakra-ui/react";
import ProductCard from "@/components/Products/ProductCard";

type Props = {
  products: ProductProps[]
}

const Products = ({products}: Props) => {
  return (
    <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {products.map(product=>{
        return (
          <WrapItem key={product.id}>
            <ProductCard product={product}/>
          </WrapItem>
        )
      })}
    </Wrap>
  );
};

export default Products;