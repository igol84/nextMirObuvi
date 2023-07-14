import React from 'react';
import Link from "next/link";
import {Dict, getDictionary} from "@/dictionaries/get-dictionary";
import LocaleSwitcher from "@/components/LocaleSwitcher";
interface Params{
  lang: Dict
}
interface Props{
  params: Params
}

const Page = async ({ params: { lang } }: Props) => {
  const dict = await getDictionary(lang)
  const d = dict["server-component"]
  return (
    <>
      <LocaleSwitcher language={lang} dictionary={dict.switcher}/>
      <h1>{d.welcome}</h1>
      <Link href={`/${lang}/second-page`}>
        {d.secondPage}
      </Link>
    </>
  );
};

export default Page;