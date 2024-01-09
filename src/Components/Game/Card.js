import { Flex, Spacer, Center, Circle} from "@chakra-ui/react";
import './font.css';

const Card = ({ number, isHoverable, isSideRow }) => {


    return (
        <Flex className={`gamecard ${isSideRow && 'sideRow'} ${isHoverable && 'hoverable'}`} _hover={{cursor: 'pointer'}} justifyContent={'center'} alignItems={'center'} bgColor={'#0A0A1F'} w={'15vh'} h={'22.5vh'} border={'2px solid white'} borderRadius={'6px'} flexDirection={'column'}>
            <Flex>
                <Center color={'white'} fontSize={'3.5vh'} w={'10vh'}>
                    {number}
                </Center>
                <Spacer/>
                <Center color={'white'} fontSize={'3.5vh'} w={'10vh'}>
                    {number}
                </Center>
            </Flex>

            <Circle mt={'1vh'} mb={'1vh'} border={'none'} size={'10vh'} color={'white'} fontSize={'5vh'} bg='linear-gradient(180deg, #969696 -768.67%, rgba(135, 135, 135, 0) 148.19%)'>
                {number}
            </Circle>

            <Flex>
                <Center color={'white'} fontSize={'3.5vh'} w={'10vh'}>
                    {number}
                </Center>
                <Spacer/>
                <Center color={'white'} fontSize={'3.5vh'} w={'10vh'}>
                    {number}
                </Center>
            </Flex>
        </Flex>
    )
}

export default Card;