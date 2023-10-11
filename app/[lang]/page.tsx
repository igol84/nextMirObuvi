import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandCardProps} from "@/components/Brands/types";
import {getBrandsData} from "@/app/api/fetchFunctions";


const Page = async () => {
  const brandsData = await getBrandsData()
  const brands: BrandCardProps[] = brandsData.map(brand => ({
    brandId: brand.id, brandName: brand.name, url: brand.url
  }))
  return (
    <main>
      <Home brands={brands}/>
    </main>
  );
};

export default Page;