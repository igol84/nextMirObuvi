import React from 'react';
import Brands from "@/components/Brands";
import {BrandSchema, Data} from "@/schemas/brands";
import {BrandProps} from "@/components/Brands/types";

export const revalidate = 3600

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const product: Data = await res.json()
  return product.brands
}


const BrandsPage = async () => {
  const brandsData = await getBrandsData()
  const brands: BrandProps[] = brandsData.map(brand => ({
    brandId: brand.id, brandName: brand.name, url: brand.url
  }))
  return (
    <Brands brands={brands}/>
  );
};

export default BrandsPage;