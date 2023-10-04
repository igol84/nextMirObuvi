"use client";
import {
  Box, Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter,
  PopoverHeader, PopoverTrigger, useDisclosure
} from "@chakra-ui/react";
import {MdShoppingCart} from "react-icons/md";
import React, {ReactNode, useContext} from "react";
import ScrollingBox from "@/components/base/ScrollingBox";
import {TotalData} from "@/components/Container/Navbar/functions";
import {formatPrice} from "@/lib/format";
import {LangContext} from "@/locale/LangProvider";


interface Props {
  children: ReactNode
  totalData: TotalData
}

export default function ShoppingCartButton({children, totalData}: Props) {
  const {isOpen, onToggle, onClose} = useDisclosure()
  const lang = useContext(LangContext)
  return (
    <Popover isOpen={isOpen} onClose={onClose} placement='bottom' >
      <PopoverTrigger>
        <Box position='relative' onClick={onToggle}>
          <IconButton isRound={true} aria-label='Cart' fontSize={[20, 25, 30, 35]} icon={<MdShoppingCart/>} />
          {!!totalData.count && (
            <Box position='absolute' textAlign='center' justifyContent='center' h={5} w={6} borderRadius={25} right={0}
                 top={0} backgroundColor={'green.400'} fontWeight='bold' _hover={{cursor: 'pointer'}}
            >
              <Box position='absolute' alignItems='center' justifyContent='center' color={'teal.800'} userSelect='none'
                   left='0px' top='-1px' padding='0px 2px' w={6} fontSize='14px' whiteSpace='nowrap'>
                {totalData.count}
              </Box>
            </Box>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w={400}>
        <PopoverHeader fontWeight='semibold'>Cart</PopoverHeader>
        <PopoverArrow/>
        <PopoverCloseButton/>
        <PopoverBody p={'6px 0px'}>
          <ScrollingBox display={'block'} overflowY={'auto'} maxH={80}>
            {children}
          </ScrollingBox>
        </PopoverBody>
        <PopoverFooter display='flex' alignItems='center' justifyContent='space-between'>
          <Box fontWeight='bold'>
            Total: {formatPrice(totalData.total, lang)}
          </Box>
          <Button onClick={onClose}>Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
