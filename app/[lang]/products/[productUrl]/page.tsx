import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import {getProductData} from "@/app/api/fetchFunctions";
import ProductPage from "@/app/[lang]/products/[productUrl]/ProductPage";
import {ProductType} from "@/components/product/types";
import {ProductSchema} from "@/schemas/data";

type Props = {
  params: {
    productUrl: string
    lang: Lang
  }
}

export async function generateMetadata({params: {productUrl, lang}}: Props) {
  const productData = await getProductData(productUrl)
  const title = lang === 'en' ? productData.name : productData.name_ua
  return {
    title,
    openGraph: {
      images: [`https://mirobuvi.com.ua/ftp_products/${productData.product_key}/02.jpg`],
    },
  }
}

function productFabrice(lang: Lang, product: ProductSchema): ProductType{
  const name = lang==='en' ? product.name : product.name_ua
  const price_prefix = lang==='en' ? '₴' : 'грн.'
  switch (product.type) {
    case "product": {
      return {
        name, product_key: product.product_key, price: product.price, price_prefix, type: 'product',
        images: product.images
      }
    }
    case "shoes": {
      const sizes: number[] = product.sizes.map(size=>size.size)
      return {
        name, product_key: product.product_key, price: product.price, price_prefix, type: 'shoes',
        images: product.images, sizes
      }
    }
  }
}

async function Page({params: {productUrl, lang}}: Props) {
  const productFetchData = await getProductData(productUrl)
  const productData: ProductType = productFabrice(lang, productFetchData)

  return (
    <main>
      <ProductPage productData={productData}/>
    </main>
  );
}

export default Page;