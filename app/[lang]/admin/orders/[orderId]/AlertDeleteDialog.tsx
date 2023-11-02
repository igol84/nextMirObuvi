import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import {AiFillDelete} from "react-icons/ai";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  onDelete: () => void
}

const AlertDeleteDialog = ({onDelete}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef(null)
  const d = useDictionaryTranslate("orderForm")
  return (
    <>
      <Button variant='solid' bgColor={'red.600'} colorScheme='red' onClick={onOpen} leftIcon={<AiFillDelete/>}>
        {d('delete')}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {d('deleteOrder')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {d('sure')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {d('cancel')}
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                {d('delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
};

export default AlertDeleteDialog;