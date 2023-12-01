import React, {useContext, useEffect, useState} from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightAddon} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {usePathname, useSearchParams} from "next/navigation";
import submit from "@/components/Container/Navbar/SearchInput/actions";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const isProductsPage = (path: string): boolean => {
  return path.includes('products')
}
const SearchInput = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("home")
  const params = useSearchParams()
  const searchParams = params.get('search') ? params.get('search') as string : ''
  const [searchValue, setSearchValue] = useState(searchParams)
  const onChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  const pathname = usePathname()
  useEffect(() => {
    if (!isProductsPage(pathname))
      setSearchValue('')
  }, [pathname])
  return (
    <form action={submit}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.600"/>
        </InputLeftElement>
        <Input name='search' value={searchValue} onChange={onChange} borderRadius={8} type="text"
               placeholder={`${d('search')}...`}/>
        <input name='lang' type='hidden' defaultValue={lang}/>
        <InputRightAddon p={0} border="none" borderEndRadius={8}>
          <Button type='submit'>
            {d('search')}
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  )
}

export default SearchInput;