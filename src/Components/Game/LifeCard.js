import { Flex, Text, Tooltip } from "@chakra-ui/react"
import './font.css';

const LifeCard = ({life}) => {

    return (
        <Flex fontSize={'8xl'} color={'white'} bgImage={'/images/life.png'} bgSize={'cover'} w={'15vh'} h={'22.5vh'} justifyContent={'center'} alignItems={'center'}>
            <Tooltip label={`Your team has ${life} lives`}>
                <Text ml={'1vh'} textShadow={'2px 2px 2px black'} textAlign={'center'} fontFamily={'Sleman'}>{life}</Text>
            </Tooltip>
        </Flex>
            
    )
}

export default LifeCard;