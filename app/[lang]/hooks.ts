import useSWR from "swr";
import {fetchAllBrands} from "@/services/getBrands";

export const useBrands = () => {
  const {data, error, isLoading} = useSWR('brands', fetchAllBrands)
  return {
    brands: data,
    isLoading,
    isError: error,
  }
}