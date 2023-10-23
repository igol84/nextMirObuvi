import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


type Props = {
  initial: boolean
}

const SuccessOrderDialog = ({initial}: Props) => {
  const d = useDictionaryTranslate("orderForm")
  const [IsOpen, setIsOpen] = useState(initial)
  const onClose = () => setIsOpen(false)
  return (
    <Modal closeOnOverlayClick={false} isOpen={IsOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{d('dialogSuccessHeader')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text fontWeight='bold' mb='1rem' dangerouslySetInnerHTML={{__html: d('dialogSuccessBody')}}></Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessOrderDialog;