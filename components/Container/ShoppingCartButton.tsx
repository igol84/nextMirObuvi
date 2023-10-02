"use client";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";
import {MdShoppingCart} from "react-icons/md";
import React, {ReactNode} from "react";


interface Props {
  children: ReactNode
  count: number | null;
}

export default function ShoppingCartButton({children, count}: Props) {
  const {isOpen, onToggle, onClose} = useDisclosure()
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement='bottom'
    >
      <PopoverTrigger>
        <Box position='relative' onClick={onToggle}>
          <IconButton
            isRound={true}
            aria-label='Cart'
            fontSize={[20, 25, 30, 35]}
            icon={<MdShoppingCart/>}
          />
          {!!count && (
            <Box position='absolute' textAlign='center' justifyContent='center' h={5} w={6} borderRadius={25} right={0}
                 top={0} backgroundColor={'green.400'} fontWeight='bold' _hover={{cursor: 'pointer'}}
            >
              <Box position='absolute' alignItems='center' justifyContent='center' color={'teal.800'} userSelect='none'
                   left='0px' top='-1px' padding='0px 2px' w={6} fontSize='14px' whiteSpace='nowrap'>
                {count}
              </Box>
            </Box>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent  w={'auto'}>
        <PopoverHeader fontWeight='semibold'>Cart</PopoverHeader>
        <PopoverArrow/>
        <PopoverCloseButton/>
        <PopoverBody>
          {children}
        </PopoverBody>
        <PopoverFooter display='flex' justifyContent='flex-end'>
          <Button onClick={onClose}>Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
