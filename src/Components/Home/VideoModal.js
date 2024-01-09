import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";


function VideoModal({isOpen, onClose}) {

  return (
    <Modal
  
     isOpen={isOpen}
     onClose={onClose}
     isCentered
     motionPreset="slideInBottom"
     closeOnOverlayClick
     
     >
        <ModalOverlay/>
        <ModalContent size={''} minHeight='500px' maxWidth={'800px'} maxHeight='1000px'>
            <ModalHeader fontSize={'20px'} fontWeight='400' textAlign={'center'}>To learn the game, please check the How to Play video.</ModalHeader>
            <ModalCloseButton/>
            <ModalBody> 
                <Box
                as="iframe"
                src="https://www.youtube.com/embed/HGCYwaZUFvQ"
                width={'750px'}
                height='400px'
                allowFullScreen
                controls
                />
            </ModalBody>
        </ModalContent>
    </Modal>
  );
}

export default VideoModal;
