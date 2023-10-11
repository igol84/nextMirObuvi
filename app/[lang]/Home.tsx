'use client'
import React from 'react';
import Brands from "@/components/Brands";
import {BrandCardProps} from "@/components/Brands/types";


type Props = {
  brands: BrandCardProps[]
}

const Home = ({brands}: Props) => {

  return (
      <Brands brands={brands}/>
  );
};

export default Home;