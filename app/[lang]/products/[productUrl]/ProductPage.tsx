'use client'
import {ProductType} from "@/components/product/types";
import {productFactory} from "@/components/product/ProductFactory";

type Props = {
  productData: ProductType
}

const ProductPage = ({productData}: Props) => {
  const product = productFactory(productData)
  return (
    <>
      {product}
    </>
  )
};

export default ProductPage;