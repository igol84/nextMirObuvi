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
      <h1>Hi there!</h1>
      <Link href={`/${lang}/second-page`}>
        second page
      </Link>
    </>
  );
};

export default Page;