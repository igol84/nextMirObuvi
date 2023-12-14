'use client'
import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";

interface Props {
  children?: React.ReactNode
  desc: string
  breadCrumbs: BreadCrumbData[]
}

const TagPage = ({children = undefined, desc, breadCrumbs}: Props) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
  return (
    <Box>
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      {children}
      <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
    </Box>
  );
};

export default TagPage;