import React, {useState, useEffect, useRef, useContext} from "react";
import "./LobbyStyles.css";
import CardFlip from "react-card-flip";
import { Button,Avatar,Text,Input,Flex, FormControl, FormErrorMessage} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { getUserInfo } from '../../api/getUserInfo';
import { useNavigate } from "react-router";
import { SocketContext } from '../../context/SocketContext';
import { Navbar } from "../Navbar/Navbar";

const CreateJoin = () => {

  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', username: '', email: '', avatar: {imageUrl: ''}});
  const [joinRoomError, setJoinRoomError] = useState({error: false, message: ''});
  const inputReference = useRef(null);
  const socket = useContext(SocketContext);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    inputReference.current.focus();
  };

  const handleCreateRoom = () => {
    socket.emit('createRoom');
    navigate('/waiting')
  };

  const handleJoinRoom = () => {
    socket.emit('joinRoom', {roomId: inputReference.current.value});
  };

  useEffect(() => {
    async function getUser() {
      const data = await getUserInfo();
      !data && navigate('/auth')
      setUser(data);
    }
    getUser(); 

    socket.on('roomNotFound', (data) => {
      setJoinRoomError({error: true, message: data.message});
    });

    socket.on('roomFound', () => {
      navigate('/waiting');
    });

    socket.on('lobbyReconnect', () => {
      navigate('/waiting');
    });

    socket.on('gameReconnect', () => {
      navigate('/game');
    });

    socket.on('gameStarted', () => {
      navigate('/game');
    })
  }, [navigate, socket]);

  return (
    <div className="createjoin">
      <Navbar/>
      <div className="lobbycard">
      <CardFlip isFlipped={isFlipped}>
        <div className="lobbycard-front">
          <Avatar w={"5em"} h={"5em"} src={user.avatar.imageUrl} mb={"1em"}/>
          <div className="front-text"  >
            <Text color="white" mb={"2em"}>{user.username}</Text>
            </div>
          <Button fontWeight={"500"} bg={"#1F5378"}  w={"55%"} className="joinroombutton" onClick={handleFlip}>
            Join Room
          </Button>
          <Button fontWeight={"500"} onClick={handleCreateRoom} bg={"#46A661"} color={"white"}  w={"55%"} className="createroombutton">Create Room</Button>
        </div>


        <div className="lobbycard-back">
          <Flex width={"100%"} m={"1em 0 2em 1em"} className={"return-button"}>
             <IoIosArrowBack color={"white"} fontSize={"2em"} cursor={"pointer"} onClick={handleFlip} />
            </Flex>
          <div className="back-text">
          <Text color="white" mb={"1em"}>Enter room ID:</Text>
          </div>
          <div className="url-input">
          <FormControl isInvalid={joinRoomError} mb={"4em"} >
            <Input isRequired bg={"#BFBFBF"} id={"url"} ref={inputReference} autoComplete={'off'} color={"white"}  type="text" placeholder="Paste link" />
                  {joinRoomError.error && <FormErrorMessage>{joinRoomError.message}</FormErrorMessage>}
            </FormControl>
          </div>
          <Button bg={"#46A661"} className={"joinroombutton"} onClick={handleJoinRoom} w={"55%"} color={"white"} >Join</Button>
        </div>


      </CardFlip>
      <Text style={{ position: 'absolute', bottom: 0 }} fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
      </div>
    </div>
  );
};

export default CreateJoin;
