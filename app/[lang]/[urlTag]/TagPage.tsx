'use client'
import React, {useEffect} from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {saveViewedProducts} from "@/app/[lang]/products/[productUrl]/functions";

interface Props{
  children: React.ReactNode
  title: string
  desc: string
}

const TagPage = ({children, title, desc}: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    saveViewedProducts(title)
  }, [title])
  return (
    <Box>
      <Heading>{title}</Heading>
      {children}
      {desc}
    </Box>
  );
};

export default TagPage;