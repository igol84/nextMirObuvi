import React from 'react';
import {Button, ButtonGroup, IconButton} from "@chakra-ui/react";
import _ from "lodash";
import {useRouter} from "next/navigation";
import {BiFirstPage, BiLastPage} from "react-icons/bi";

export interface PaginationBarProps {
  currentPage: number
  totalPages: number
  pageSize: number
}

const PaginationBar = ({currentPage, totalPages, pageSize}: PaginationBarProps) => {
  const router = useRouter()
  const maxPage = Math.min(totalPages, Math.max(currentPage + 3, pageSize));
  const minPage = Math.max(1, Math.min(currentPage - 3, maxPage - pageSize - 1));
  const pagesArray = _.range(minPage, maxPage + 1)
  const isFirstPage = currentPage === 1
  const variantFirstPage = isFirstPage ? "Selected" : ""
  const isLastPage = currentPage === totalPages
  const variantLastPage = isLastPage ? "Selected" : ""
  const onClick = (page: number, isCurrentPage: boolean) => {
    if (isCurrentPage)
      return
    router.push('?page=' + page)
  }
  return (
    <ButtonGroup size='sm' isAttached width='full' justifyContent='center'>
      <IconButton aria-label='First Page' icon={<BiFirstPage/>} variant={'pagination' + variantFirstPage}
                  onClick={() => onClick(1, isFirstPage)}/>
      {pagesArray.map(page => {
        const isCurrentPage = currentPage === page
        const variant = isCurrentPage ? "Selected" : ""
        return (
          <Button key={page} variant={'pagination' + variant} onClick={() => onClick(page, isCurrentPage)}>
            {page}
          </Button>
        )
      })}
      <IconButton aria-label='Last Page' icon={<BiLastPage/>} variant={'pagination' + variantLastPage}
                  onClick={() => onClick(totalPages, isLastPage)}/>
    </ButtonGroup>
  );
};

export default PaginationBar;