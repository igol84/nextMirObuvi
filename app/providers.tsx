'use client'

import React from "react";
import {SessionProvider} from 'next-auth/react'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import DictProvider from "@/dictionaries/DictProvider";
import {Dictionary} from "@/dictionaries/interface";
import LangProvider from "@/locale/LangProvider";
import {Lang} from "@/dictionaries/get-dictionary";
import theme from "@/app/theme";

export function Providers({lang, dict, children}: { lang: Lang, dict: Dictionary, children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LangProvider lang={lang}>
        <DictProvider dict={dict}>
          <CacheProvider>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
              {children}
            </ChakraProvider>
          </CacheProvider>
        </DictProvider>
      </LangProvider>
    </SessionProvider>
  )
}