'use client'
import React, {useContext} from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Counter from "@/components/Counter";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";

const CounterPage = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  return (
    <>
      <LocaleSwitcher/>
      <h1>{d('welcomeNext')}</h1>
      <Counter/>
      <Link href={`/${lang}`}>
        {d('back')}
      </Link>
    </>
  );
};

export default CounterPage;