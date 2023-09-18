import React from 'react';
import Home from "@/app/[lang]/Home";
import {languages} from "@/locale/settings";


export async function generateStaticParams() {
  return languages.map((lang) => ({lang}))
}

const Page = async () => {
  return (
    <main>
      <Home/>
    </main>
  );
};

export default Page;