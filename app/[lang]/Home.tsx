'use client'
import React, {useContext} from 'react';
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const Home = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  return (
    <>
      <LocaleSwitcher/>
      <h1>asd</h1>
      <Link href={`/${lang}/second-page`}>
        {d('secondPage')}
      </Link>
    </>
  );
};

export default Home;