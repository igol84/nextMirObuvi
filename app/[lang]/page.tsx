import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandProps} from "@/components/Brands/types";
import {languages} from "@/locale/settings";
import {getBrandsData} from "@/app/[lang]/brands/page";

export async function generateStaticParams() {
  return languages.map((lang) => ({lang}))
}

const Page = async () => {
  const brandsData = await getBrandsData()
  const brands: BrandProps[] = brandsData.map(brand => ({
    brandId: brand.id, brandName: brand.name, url: brand.url
  }))
  return (
    <Home brands={brands}/>
  );
};

export default Page;