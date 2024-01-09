import { Box, Flex} from '@chakra-ui/react'
import Card from './Card'
import React from 'react'
import 'animate.css'
import PlayerPopover from './PlayerPopover'

const RightRow = ({player}) => {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} >

            <Flex size={'auto'} gap={2} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={'-10vh'}>  
                <PlayerPopover player={player}/>                
            </Flex>

            <Flex justifyContent={'center'} mt={'35vh'} mb={'10vh'} flexDirection={'column-reverse'} >
                {[...Array(player?.cardCount)].map((e, i) =>{ 
                return(
                <Box key={i} w={'auto'} v={'auto'} mt={'-15vw'} rotate={'90'}>
                    <Card isHoverable={false} isSideRow={true}/>
                </Box>)
                })}
            </Flex>

            

        </Flex>

    )
}

export default RightRow;