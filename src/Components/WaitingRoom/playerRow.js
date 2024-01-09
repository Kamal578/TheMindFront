import React, {useEffect, useState, useContext} from "react";

import { Flex, Avatar, Text, IconButton, Badge, Tooltip } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getUserInfo } from "../../api/getUserInfo";
import { getRoomByPlayerUsername } from "../../api/getRoomByPlayerUsername";
import { SocketContext } from "../../context/SocketContext";


export default function PlayerRow({playerData, roomData}) {

  const [player, setPlayer] = useState({});
  const socket = useContext(SocketContext);
  const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', username: '', email: '', avatar: {id: 0, imageUrl: ''}}); 
  const [room, setRoom] = useState({id: '', admin: {}, joinedPlayers: [], readyPlayers: []});

  //find player in room whose username is the same as user


  useEffect(() => {

    async function getRoles() {
      getUserInfo()
      .then(data => {
        const username = data.username;
        getRoomByPlayerUsername(username)
        .then(data => {
          const user = data.joinedPlayers.find(player => player.username === username);
          setUser(user);
        })
      });
    }

    
    setPlayer(playerData);
    setRoom(roomData);

    getRoles();


  }, [playerData, roomData, room]);

  const handleRemovePlayer = () => {
    socket.emit('removePlayer', {playerUsername: player.username})
  }

  if (player) {
    return (
      <Flex  p={"0.3em"} bg={"white"}  color={"black"} borderRadius={"3px"} mb={"1em"} >
          
          <Flex alignItems={"center"} justifyContent={"center"}  width={"20%"}>
            <Avatar border={ player.isReady && "3px solid green"} w={"2.3em"} h={"2.3em"} src={player.image} />
          </Flex>

          <Flex alignItems={"center"} width={"60%"}>
            <Text m={"none"} fontWeight={"bold"} > {player.username} {player.isAdmin && <Badge fontSize={'0.5em'} colorScheme={'yellow'}>Admin</Badge>}</Text>
          </Flex>

          {user && user.isAdmin && user.username !== player.username && 
          <Flex justifyContent={"center"} alignItems={"center"} width={"20%"}>
            <Tooltip label={'Remove ' + player.username}>
            <IconButton
              colorScheme='red'
              aria-label='Remove player'
              borderRadius='50%'
              size="xs"
              onClick={handleRemovePlayer}
              icon={<CloseIcon />}
            />
            </Tooltip>
          </Flex>
          }

        </Flex >
  )

  }

    
}