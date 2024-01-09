import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Button, Flex } from "@chakra-ui/react";
import React from 'react'
import { useNavigate } from 'react-router';

export default function Win({isOpen, onClose}) {

    const navigate = useNavigate();

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay/>
          <ModalContent>
            <ModalHeader mb={'1vh'} borderTopRadius={'5px'} color={'white'} bgColor='#02162F' fontSize='lg' fontWeight='bold'>
              Game over
            </ModalHeader>

            <ModalBody>
               Your team won! Congratulations!
              <Flex justifyContent='center' mt={'1vh'}  alignItems='center'>
              <Button onClick={() => navigate('/lobby')}>
                Leave
              </Button>
            </Flex>
            </ModalBody>
          </ModalContent>
      </Modal>
    )
}