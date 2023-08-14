import React from 'react';
import Brands from "@/components/Brands";
import {Brand} from "@/schemas/brands";

async function getBrandsData(){
  const result = await fetch('https://mirobuvi.com.ua/xml_ftp/brands.json')
  if(!result.ok){
    throw new Error('Fail to fetch brands data')
  }
  return result.json()
}


const Page = async () => {
  const brands: Brand[] = await getBrandsData()
  return (
    <Brands brands={brands}/>
  );
};

export default Page;