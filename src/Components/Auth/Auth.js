import { Box, Input, useDisclosure, Flex, Text, Button,Select,Heading,AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import React, { useEffect } from 'react'
import { useState,useRef } from "react";
import "./AuthStyles.css";
import { CiMail } from "react-icons/ci";
import signIn from "../../api/login";
import { useNavigate } from "react-router";
import { register } from "../../api/register";
import { Navbar } from "../Navbar/Navbar";
import { getUserInfo } from "../../api/getUserInfo";

export default function Auth() {
  //Shout out to my yeti Ayxan
  //shout out to my nigga Turan
  const [clicked, setClicked] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isRegisterAlertOpen, onOpen: onRegisterAlertOpen, onClose: onRegisterAlertClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const [signInEmail, setsignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [isError, setError] = useState(null);

  const [userSignUp, setUserSignUp] = useState({firstname: '', lastname: '', email: '', password:'', date_of_birth:'', avatarId: 15, gender: true })
  const confirmPasswordRef = useRef('');

  useEffect(()=> {
    async function getUser() {
      const data = await getUserInfo();
      data && navigate('/home')
    }
    getUser(); 
  }, [navigate])

  const signInClick = async (e) => {
    e.preventDefault();
    const resultToken = await signIn(signInEmail, signInPassword);

    if (!resultToken){
      setErrorMessage('Invalid credentials');
      return;
    } 
    localStorage.setItem('access_token', resultToken)
    navigate('/home')
  }

  const handlePasswordChange = (e) => {
    setUserSignUp({...userSignUp, password: e.target.value}); 

    if (confirmPasswordRef.current.value !== e.target.value){
      setError(true)
      return;
    }
    setError(false)
  }

  const checkConfirmPassword = () => {
    if (confirmPasswordRef.current.value !== userSignUp.password){
      setError(true)
      return;
    }
    setError(false)
  }

  const signUpSubmit = async (e) => {
    e.preventDefault();

    if (isError) return;

    const result = await register(userSignUp);

    if (!result){
      onRegisterAlertOpen();
      return;
    }

    onOpen();
  }



  if (!clicked) {
    return (
      <Flex bgColor={'black'} bgImage={"url('/images/image 3.png')"} flexDir='column' justifyContent={'center'} bgRepeat='no-repeat' bgSize={'cover'} h='100vh'>
        <Navbar/>
  <Flex className="main-wrapper"  >
    <Flex className={clicked ? "left  left-on-click" : "left"}>
          <Box  w={"80%"} >
      <Heading fontSize={"5xl"}>Sign in to The Mind</Heading>
      <form>
      <Box lineHeight={"3.5em"}  >
        {errorMessage &&
          <Flex justifyContent={'center'}>
          <Alert status='error' height={'2em'} width={'1wv'} borderRadius={'0.5em'}>
          <AlertIcon />
          {errorMessage}
        </Alert>
          </Flex>}
        <Input mb={"1em"} mt={"1em"} fontSize={"1.3em"} height={"2.5em"}  onChange={(e) => setsignInEmail(e.target.value)} bg={"#F4F8F7"} borderRadius={10} border={"none"} type='email' placeholder="email" required w={"55%"} />
        <Input  fontSize={"1.3em"} height={"2.5em"} onChange={(e) => setSignInPassword(e.target.value)} bg={"#F4F8F7"} borderRadius={10} border={"none"} type='password' placeholder="password" required w={"55%"} />
        <Text p={0} color={"gray"}><a href="src/Components/Auth/auth#Auth.js">Forgot your password?</a></Text>
        <Button onClick={(e) => signInClick(e)} type="submit"  transitionDuration={"0.7s"} _hover={{bg:"white", color:"#010E1F" }} border={"1px solid #010E1F"} w={"45%"} p={5} borderRadius={10} bg={"#010E1F"} color={"white"} >Sign In</Button>
      </Box>
      </form>
      
      </Box>
    </Flex>
    <Flex className={clicked ? "right right-on-click" : "right"} >
            <Box  w={"80%"} m={"auto"}>
            <Heading >Hello Friend!</Heading>
            <Text   mt={5} mb={10} fontSize={12} >Enter your personal details and start journey with us</Text>
            <Button onClick={() => setClicked(!clicked)} transitionDuration={"0.7s"} _hover={{bg:"white", color:"black" }} border={"1px solid white"} w={"45%"} p={5} borderRadius={10} bg={"transparent"} color={"white"} >Sign Up</Button>
            </Box>  
    </Flex>
        
  </Flex>
  <Text  w='auto' ml='auto' mr='auto' fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
  </Flex>
    )
  }
    else 
    {
      return (
        <Flex bgColor={'black'} bgImage={"url('/images/image 3.png')"} bgRepeat='no-repeat' bgSize={'cover'} h='100vh' flexDir='column'>
        <Navbar/>
        <Flex className={isOpen ? "main-wrapper blurred-background" : "main-wrapper"}  >
         <Flex className={clicked ? "left  left-on-click" : "left"} color={"black"} bg={"white"} w={"70%"} textAlign={"center"} justifyContent={"center"} alignItems={"center"}  >
          <Box w={"50%"} gap={2} >
          <Heading color={"#010E1F"} ml={"2em"} >Create Account</Heading>
          
            <Box lineHeight={"3em"} paddingTop={"0.5em"} className="create-account">
              <form onSubmit={(e) => {signUpSubmit(e)}}>
                <Input className={"name inputItem"}  type="text" maxLength={64} placeholder="Firstname" required onChange={(e) => setUserSignUp({...userSignUp, firstname: e.target.value})}/>
                <Input className={"surname inputItem"}    type="text" maxLength={64} placeholder="Lastname" required onChange={(e) => setUserSignUp({...userSignUp, lastname: e.target.value})} />
                <Input className={"date inputItem"}  type="date" required onChange={(e) => setUserSignUp({...userSignUp, date_of_birth: e.target.value})}/>
                <Input className={"email inputItem"}  type="email"  maxLength={1023} placeholder="Email" required onChange={(e) => setUserSignUp({...userSignUp, email: e.target.value})} />
                <Input className={"pass inputItem"} minLength={8} maxLength={1023} type='password' placeholder="Password"  required onChange={(e) => handlePasswordChange(e)}/>
                <FormControl isInvalid={isError}>
                  <Input className={"confpass inputItem"} minLength={8} maxLength={1023} type='password' ref={confirmPasswordRef} placeholder=" Confirm password" required onChange={checkConfirmPassword} />
                  {isError && <FormErrorMessage>Passwords do not match</FormErrorMessage>}
                </FormControl>
                <Select className={"gender inputItem"}   placeholder='Select gender' required onChange={(e) => setUserSignUp({...userSignUp, gender: e.target.value ? true : false })} >
                    <option value={true}>Male</option>
                    <option value={false}>Female</option>
                </Select>
                <Button type="submit" size={'sm'} transitionDuration={"0.7s"} _hover={{bg:"white", color:"#010E1F" }} border={"1px solid #010E1F"} w={"40%"} p={5} borderRadius={10} bg={"#010E1F"} color={"white"} >Sign Up</Button>
              </form>
            </Box>
            <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef}  isOpen={isOpen} onClose={onClose} isCentered>
              <AlertDialogOverlay />
              
              <AlertDialogContent>
                <AlertDialogHeader textAlign={"center"} >Just one more step...</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody textAlign={"center"} >
                We've sent a verification email to <a href="src/Components/Auth/auth#Auth.js" className="mail-link" >{userSignUp.email}.</a><br />
                Please verify your email address to log into TheMind<br />
                <CiMail className="CiMail" />
                </AlertDialogBody>

                <footer className="footer-for-link" >
                <a href='src/Components/Auth/auth#Auth.js'>Didn't get the mail? Click here to send it again.</a>
                </footer>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog isOpen={isRegisterAlertOpen} onClose={onRegisterAlertClose} isCentered>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader textAlign={"center"} >Registration failed</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody textAlign={"center"} >
                  Something went wrong
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          
          </Box>
          
        </Flex>
        <Flex className={clicked ? "right right-on-click" : "right"} >
            <Box  w={"80%"} m={"auto"}>
            <Heading >Welcome Back!</Heading>
            <Text   mt={5} mb={10} fontSize={12} >To keep connected with us please login with your personal info </Text>
            <Button onClick={()=> setClicked(!clicked)} transitionDuration={"0.7s"} _hover={{bg:"white", color:"#010E1F" }} border={"1px solid white"} w={"45%"} p={5} borderRadius={10} bg={"transparent"} color={"white"} >Sign In</Button>
            </Box>  
        </Flex>
        
      </Flex>
      <Text  w='auto' ml='auto' mr='auto' fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
      </Flex>
      )
    }


      

   
}

