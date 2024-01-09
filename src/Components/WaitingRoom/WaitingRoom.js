import React, {useContext, useEffect, useState} from "react";
import "./WaitingRoomStyles.css";
import { Heading,Button,Text,Flex,useClipboard, VStack, Tooltip} from "@chakra-ui/react";
import PlayerRow from "./playerRow";
import { SocketContext } from "../../context/SocketContext";
import { getRoomByPlayerUsername } from "../../api/getRoomByPlayerUsername";
import { getUserInfo } from "../../api/getUserInfo";
import { useNavigate } from "react-router";

const CreateJoin = () => {

  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', username: '', email: '', avatar: {id: 0, imageUrl: ''}}); 
  const [room, setRoom] = useState({id: '', admin: {}, joinedPlayers: [], readyPlayers: []});
  const [startGameStatus, setStartGameStatus] = useState({status: true, message: ''});
  const [playerReadyStatus, setPlayerReadyStatus] = useState(false);

  useEffect(() => {

    async function fetchRoomData() {

      const user = await getUserInfo();
      !user && navigate('/auth');
      setUser(user);
      const data = await getRoomByPlayerUsername(user.username);

      if (!data) {
        navigate('/lobby');
        return;
      }
      setRoom(data);
      setValue(data.id);
    }

    fetchRoomData();

    socket.on('playerJoined', () => fetchRoomData());
    socket.on('lobbyReconnect', () => fetchRoomData());
    socket.on('gameReconnect', () => navigate('/game'));
    socket.on('playerLeft', () => fetchRoomData());
    socket.on('playerReady', () => fetchRoomData());
    socket.on('playerUnReady', () => fetchRoomData());
    socket.on('kicked', () => navigate('/lobby'));

    socket.on('gameNotStarted', (data) => setStartGameStatus({status: false, message: data.message}));

  }, [socket, setValue, navigate]);

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', {roomId: room.id});
    navigate('/lobby')
  }

  const handleReady = () => {
    socket.emit('playerReady', {roomId: room.id});
    setPlayerReadyStatus(true);
  }

  const handleUnReady = () => {
    socket.emit('playerUnReady', {roomId: room.id});
    setPlayerReadyStatus(false);
  }

  const handleStartGame = () => {
    socket.emit('startGame', {roomId: room.id});
  }

    return (
      <Flex className="PlayerList-container">
        <div className="PlayerList">
          <Flex justifyContent={"center"}>
            <Heading size={"lg"} color={"white"} textAlign={"center"}>PLAYERS {room.joinedPlayers.length}/4</Heading>
          </Flex>
    
          <VStack
            align='stretch'
            h='40vh'
            marginTop={'2em'}
          >
    
            <PlayerRow playerData={room.admin} roomData={room}/>

            {room.joinedPlayers.map((player) => {
              if (!player.isAdmin){
                return <PlayerRow key={player.username} playerData={player} roomData={room} />
              }else return null;
              
            })}
    
          </VStack>
               
          <Flex width={"100%"} justifyContent={"space-between"} >
                <Tooltip hasArrow label={value}>
                <Button w={"45%"} h={"3.2em"} onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
                </Tooltip>
                {room.admin.username === user.username ? 
                <Button w={"45%"} h={"3.2em"} colorScheme='green' onClick={handleStartGame} >Start</Button> :  
                !playerReadyStatus ? <Button w={"45%"} h={"3.2em"} colorScheme='green' onClick={handleReady}>Ready</Button> : 
                <Button w={"45%"} h={"3.2em"} colorScheme='green' onClick={handleUnReady}>Unready</Button>}
          </Flex >
          
          {!startGameStatus.status &&
          <Flex justifyContent={'center'} mb={'-1vw'}>
            <Text fontSize={'xs'} color={'red'}>{startGameStatus.message}</Text>
          </Flex>
          }

          <Flex justifyContent={'center'} >
            <Button marginTop={'1em'} colorScheme={'red'} onClick={handleLeaveRoom}>Leave</Button>
          </Flex>
        </div>
        <Text style={{ position: 'absolute', bottom: 0 }} fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
      </Flex>
      )
};

export default CreateJoin;
