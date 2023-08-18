import React from 'react';
import Brands from "@/components/Brands";
import {BrandProps} from "@/components/Brands/types";
import {getBrandsData} from "@/app/api/fetchFunctions";

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