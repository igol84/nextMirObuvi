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
      <h1>Hi from second page!</h1>
      <Link href={`/${lng}`}>
        back
      </Link>
    </>
  );
};

export default Page;