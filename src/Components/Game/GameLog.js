import { Flex, Box, Button } from "@chakra-ui/react";
import React from "react";
import { Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody } from "@chakra-ui/react"
import './font.css'
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

const GameLog = ({messages}) => {

    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const leaveGame = () => {
        socket.emit('leaveGame');
        navigate('/lobby');
    }


    return (
        <Flex w={'22.5vh'} ml={'-5vh'} mt={'5vh'} h={'15vh'} justifyContent='center' flexDirection={'column'}>
            <Box bgColor={'white'} borderTopRadius={'5px'} textAlign={'center'}>Game log</Box>
            <Flex className={'terminal'} bgColor={'black'} height={'full'} flexDirection={'column'} overflow={'auto'} fontFamily={'VT123'}>
               
                {messages.map((message, index) => {
                    return (
                        <Flex key={index} color={message.status ? 'green' :'red'}>{message.message}</Flex>
                    )
                })}
               
            </Flex>
            <Popover>
                <PopoverTrigger>
                <Button mt={'5%'} w={'50%'} ml={'auto'} mr={'auto'} _hover={{bgGradient: 'linear(to-l, #0D366A, #01162F)'}} color='white' bgGradient='linear(to-l, #0D366A, #01162F)' >Leave</Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                    <PopoverHeader>Are you sure you want to leave?</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody >
                        <Flex justifyContent={'center'} alignItems='center'>
                            <Button size='xs' colorScheme='red' onClick={leaveGame}>Yes I'm sure</Button>
                        </Flex>
                    </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>
    )

}

export default GameLog;