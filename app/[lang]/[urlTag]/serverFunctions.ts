import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {ParentTagForBreadCrumb, TagUrl} from "@/app/[lang]/[urlTag]/types";

export const isSinglePage = (tagData: TagUrl): boolean => tagData.search === ''

export function getBreadCrumbDataSinglePage(pageName: string): BreadCrumbData[] {
  const breadCrumbs: BreadCrumbData[] = []
  const pageCrumb: BreadCrumbData = {
    label: pageName, href: ''
  }
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}

type getBreadCrumbData = {
  (
    lang: Lang,
    pageName: string,
    parentTagForBreadCrumb?: ParentTagForBreadCrumb
  ): Promise<BreadCrumbData[]>
}

export const getBreadCrumbData: getBreadCrumbData = async (lang, pageName, parent) => {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []

  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.products, href: `/${lang}/products`
  }
  breadCrumbs.push(brandCrumb)

  if (parent) {
    const parentCrumb: BreadCrumbData = {
      label: parent.name, href: `/${lang}/${parent.url}`
    }
    breadCrumbs.push(parentCrumb)
  }

  const pageCrumb: BreadCrumbData = {
    label: pageName, href: ''
  }
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}

