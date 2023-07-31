import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import CounterPage from "@/app/[lang]/second-page/CounterPage";

interface Params {
  lang: Lang
}

interface Props {
  params: Params
}

const Page = async ({params: {lang}}: Props) => {
  return (
    <CounterPage/>
  );
};

export default Page;