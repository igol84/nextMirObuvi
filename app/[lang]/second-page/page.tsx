import React from 'react';
import Link from "next/link";
interface Params{
  lang: string
}
interface Props{
  params: Params
}

const Page = ({ params: { lang } }: Props) => {
  return (
    <>
      <h1>Hi from second page!</h1>
      <Link href={`/${lang}`}>
        back
      </Link>
    </>
  );
};

export default Page;