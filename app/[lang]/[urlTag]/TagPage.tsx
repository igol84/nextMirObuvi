'use client'
import React from 'react';
import {Box, Heading} from "@chakra-ui/react";

interface Props{
  children: React.ReactNode
  title: string
  desc: string
}

const TagPage = ({children, title, desc}: Props) => {
  return (
    <Box>
      <Heading>{title}</Heading>
      {children}
      {desc}
    </Box>
  );
};

export default TagPage;