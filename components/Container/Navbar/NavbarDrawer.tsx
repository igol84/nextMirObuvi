import {
  Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay
} from "@chakra-ui/react";
import React from "react";
import Navbar from "@/components/Container/Navbar/index";
import {Item} from "@/components/Container/Navbar/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
type Props = {
  isOpen: boolean,
  onClose: () => void
  brandsItems: Item[]
}

const DrawerMenu = ({isOpen, onClose, brandsItems}: Props) => {
  const btnRef = React.useRef(null)
  const d = useDictionaryTranslate("home")
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{d('menu')}</DrawerHeader>

          <DrawerBody>
            <Navbar brandsItems={brandsItems} isMobile={true} onClose={onClose}/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              {d('close')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMenu