import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";

interface Props{
  children: React.ReactNode
  isOpen: boolean
  onClose: ()=>void
  onSubmit:()=>void
}

const DrawerMenu = ({children, isOpen, onClose, onSubmit}: Props) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader></DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={onSubmit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;