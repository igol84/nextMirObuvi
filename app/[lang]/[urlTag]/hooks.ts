import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {BreadCrumbData} from "@/components/base/BreadCrumb";

export const useTagsCrumbs = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("breadcrumb")

  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: d('products'),
    href: `/${lang}/products`
  }
  breadCrumbs.push(brandCrumb)
  return breadCrumbs
}