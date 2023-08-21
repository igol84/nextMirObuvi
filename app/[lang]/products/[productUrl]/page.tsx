import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";

type Props = {
  params: {
    productUrl: string
    lang: Lang
  }
}


function Page({params: {productUrl}}: Props) {
  return (
    <div>{productUrl}</div>
  );
}

export default Page;