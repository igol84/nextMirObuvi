'use client'
import React, {useContext} from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Counter from "@/components/Counter";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";
import Carousel from "@/components/Carousel";
import {Box} from "@chakra-ui/react";

const CounterPage = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  return (
    <>
      <Box w={[200, 500, 600]}><Carousel/></Box>

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