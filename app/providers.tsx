'use client'

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import React from "react";
import DictProvider from "@/dictionaries/DictProvider";
import {Dictionary} from "@/dictionaries/interface";
import LangProvider from "@/locale/LangProvider";
import {Lang} from "@/dictionaries/get-dictionary";


const config  = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
}
export const theme = extendTheme({config })

export async function Providers({lang, dict, children}: { lang: Lang, dict: Dictionary, children: React.ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <DictProvider dict={dict}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </DictProvider>
    </LangProvider>
  )
}