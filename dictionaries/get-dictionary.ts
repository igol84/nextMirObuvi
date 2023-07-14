import 'server-only'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ua: () => import('./ua.json').then((module) => module.default),
  ru: () => import('./ru.json').then((module) => module.default)
}
export type Dict = keyof typeof dictionaries
export const getDictionary = async (locale: Dict) => dictionaries[locale]()
