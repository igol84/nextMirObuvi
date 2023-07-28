import 'server-only'
import {defaultLanguage} from "@/locale/settings";
// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ua: async () => await import('./ua.json').then((module) => module.default),
  ru: async () => await import('./ru.json').then((module) => module.default)
}
export type Dict = keyof typeof dictionaries
export const getDictionary = async (locale: Dict) => {
  return dictionaries[Object.keys(dictionaries).includes(locale) ? locale : defaultLanguage]()
};