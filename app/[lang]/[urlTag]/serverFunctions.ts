import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";

export function getBreadCrumbData(pageName: string): BreadCrumbData[]  {
  const breadCrumbs: BreadCrumbData[] = []
  const pageCrumb: BreadCrumbData = {
    label: pageName,
    href: ''
  }
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}