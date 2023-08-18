import React from 'react';
import Brands from "@/components/Brands";
import {BrandSchema} from "@/schemas/brands";
import {BrandProps} from "@/components/Brands/types";

export const revalidate = 3600

export async function getBrandsData(): Promise<BrandSchema[]> {
  const res = await fetch(`https://mir-obuvi.vercel.app/api/brands`)
  return await res.json()
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