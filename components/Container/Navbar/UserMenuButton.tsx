"use client";
import {Session} from "next-auth";
import {signIn, signOut} from "next-auth/react";
import {
  Avatar,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from "@chakra-ui/react";
import React from "react";
import {BiUser} from "react-icons/bi";

interface Props {
  session: Session | null;
}

export default function UserMenuButton({session}: Props) {
  const user = session?.user;

  return (
    <Popover>
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
              <Button onClick={() => signOut()}>
                Sign Out
              </Button>
            )
            : (
              <Button onClick={() => signIn()}>
                Sign In
              </Button>
            )
          }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
