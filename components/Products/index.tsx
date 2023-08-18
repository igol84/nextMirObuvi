import React from 'react';
import {ProductProps} from "@/components/Products/types";

type Props = {
  products: ProductProps[]
}

const Products = ({products}: Props) => {
  return (
    <div>
      {products.map(product=>{
        return (
          <div>{product.name}</div>
        )
      })}
    </div>
  );
};

export default Products;