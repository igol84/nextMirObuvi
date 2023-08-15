import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandProps} from "@/components/Brands/types";
import {BrandSchema} from "@/schemas/brands";
import {languages} from "@/locale/settings";

export async function generateStaticParams() {
  return languages.map((lang) => ({lang}))
}

async function getData(){
  const result = await fetch('https://mirobuvi.com.ua/xml_ftp/brands.json')
  if(!result.ok){
    throw new Error('Fail to fetch brands data')
  }
  return result.json()
}

const Page = async () => {
  const brandsData: BrandSchema[] = await getData()
  const brands: BrandProps[] = brandsData.map(brand=>({
    brandId: brand.id, brandName: brand.name, url: brand.url
  }))
  return (
    <Home brands={brands}/>
  );
};

export default Page;