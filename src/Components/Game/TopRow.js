import { Box, Flex} from '@chakra-ui/react'
import Card from './Card'
import React from 'react'
import 'animate.css'
import PlayerPopover from './PlayerPopover'

const TopRow = ({player}) => {

    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={5} >

            <Flex size={'auto'} gap={2} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <PlayerPopover player={player}/>
            </Flex>

            <Flex justifyContent={'center'} ml={'14vh'}>
            
            {[...Array(player?.cardCount)].map((e, i) =>{ 
            return(
            <Box key={i} w={'auto'} v={'auto'} ml={'-14vh'}>
                <Card isHoverable={false}/>
            </Box>)
            })}

            </Flex>

        </Flex>

    )
}

export default TopRow;