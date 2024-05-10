import React from 'react';
import { Image, Box, GridItem, VStack, Text, HStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import instagram from '../../assets/images/instagram.svg';
import linkedIn from '../../assets/images/linked-in.svg';
import mail from '../../assets/images/mail.svg'

const Footer = () => {
  return (
    <Box w='full' bg='#F7F7F7' pt={{ base: '22px', md: '59px' }} pb={{ base: '22px', md: '109px' }} fontFamily={'euclid'}>
      <SimpleGrid columnGap={{ base: '20px', md: '30px' }} rowGap={{ base: '50px', md: '15px' }} columns={{ base: 2, md: 3 }} w={{ base: '90%', md: '75%' }} mx='auto' justify={'space-between'}>
        <GridItem colSpan={{ base: '2', md: 1 }}>
          <VStack spacing={'16px'} align={'stretch'}>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' mb='8px'>Help</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Contact us</Text>
            </Box>
            <Link to='/'>
              <Box w='full'>
                <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Give Feedback</Text>
              </Box>
            </Link>
            <Link to='/'>
              <Box w='full'>
                <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Suggest an idea</Text>
              </Box>
            </Link>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: '2', md: 1 }}>
          <VStack spacing={'16px'} align={'stretch'}>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' mb='8px'>Company</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Why us?</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Our mission</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Our value</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Our culture</Text>
            </Box>
            <Box w='full'>
              <Text w='fit-content' color='#0A142F' opacity={0.65} className='hover-underline-animation'>Help Centre</Text>
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: '2', md: 1 }}>
          <Box mt={{ base: 'unset', md: '200px' }} fontWeight={500} fontSize={'16px'}>
            <HStack spacing={'15px'} align={'center'}>
              <Image w='24px' h='24px' src={instagram} />
              <Image w='24px' h='24px' src={linkedIn} />
              <Image w='24px' h='24px' src={mail} />
            </HStack>
            <HStack mt='14px' color={'#19508d'} spacing={'30px'} fontFamily={'euclid-medium'}>
              <Text fontSize={'14px'} fontWeight={400}>Terms of use </Text>
              <Text fontSize={'14px'} fontWeight={400}>Privacy policy</Text>
            </HStack>
            <Text mt='10px' fontSize={'14px'} fontWeight={400} color='#919191'>Proudly developed by
              <Link style={{ color: '#19508d' }} href='https://waris-oloyede.netlify.app/'>
                {" "} Waris
              </Link>
            </Text>
            <Text mt='10px' fontSize={'14px'} fontWeight={400} color='#919191'>© Copyright 2024</Text>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default Footer