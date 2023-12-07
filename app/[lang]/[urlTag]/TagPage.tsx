'use client'
import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";

interface Props {
  children: React.ReactNode
  desc: string
}

const TagPage = ({children, desc}: Props) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
  return (
    <Box>
      {children}
      <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
    </Box>
  );
};

export default TagPage;