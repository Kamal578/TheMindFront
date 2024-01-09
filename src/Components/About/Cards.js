import React, { useEffect} from "react";
import FlippableCard from "./FlippableCard";
import "./Cards.css";
import getAbout from "../../api/getAbout";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";


const Cards = () => {

  const [about, setAbout] = React.useState(null);

  useEffect(() => {
    getAbout().then((data) => {
      setAbout(data);
    });
  }, []);

  return (
    <Box w='100vw' h='100vh' bgColor='black' bgPos={'center'} backgroundImage={"url('/images/image 3.png')"} bgRepeat={'no-repeat'} bgSize={'cover'}>
      <Navbar />
      <div className="cards-container">
        {about && about.map((item) => {
          return (
            <FlippableCard
              key={item.id}
              front={item.role}
              back={item.fullName}
              photo={item?.avatar.imageUrl}
              used={item.text}
            />
          );
        })}
      </div>
      <Flex justifyContent={'center'}>
        <Text style={{ position: 'absolute', bottom: 0 }} fontSize={'xs'} marginBottom={'1vw'} textAlign={'center'} color={'#9B9B9B'}>All rights reserved © 2022 The Mind</Text>
      </Flex>
    </Box>

  );
};

export default Cards;
