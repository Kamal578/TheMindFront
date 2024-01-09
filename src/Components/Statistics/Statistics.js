import React, { useEffect, useState } from 'react'
import "./StatisticsStyles.css";
import { Avatar,Text,Flex,Box,CircularProgress, CircularProgressLabel, Td, Tr, Table, TableContainer, Tbody} from "@chakra-ui/react";
import { Navbar } from '../Navbar/Navbar';
import { getUserInfo } from '../../api/getUserInfo';
import { useNavigate } from 'react-router';

export default function Statistics() {

  const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', number_of_games_played: 0, max_level_reached: 0, elo: 0, username: '', email: '', avatar: {id: 0, imageUrl: ''}});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const userData = await getUserInfo();
      userData && setUser(userData);
      !userData && navigate('/auth')
    }
    getUserData();
  }, [navigate]);


  return (
    <Flex flexDir='column'>
    <div className="statisticsBody">
      <Navbar/>
      <Flex className="statisticsCard" p={"4em"} >
        
        <Flex className='card1 leftc' bg={"white"} height={"100%"} >
            <Flex height={"40%"} justifyContent={"center"} alignItems={"center"} >
                <Box width={"40%"}>
                <Avatar w={"5em"} h={"5em"} src={user.avatar.imageUrl} ></Avatar>
                </Box>
                <Box w={"60%"}>
                <Text fontSize={"1.3em"} ><b>@{user.username}</b></Text>
                </Box>
            
            </Flex>
            <Flex height={"60%"} >
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Name</Td>
                    <Td>{user.firstname} {user.lastname}</Td>  
                  </Tr>
                  <Tr>
                    <Td>Birthday</Td>
                    <Td>{user.date_of_birth}</Td>
                  </Tr>
                  <Tr>
                    <Td>E-mail</Td>
                    <Td>{user.email}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            </Flex>
        </Flex>
        <Flex className='rightc' flexDirection={"column"} height={"100%"}>
        <Flex className='card2' flex="2" bg={"white"} flexDirection={"column"} >
            <Flex justifyContent={"center"} width={"100%"}>
            <Text><b>Max level</b></Text>
            </Flex>
            <Flex>
            <CircularProgress size={"2em"} value={user.max_level_reached*100/12} color='blue.900' >
            <CircularProgressLabel fontSize={"0.5em"}><b>{user.max_level_reached}</b></CircularProgressLabel>
            </CircularProgress>
            </Flex>
            
        </Flex>
        <Flex className='card3' flex="1" bg={"white"} flexDirection={"column"}>
            <Flex justifyContent={"center"} width={"100%"}>
            <Text>Games played</Text>
            </Flex>
            <Flex>
            <Text fontWeight={"bold"} fontSize={"24px"} >{user.number_of_games_played}</Text>
            </Flex>
            
        </Flex>
        <Flex className='card4' flex="1" bg={"white"} flexDirection={"column"}>
            <Flex  justifyContent={"center"} width={"100%"}>
            <Text>Rating</Text>
            </Flex>
            
            <Text fontSize={"24px"} fontWeight={"bold"}>{user.elo}</Text>
        </Flex>
        </Flex>
        

      </Flex>
      <Flex justifyContent={'center'}>
        <Text style={{ position: 'absolute', bottom: 0 }} fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
      </Flex>
    </div>
    </Flex>
  )
}
