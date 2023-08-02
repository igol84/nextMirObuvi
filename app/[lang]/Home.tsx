'use client'
import React, {useContext} from 'react';
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Button, Heading, Link as ChakraLink, useColorMode} from "@chakra-ui/react";

const Home = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  const {toggleColorMode} = useColorMode()

  return (
    <>
      <LocaleSwitcher/>
      <Heading>asd</Heading>
      <ChakraLink as={Link} href={`/${lang}/second-page`}>
        {d('secondPage')}
      </ChakraLink>
      <Button onClick={toggleColorMode}>Theme</Button>
    </>
  );
};

export default Home;