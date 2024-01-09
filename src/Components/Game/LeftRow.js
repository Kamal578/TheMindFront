import {Box, Flex } from '@chakra-ui/react'
import Card from './Card'
import React from 'react'
import 'animate.css'
import PlayerPopover from './PlayerPopover'

const LeftRow = ({player}) => {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={6} >

            <Flex size={'auto'} gap={2} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <PlayerPopover player={player}/>
            </Flex>

            <Flex justifyContent={'center'} mb={'10vh'} flexDirection={'column'} >
                {[...Array(player?.cardCount)].map((e, i) =>{ 
                return(
                <Box key={i} w={'auto'} v={'auto'} mb={'-15vw'} rotate={'90'}>
                    <Card isHoverable={false} isSideRow={true}/>
                </Box>)
                })}
            </Flex>

        </Flex>

    )
}

export default LeftRow;