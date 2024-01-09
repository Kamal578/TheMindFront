import { useDisclosure, Flex, Box, Link, Divider, Button, Spacer, Image, Popover, Portal, PopoverContent, PopoverBody, PopoverTrigger, Avatar } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';

import { getUserInfo } from '../../api/getUserInfo';
import { Modal, ModalBody, ModalContent, ModalOverlay, Text, ModalCloseButton } from "@chakra-ui/react";
import VideoModal from "../Home/VideoModal";



export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', username: '', email: '', avatar: {id: 0, imageUrl: ''}});
    const { isOpen: isLogoutOpen, onOpen: onLogoutopen, onClose: onLogoutClose } = useDisclosure();
    const [selected, setSelected] = useState("");
    const { isOpen: isRulesOpen, onOpen: onRulesOpen, onClose: onRulesClose } = useDisclosure();


    useEffect(() => {
        async function getUserData() {
            const userData = await getUserInfo();
            setUser(userData);
          }
        getUserData();

        const path = location.pathname;
        setSelected(path);
        
    }, [location]);

    const logOut = () => {
        localStorage.removeItem('access_token');
        window.location.reload();
    }


    return (
        <Flex w='100w' h='auto' p='2%' alignItems={'center'}>
            <VideoModal isOpen={isRulesOpen} onClose={onRulesClose}/>
             <Box align="center" mr={5} >
                <Link onClick={() => navigate('/home')} fontWeight="600" color="#50C9E9" fontSize='25px' >
                THE MIND
                </Link>
            </Box>
            <Spacer />

            <Flex w='30vw' justifyContent={'center'}>
                <Link href='/lobby' fontWeight="400" color={selected === '/lobby' ? '#50C9E9' : 'white'}   fontSize='18px' >
                    Play
                </Link>
                <Spacer />
                <Link onClick={() => {setSelected('/rules'); onRulesOpen();}} fontWeight="400" color={selected === '/rules' ? '#50C9E9' : 'white'}  fontSize='18px' >
                    Rules
                </Link>
                <Spacer />
                <Link onClick={() => navigate('/about')} fontWeight="400" color={selected === '/about' ? '#50C9E9' : 'white'} fontSize='18px'>
                    About
                </Link>
            </Flex>

            <Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer />


            {!user &&
            <Flex gap={5}>
            <Button onClick={() => navigate('/auth')} colorScheme='cyan' w={'7vw'} variant='outline'>
                Login
            </Button>
            <Button onClick={() => navigate('/auth')} colorScheme='cyan' color={'white'} w={'7vw'} variant='solid'>
                Register
            </Button>
            </Flex>
            }
            
            {user && 
            <Popover>
                <PopoverTrigger>
                <Image _hover={{cursor: 'pointer'}} boxSize='auto' src={'/images/profile.svg'}/>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent w='auto'>
                    <PopoverBody >
                    <Flex flexDirection={'column'} gap={2}>

                        <Flex gap={1}>
                            <Avatar border={'1px solid black'} src={user.avatar.imageUrl}/>
                            <Flex flexDirection={'column'}  >
                                <Box w='auto'>{user.firstname} {user.lastname}</Box>
                                <Box mt={'-1%'}>@{user.username}</Box>
                            </Flex>
                        </Flex>

                        <Divider />

                        <Flex flexDir='column' gap={2} alignItems='start'>

                            <Flex gap={2} cursor='pointer' onClick={() => navigate('/me')}>
                                <Image boxSize='auto' src={'/images/profileVector.svg'}/>
                                Profile
                            </Flex>
                            <Flex gap={2} cursor='pointer' onClick={() => navigate('/settings')}>
                                <Image boxSize='auto' src={'/images/settingsVector.svg'}/>
                                Settings
                            </Flex>
                            <Flex gap={2} cursor='pointer' onClick={() => onLogoutopen()}>
                                <Image boxSize='auto' src={'/images/logoutVector.svg'}/>
                                Log out
                            </Flex>
                        </Flex>
                    </Flex>
                    </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        
            }
            <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
                <ModalOverlay />
                <ModalContent w='auto'>
                
                <ModalCloseButton />
                <ModalBody p='5vh'>
                <Flex flexDir='column' h='20vh' w='auto' alignItems='center'>
                <Text fontSize='xl' w='30vw' textAlign='center' fontWeight='bold' >You are attempting to log out of THE MIND</Text>
                    <Spacer/>
                <Text color='gray' >Are you sure?</Text>
                <Spacer/>
                <Spacer/>
                    <Button onClick={()=> logOut()} bgColor='#02162F' w='20vw' _hover={{bgColor: '#02162F'}} color='white' >
                    Log out
                 </Button>
                </Flex>
                </ModalBody>
                </ModalContent>
            </Modal>
            <Spacer />


        </Flex>
    )
}