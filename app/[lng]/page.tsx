import React from 'react';
import Link from "next/link";
interface Params{
  lng: string
}
interface Props{
  params: Params
}

const Page = ({ params: { lng } }: Props) => {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${lng}/second-page`}>
        second page
      </Link>
    </>
  );
};

export default Page;