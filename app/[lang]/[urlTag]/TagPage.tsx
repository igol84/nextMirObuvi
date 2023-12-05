'use client'
import React, {useEffect} from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";

interface Props{
  children: React.ReactNode
  title: string
  desc: string
}

const TagPage = ({children, title, desc}: Props) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams])
  return (
    <Box>
      <Heading>{title}</Heading>
      {children}
      {desc}
    </Box>
  );
};

export default TagPage;