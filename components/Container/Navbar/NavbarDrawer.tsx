import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import React from "react";
import Navbar from "@/components/Container/Navbar/index";
interface Brand {
  name: string
  title: string
  desc: string
  url: string
  title_ua: string
  id: number
  desc_ua: string
  active: boolean
}
type Props = {
  isOpen: boolean,
  onClose: () => void
  brands: Brand[]
}

const DrawerExample = ({isOpen, onClose, brands}: Props) => {
  const btnRef = React.useRef(null)

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
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Navbar brands={brands} isMobile={true} onClose={onClose}/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerExample