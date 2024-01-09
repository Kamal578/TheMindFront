import React, { useContext, useEffect, useState } from "react";
import {Box, Center, Flex, Spacer} from "@chakra-ui/react";
import Deck from "./Deck";
import Card from "./Card";
import 'animate.css'
import TopRow from "./TopRow";
import LeftRow from "./LeftRow";
import RightRow from "./RightRow";
import { SocketContext } from "../../context/SocketContext";
import LifeCard from "./LifeCard";
import ThrowingStar from "./ThrowingStar";
import GameLog from "./GameLog";
import Votekick from "./Votekick";
import { useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router";
import ThrowingStartAlert from "./ThrowingStarAlert";
import GameOver from "./GameOver";
import Win from "./Win";
import { getUserInfo } from "../../api/getUserInfo";

const Game = () => {

    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const [numbers, setNumbers] = useState([])
    const [gameData, setGameData] = useState({playerCount: 0, lives: 0, throwingStars: 0, level: 0, playerInfo: [{username: '', image: '', cardCount: 0}], smallestCard: 0})
    const [messages, setMessages] = React.useState([{message: 'Welcome to the game', status: true}])
    const [voteKick, setVoteKick] = useState({startedBy: 'kamal', kickPlayer: 'murad', yes: 0, no: 0})
    const [throwingStarVote, setThrowingStarVote] = useState({startedBy: 'kamal', yes: 0, no: 0})

    const { isOpen: isVoteKickOpen, onOpen: onVoteKickOpen, onClose: onVoteKickClose } = useDisclosure()
    const { isOpen: isThrowingStarVoteOpen, onOpen: onThrowingStarVoteOpen, onClose: onThrowingStarVoteClose } = useDisclosure()
    const { isOpen: isGameOverOpen, onOpen: onGameOverOpen, onClose: onGameOverClose } = useDisclosure();
    const { isOpen: isWinOpen, onOpen: onWinOpen, onClose: onWinClose } = useDisclosure();

    
      

    useEffect(() => {
        async function getUser() {
            const data = await getUserInfo();
            !data && navigate('/auth')
        }

        getUser(); 

        socket.emit('getCards');
        socket.emit('getGameData');

        socket.on('cards', (cards) => {
            setNumbers(cards);
        })

        socket.on('gameData', (data) => {
            if (!data) navigate('/lobby');
            setGameData(data);
        })

        socket.on('correctCard', (data)=> {
            socket.emit('getCards');
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })

        socket.on('wrongCard', (data)=> {
            socket.emit('getCards');
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })

        socket.on('nextLevel', (data)=> {
            socket.emit('getCards');
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })

        socket.on('gameOver', (data)=> {
            socket.emit('getCards');
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
            onGameOverOpen();
        })

        socket.on('win', (data)=> {
            socket.emit('getCards');
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
            onWinOpen();
        })

        socket.on('voteKickPlayerStarted', (data) => {
            setVoteKick(data)
            onVoteKickOpen();
        })

        socket.on('playerKicked', (data) => {
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })

        socket.on('voteCounted', (data) => {
            setVoteKick(data)
        })

        socket.on('throwingStarVoteStarted', (data) => {
            setThrowingStarVote(data)
            onThrowingStarVoteOpen();
        })

        socket.on('throwingStarVoteCounted', (data) => {
            setThrowingStarVote(data)
        })

        socket.on('throwingStarUsed', (data) => {
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })

        socket.on('playerLeft', (data) => {
            socket.emit('getGameData');
            setMessages([{...data}, ...messages]);
        })


    }, [socket, messages, onVoteKickOpen, navigate, onThrowingStarVoteOpen, onGameOverOpen, onWinOpen])

    const playCard = (card) => {
        socket.emit('playCard', {card});
    }


    if(gameData){
    return (
        <Box  backgroundImage={"url('/images/Rectangle 46.png')"} bgRepeat={'no-repeat'} bgPos='center' bgSize={'cover'} overflow='hidden' h={"100vh"} w={"100vw"}>

            <Flex p={'2vh'}>
                <Center color={'white'}  fontWeight={'bold'} bgGradient='linear(to-l, #0D366A, #01162F)' fontSize={'3xl'} h={'8vh'} w={'13vw'} borderRadius={'1vh'}>
                    LEVEL {gameData.level}
                </Center>
            </Flex>

            <Box w={'40vw'} h={'20vh'} m={'auto'} mt={'-11vh'} mb={'2vh'}>
                <TopRow player={gameData.playerInfo[0]} />
            </Box>

            <Flex justifyContent={'center'} >

                <Spacer/>
                <Box w={'13vw'} h={'47vh'} display={'inline-block'}>
                    {gameData.playerCount > 2 && <LeftRow numbers={numbers} player={gameData.playerInfo[1]}/>}
                </Box>
                <Spacer/>
                <Spacer/>
                <Flex justifyContent={'center'} alignItems={'center'} w={'47vh'} h={'47vh'}>
                    <Deck number={gameData.smallestCard}/>
                </Flex>
                <Spacer/>
                <Spacer/>
                <Box w={'13vw'} h={'47vh'} display={'inline-block'}>
                    {gameData.playerCount > 3 && <RightRow numbers={numbers} player={gameData.playerInfo[2]}/>}
                </Box>
                <Spacer/>

            </Flex>

            <Box  m={'auto'} mt={'2vh'}>
                <Flex justifyContent={'center'} ml={'11vh'}>
                    <GameLog messages={messages}/>
                    <Votekick isOpen={isVoteKickOpen} onClose={onVoteKickClose} voteKick={voteKick}/>
                    <ThrowingStartAlert isOpen={isThrowingStarVoteOpen} onClose={onThrowingStarVoteClose} throwingStarVote={throwingStarVote}/>
                    <GameOver isOpen={isGameOverOpen} onClose={onGameOverClose}/>
                    <Win isOpen={isWinOpen} onClose={onWinClose}/>
                    <Spacer/>
                    {numbers && numbers.map((number, index) => {
                        if (index === numbers.length - 1) {
                            return (
                                <Box key={number} w={'auto'} v={'auto'} ml={'-11vh'} className={'animate__animated animate__bounceInUp'} onClick={() => playCard(number)}>
                                    <Card  number={number} isHoverable={false}/>
                                </Box>
                            )
                            } else {
                            return (
                                <Box key={number} w={'auto'} v={'auto'} ml={'-11vh'} className={'animate__animated animate__bounceInUp'} onClick={() => playCard(number)}>
                                    <Card number={number} isHoverable={true}/>
                                </Box>
                            )
                        }
                    })}

                    <Spacer/>
                    <Flex mr={'5vh'}>
                        <LifeCard life={gameData.lives}/>
                        <ThrowingStar star={gameData.throwingStars}/>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    ) 
    }


}

export default Game;