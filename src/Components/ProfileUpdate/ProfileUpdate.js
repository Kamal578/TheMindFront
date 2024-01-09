import React, { useEffect } from 'react'
import {useState} from "react"
import "./ProfileUpdateStyles.css"
import { InputGroup, InputRightElement, Box,SimpleGrid,Avatar, FormLabel,Input, Flex, Text, Button, Heading,FormControl, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton} from "@chakra-ui/react";
import { getUserInfo } from '../../api/getUserInfo';
import { updateUserInfo } from '../../api/updateUserInfo';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import validateUsername from '../../api/validateUsername';
import updateUsername from '../../api/updateUsername';
import getAvatars from '../../api/getAvatars';
import { Navbar } from '../Navbar/Navbar';
import { useNavigate } from 'react-router';
import resetPassword from '../../api/resetPassword';

export default function ProfileUpdate() {
    // const [index, setIndex] = useState(0)
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const handlePassChangeClick = () => setShow(!show)

    const [avatars, setAvatars] = useState([]);
    const [originalUser, setOriginalUser] = useState({firstname: '', lastname: '', date_of_birth: '', avatar: {id: 0, imageUrl: ''} });
    const [user, setUser] = useState({firstname: '', lastname: '', date_of_birth: '', username: '', email: '', avatar: {id: 0, imageUrl: ''}});
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const {isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose} = useDisclosure();
    const {isOpen: isUsernameChangeOpen, onOpen: onUsernameChangeOpen, onClose: onUsernameChangeClose} = useDisclosure();
    const {isOpen: isPassResetOpen, onOpen: onPassResetOpen, onClose: onPassResetClose} = useDisclosure();
    const {isOpen: isEmailConfirmOpen, onOpen: onEmailConfirmOpen, onClose: onEmailConfirmClose} = useDisclosure();

    useEffect(() => {
      async function getUserData() {
        const userData = await getUserInfo();
        !userData && navigate('/auth')
        setUser(userData);
        setOriginalUser(userData);
      }
      async function getAvatarData() {
        const avatarData = await getAvatars();
        if (!avatarData) {
            setErrorMessage("Something went wrong");
            return; 
        }
        setAvatars(avatarData);
      }

      getUserData(); 
      getAvatarData();
    }, [navigate]);

    function onPhotoChange () 
    {  

      const newAvatar = avatars.find(avatar => avatar.id === user.avatar.id + 1)

      if (newAvatar) {
        setUser({...user, avatar: newAvatar})
      } else {
        setUser({...user, avatar: avatars[0]})
      }
       
    }

    const onSave = async () => {

      const updateUserDto = {
        firstname: user.firstname,
        lastname: user.lastname,
        date_of_birth: user.date_of_birth,
        avatarId: user.avatar.id
      }
      
      const data = await updateUserInfo(updateUserDto);
      if (!data) {
          setErrorMessage("Something went wrong");
          return; 
      }
      window.location.reload(false);
    }

    const handleUsernameChange = async (e) => {

      setNewUserName(e.target.value);
      const data = await validateUsername(e.target.value);
      setIsUsernameValid(data);
    }

    const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
    }

    const savePassword = async () => {
      const data = await resetPassword(newPassword);
      if (!data) {
        return;
      }

      onPassResetClose();
      onEmailConfirmOpen();
    }

    const saveUsername = async (username) => {

      const data = await updateUsername(username);
      if (!data) {
        return;
      }

      window.location.reload(false);
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
    <Flex flexDir='column' bgColor='black' h='100vh' bgPos={'center'} bgImage={"url('/images/image 3.png')"} bgRepeat='no-repeat' bgSize={'cover'}>
    <Navbar />
   <Flex mt={'2vh'} className='main-profile-wrapper'  >
    <Box  className="box-header" h={"30%"} >
        <Box>
        <Heading>Hello {originalUser.firstname}!</Heading>
    <Text>Update your photos and personal details here.</Text>
        </Box>
    <Box justifySelf={"flex-end"}>
      <Flex flexDir={'column'}>

        <Avatar onClick={onPhotoChange} _hover={{cursor: 'pointer'}}  className="avatar" w={"7em"} h={"7em"} src={user.avatar.imageUrl }>
        </Avatar>
        <Text w='auto'>Click to change!</Text>
      </Flex>
    </Box> 
    
    </Box>

    <Box className="box-body" h={"60%"} >
    
      <FormControl>
        <SimpleGrid columns={2}>

        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="Name">Firstname</FormLabel>
        <Input placeholder='Name' id="Name" bg={"white"} value={user.firstname} onChange={(e) => setUser({...user, firstname: e.target.value})} />
        </Box>
        
        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="Surname" >Lastname</FormLabel>
        <Input placeholder='Surname' bg={"white"} id="Surname" value={user.lastname} onChange={(e) => setUser({...user, lastname: e.target.value})} />
        </Box>

        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="email" >E-mail</FormLabel>
        <Input placeholder='Surname' bg={"white"} id="email" value={user.email} isReadOnly={true} />
        </Box>

        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="username" >Username</FormLabel>
        <InputGroup>
        <Input placeholder='Surname' bg={"white"} id="username" value={user.username} isReadOnly={true} />
        <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='xs' colorScheme={'gray'} onClick={onUsernameChangeOpen}>
                 Change
              </Button>
        </InputRightElement>
        </InputGroup>
        
        </Box>

        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="Date" >Date</FormLabel>
        <Input  type="date" bg={"white"} placeholder='Date' id="Date" value={user.date_of_birth} onChange={(e) => setUser({...user, date_of_birth: e.target.value})}/>
        </Box>

        <Box className="Binput">
        <FormLabel fontWeight={"bolder"} htmlFor="email" >Password</FormLabel>
            <InputGroup >
              <Input 
                bg={"white"}
                pr='4.5rem'
                type={'password'}
                value='asdasldblasdblasd'
                isReadOnly={true}
              />
            <InputRightElement width='4.5rem'>
              <Button onClick={onPassResetOpen} h='1.75rem' size='xs' colorScheme={'red'} >
                 Reset
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        </SimpleGrid>
      </FormControl>

      <Box className='box-footer' h={"20%"} mb="3em" >
            <Button  bg={"white"} variant='outline' width={"8em"} mr="1em" color="#09264A" onClick={onResetOpen}>Cancel</Button>
            <Button type="Submit" className="saveB" bg={"#09264A"} color={"white"}  width={"8em"} onClick={onSave}>Save</Button>
        </Box>
        
     
    </Box>

    <Modal isOpen={isResetOpen} onClose={onResetClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Reset Changes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <p>Are you sure you want to reset your changes?</p>
        </ModalBody>

        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onResetClose}>
            Close
            </Button>
            <Button colorScheme="red" onClick={()=> {setUser(originalUser); onResetClose();}}>Reset</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>

    <Modal isOpen={isUsernameChangeOpen} onClose={onUsernameChangeClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Change Username</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          
        <InputGroup >
              <Input 
                bg={"white"}
                pr='4.5rem'
                placeholder='New Username'
                value={newUserName}
                onChange={(e) => handleUsernameChange(e)}
              />
            <InputRightElement>
              { isUsernameValid === true? <CheckCircleIcon color={'green'} height={'1em'}/> : ( newUserName ? <WarningIcon color='red'/> : <></>)}
            </InputRightElement>
              
          </InputGroup>
          { isUsernameValid === true ? <Text marginLeft={'0.5vw'} fontSize={'xs'} color={'green'}>Username is available</Text> : ( newUserName ? <Text marginLeft={'0.5vw'} fontSize={'xs'} color={'red'}>Username is taken</Text> : <></>)}
            
        </ModalBody>

        <ModalFooter>
            <Button bg={"white"} variant='outline' mr="1em" color="#09264A" onClick={onUsernameChangeClose}>Cancel</Button>
            <Button type="Submit" className="saveB" bg={"#09264A"} color={"white"} onClick={()=> saveUsername(newUserName)}>Save</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>

    <Modal isOpen={isPassResetOpen} onClose={onPassResetClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          
        <InputGroup >
        
              <Input 
                bg={"white"}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='New password'
                min={8}
                max={1024}
                value={newPassword}
                onChange={(e) => handlePasswordChange(e)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handlePassChangeClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
          </InputGroup>            
        </ModalBody>

        <ModalFooter>
            <Button bg={"white"} variant='outline' mr="1em" color="#09264A" onClick={onPassResetClose}>Cancel</Button>
            <Button type="Submit" className="saveB" bg={"#09264A"} color={"white"} onClick={()=> savePassword()}>Save</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>

    <Modal isOpen={isEmailConfirmOpen} onClose={onEmailConfirmClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Email sent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Confirm your password reset by clicking the link in the email we sent you.
        </ModalBody>
        <ModalFooter></ModalFooter>
        </ModalContent>
    </Modal>

   </Flex>  
   </Flex>

  )
}
