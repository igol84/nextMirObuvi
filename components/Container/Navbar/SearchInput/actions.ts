'use server'

import {redirect} from "next/navigation";
import {checkDictionary} from "@/dictionaries/get-dictionary";

export default async function submit(data: FormData) {
  const search = data.get('search')?.toString()
  const lang = data.get('lang')?.toString()
  const checkedLang = checkDictionary(lang ? lang : '')
  if (search)
    redirect(`/${checkedLang}/products?search=${encodeURI(search)}`)
}