import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {BreadCrumbData} from "@/components/base/BreadCrumb";

export const useBrandCrumbs = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("breadcrumb")

  const breadCrumbs: BreadCrumbData[] = []
  const productsCrumb: BreadCrumbData = {
    label: d('products'),
    href: `/${lang}/products`
  }
  breadCrumbs.push(productsCrumb)
  return breadCrumbs
}