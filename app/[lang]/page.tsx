import React from 'react';
import Home from "@/app/[lang]/Home";

async function getData(){
  const result = await fetch('https://mirobuvi.com.ua/xml_ftp/brands.json')
  if(!result.ok){
    throw new Error('Fail to fetch brands data')
  }
  return result.json()
}

const Page = async () => {
  const brands = await getData()
  return (
    <Home brands={brands}/>
  );
};

export default Page;