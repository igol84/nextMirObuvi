import React from "react";
import SimpleProduct from "@/components/product/SimpleProduct";
import Shoes from "@/components/product/Shoes";
import {ProductType} from "@/components/product/types";

export const productFactory = (product: ProductType) => {
  switch (product.type) {
    case "product":
      return <SimpleProduct/>
    case "shoes":
      return <Shoes shoesData={product}/>
    default:
      return <SimpleProduct/>
  }
}