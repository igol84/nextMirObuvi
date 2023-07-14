import React from 'react';
import Link from "next/link";
import {Dict, getDictionary} from "@/dictionaries/get-dictionary";
import LocaleSwitcher from "@/components/localeSwitcher";
interface Params{
  lang: Dict
}
interface Props{
  params: Params
}

const Page = async ({ params: { lang } }: Props) => {
  const d = await getDictionary(lang).then(dict=> dict["server-component"])
  return (
    <>
      <LocaleSwitcher  locale={lang}/>
      <h1>{d.welcomeNext}</h1>
      <Link href={`/${lang}`}>
        {d.back}
      </Link>
    </>
  );
};

export default Page;