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
import React, {useContext} from "react";
import {BiUser} from "react-icons/bi";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import Link from "next/link";
import {IsAdminContext} from "@/app/providers";

interface Props {
  session: Session | null;
}

export default function UserMenuButton({session}: Props) {
  const user = session?.user;
  const {onOpen, onClose, isOpen} = useDisclosure()
  const d = useDictionaryTranslate("home")
  const isAdmin = useContext(IsAdminContext)
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} autoFocus={false}>
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
                {isAdmin && (
                  <Link href={'/admin'} onClick={onClose}>
                    {d('admin')}
                  </Link>
                )}
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
