import React from 'react';
import Brands from "@/components/Brands";
import {BrandSchema} from "@/schemas/brands";
import {BrandProps} from "@/components/Brands/types";

export const revalidate = 3600

export async function getBrandsData(): Promise<BrandSchema[]> {
  const result = await fetch(`http://localhost:3000/api/brands`)
  if (!result.ok) {
    throw new Error('Fail to fetch brands data')
  }
  return await result.json()
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