import {TagUrlSchema} from "@/schemas/data";
import {Lang} from "@/dictionaries/get-dictionary";

export interface TagUrl {
  url: string
  submenu?: TagUrl[]
  orderNumber: number
  search: string
  desc: string
  text: string
}

export const convertToTagUrlFromDB = (tagUrlDB: TagUrlSchema, lang: Lang, submenu?: TagUrl[]): TagUrl => {
  return {
    url: tagUrlDB.url,
    submenu,
    orderNumber: tagUrlDB.order_number,
    search: lang === 'en' ? tagUrlDB.search : tagUrlDB.search_ua,
    desc: lang === 'en' ? tagUrlDB.desc : tagUrlDB.desc_ua,
    text: lang === 'en' ? tagUrlDB.text : tagUrlDB.text_ua
  }
}

export interface ParentTagForBreadCrumb {
  name: string
  url: string
}
