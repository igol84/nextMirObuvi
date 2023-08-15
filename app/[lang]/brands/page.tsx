import React from 'react';
import Brands from "@/components/Brands";
import {BrandSchema} from "@/schemas/brands";
import {BrandProps} from "@/components/Brands/types";

export async function getBrandsData(){
  const result = await fetch('https://mirobuvi.com.ua/xml_ftp/brands.json')
  if(!result.ok){
    throw new Error('Fail to fetch brands data')
  }
  return result.json()
}


const BrandsPage = async () => {
  const brandsData: BrandSchema[] = await getBrandsData()
  const brands: BrandProps[] = brandsData.map(brand=>({
    brandId: brand.id, brandName: brand.name, url: brand.url
  }))
  return (
    <Brands brands={brands}/>
  );
};

export default BrandsPage;