'use client'

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import React from "react";
import DictProvider from "@/dictionaries/DictProvider";
import {Dictionary} from "@/dictionaries/interface";
import LangProvider from "@/locale/LangProvider";
import {Lang} from "@/dictionaries/get-dictionary";
import index from "@/app/theme";
import FontsSettings from "@/app/theme/fontsSettings";


export async function Providers({lang, dict, children}: { lang: Lang, dict: Dictionary, children: React.ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <DictProvider dict={dict}>
        <FontsSettings />
        <CacheProvider>
          <ChakraProvider theme={index}>
            <ColorModeScript initialColorMode={index.config.initialColorMode}/>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </DictProvider>
    </LangProvider>
  )
}