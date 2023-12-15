import 'server-only'

import {PaginationBarProps} from "@/components/base/PaginationBar";

type GetPageData = {
  <T>(
    items: T[],
    currentPage: number,
  ): Promise<[
    itemsSlice: T[],
    paginationBar: PaginationBarProps,
  ]>
}
const itemsOnPage = 24
export const getPageData: GetPageData = async (items:  any[], currentPage: number) => {

  const totalProductsCount = items.length
  const totalPages = Math.ceil(totalProductsCount / itemsOnPage)
  currentPage = currentPage > totalPages ? totalPages : currentPage
  const skip = (currentPage - 1) * itemsOnPage
  const itemsSlice = items.slice(skip, skip + itemsOnPage)
  const paginationBar: PaginationBarProps = {pageSize: itemsOnPage, totalPages, currentPage}

  return [itemsSlice, paginationBar]
}