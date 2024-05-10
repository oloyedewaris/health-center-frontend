import React from "react";
import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

const Card = ({
  image,
  title,
  subTitle,
  subTitle2,
  subTitle3,
  onClick,
  ...rest
}) => {

  return (
    <Flex
      w='full'
      maxWidth={"463px"}
      cursor={"pointer"}
      borderRadius='xl'
      bgSize={"cover"}
      outline={"0.5px solid gray"}
      px={"20px"}
      py={"30px"}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={'row'}
      onClick={onClick}
      {...rest}
    >
      <VStack spacing={'4px'} align={'stretch'}>
        <Heading size='sm'>{title}</Heading>
        <Text>{subTitle}</Text>
        <Text>{subTitle2}</Text>
        <Text>{subTitle3}</Text>
      </VStack>
      <Image w='120px' h='120px' src={image} borderRadius='full' />
    </Flex>
  );
};


export default Card