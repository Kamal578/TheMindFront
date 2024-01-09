import { Flex, Text, Tooltip } from "@chakra-ui/react"
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import './font.css';

const ThrowingStar = ({star}) => {

    const socket = useContext(SocketContext);

    const startThrowingStarVote = () => {
        socket.emit('throwingStarVoteStart');
    }


    return (
        <Flex fontSize={'8xl'} color={'white'} onClick={startThrowingStarVote} bgImage={'/images/throwingStar.png'} bgSize={'cover'} w={'15vh'} h={'22.5vh'} justifyContent={'center'} alignItems={'center'}>
            <Tooltip label={`Your team has ${star} throwing stars`}>
                <Text ml={'1vh'} textShadow={'2px 2px 2px black'} textAlign={'center'} fontFamily={'Sleman'}>{star}</Text>
            </Tooltip>
        </Flex>
            
    )
}

export default ThrowingStar;