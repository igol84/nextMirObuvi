"use client";
import {Session} from "next-auth";
import {signIn, signOut} from "next-auth/react";
import {
  Avatar,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import React from "react";
import {BiUser} from "react-icons/bi";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import Link from "next/link";

interface Props {
  session: Session | null;
}

export default function UserMenuButton({session}: Props) {
  const user = session?.user;
  const {onOpen, onClose, isOpen} = useDisclosure()
  const d = useDictionaryTranslate("home")
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        {user ? (
            <Avatar name={user?.name || ''} src={user?.image || undefined} size={'sm'} sx={{cursor: 'pointer'}}/>
          )
          :
          <IconButton icon={<BiUser/>} aria-label={'user'} fontSize={[20, 25, 30, 35]} isRound={true} minW={[1, 2]}/>
        }
      </PopoverTrigger>
      <PopoverContent w='auto'>
        <PopoverArrow/>
        <PopoverBody>
          {user ? (
              <VStack align='flex-start'>
                <Link href={'/profile/orders-list'} onClick={onClose}>
                  {d('orders')}
                </Link>
                <Link href='#' onClick={() => signOut()}>
                  {d('signOut')}
                </Link>
              </VStack>
            )
            : (
              <Link href='#' onClick={() => signIn()}>
                {d('signIn')}
              </Link>
            )
          }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
