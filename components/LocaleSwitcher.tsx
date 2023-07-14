'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {languages} from "@/locale/settings";
import {Dict} from "@/dictionaries/get-dictionary";

interface Dictionary{
  localeSwitcher: string
}
interface Props{
  language: Dict
  dictionary: Dictionary
}


export default function LocaleSwitcher({language, dictionary}: Props) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div>
      <p>{dictionary.localeSwitcher}</p>
      <ul>
        {languages.map((locale) => {
          if (locale !== language)
            return (
              <li key={locale}>
                <Link href={redirectedPathName(locale)}>{locale}</Link>
              </li>
            )
        })}
      </ul>
    </div>
  )
}
