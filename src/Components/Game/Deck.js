import React from "react";
import { Circle } from "@chakra-ui/react";
import Card from "./Card";

const Deck = ({ number }) => {

    return (
        
        <Circle size='40vh' bg={'linear-gradient(180deg, #7C7C7C -768.67%, rgba(255, 255, 255, 0.09) 148.19%);'}>
            {number !== 0 && <Card number={number} isHoverable={false}/>}
        </Circle>
    )

}

export default Deck;