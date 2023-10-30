import React from 'react';
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {env} from "@/lib/env";

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.admin.title,
    description: dict.admin.description,
  }
}

async function AdminPage({params: {lang}}: { params: { lang: Lang } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${lang}/admin`)
  } else {
    const user = session.user;
    const admins = JSON.parse(env.ADMINS)
    if (!admins.includes(String(user.email)))
      return (
        <div>You are not admin!</div>
      )
    else {
      return (
        <div>Welcome admin!</div>
      )
    }
  }

}

export default AdminPage;