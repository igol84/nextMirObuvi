import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import Home from "@/app/[lang]/Home";
import FirstDemo from "@/components/demo/FirstDemo";
interface Params{
  lang: Lang
}
interface Props{
  params: Params
}

const Page = async ({ params: { lang } }: Props) => {
  return (
      <FirstDemo/>
  );
};

export default Page;