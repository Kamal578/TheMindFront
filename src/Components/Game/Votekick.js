import React, {useContext} from 'react'
import { Button, Text } from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, Box, Flex, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton } from "@chakra-ui/react"
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { SocketContext } from '../../context/SocketContext';

export default function Votekick({isOpen, onClose, voteKick}) {

  const socket = useContext(SocketContext);

  const vote = (vote) => {
    socket.emit('voteKickPlayer', {username: voteKick.kickPlayer, vote})
    onClose();
  }

  return (
    <AlertDialog
        motionPreset='slideInRight'
        onClose={ ()=>{
          vote('no')
          onClose();}}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent >
          <AlertDialogHeader bgColor={'#02162F'} color={'white'}>Votekick by {voteKick.startedBy}</AlertDialogHeader>
          <AlertDialogCloseButton color={'white'} />
          <Flex justifyContent={"space-around"} alignItems={'center'}>
            <Box w={"60%"}>
                <AlertDialogBody>
                Vote to kick {voteKick.kickPlayer}?
              </AlertDialogBody>
              <AlertDialogFooter justifyContent={"start"}>
                <Flex gap={5} color={'white'}>
                <Button bgColor='#02162F' w={'10vh'} onClick={() => vote('yes')}>
                  YES
                </Button>
                <Button bgColor='#02162F' w={'10vh'} onClick={() => vote('no')}>
                  NO
                </Button>
                </Flex>
              </AlertDialogFooter>
            </Box>
          <Box height="100%" textAlign={"center"} w={"30%"}>
            <Text mt={0}><CheckIcon color={"green"} mr={3} />{voteKick.yes}</Text>
            <Text mt={5}><CloseIcon color={"red"} mr={3} />{voteKick.no}</Text>
          </Box>
        </Flex>
        </AlertDialogContent>
      </AlertDialog>
    
  )
}
