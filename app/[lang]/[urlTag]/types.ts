import {TagUrlSchema} from "@/schemas/data";
import {Lang} from "@/dictionaries/get-dictionary";

export interface TagUrl {
  url: string
  search: string
  desc: string
  text: string
}

export const convertToTagUrlFromDB = (tagUrlDB: TagUrlSchema, lang: Lang): TagUrl => {
  return {
    url: tagUrlDB.url,
    search: lang === 'en' ? tagUrlDB.search : tagUrlDB.search_ua,
    desc: lang === 'en' ? tagUrlDB.desc : tagUrlDB.desc_ua,
    text: lang === 'en' ? tagUrlDB.text : tagUrlDB.text_ua
  }
}