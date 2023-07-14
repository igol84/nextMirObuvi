'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {languages} from "@/locale/settings";
import {Dict} from "@/dictionaries/get-dictionary";

interface Props {
  locale: Dict
}

export default function LocaleSwitcher({locale: currentLocale}: Props) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {languages.map((locale) => {
          if (locale !== currentLocale)
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
