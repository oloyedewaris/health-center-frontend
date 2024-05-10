import React from 'react'
import { Box, FormLabel, GridItem, Image, SimpleGrid, Switch, Text, Flex, HStack } from '@chakra-ui/react'
import camera from '../../images/camera.png';
import LayoutView from '../../components/layout';
import Auth from '../../hoc/Auth';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getWorker } from '../../api/workers';

const Worker = () => {
  const workerId = useParams().id

  const workerQuery = useQuery(['getWorker', workerId], () => getWorker(workerId));
  const worker = workerQuery?.data?.data;

  return (
    <LayoutView>
      <Box padding='24px' w='full' >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing='29px'>
          <GridItem colSpan={3} mb='30px'>
            <Box h='140px' w='140px' borderRadius={'full'} bg='#D6D6D6' mx='auto' position={'relative'}>
              <Image src={camera} position={'absolute'} top={'5px'} right={'5px'} />
            </Box>
          </GridItem>
          <HStack>
            <Text>Hospital ID: </Text>
            <Text>{worker?.idNo}</Text>
          </HStack>
          <HStack>
            <Text>First Name: </Text>
            <Text>{worker?.firstName}</Text>
          </HStack>
          <HStack>
            <Text>Last Name: </Text>
            <Text>{worker?.lastName}</Text>
          </HStack>
          <HStack>
            <Text>Email: </Text>
            <Text>{worker?.email}</Text>
          </HStack>
          <HStack>
            <Text>Phone Number: </Text>
            <Text>{worker?.phoneNumber}</Text>
          </HStack>
          <HStack>
            <Text>Unit: </Text>
            <Text>{worker?.unit}</Text>
          </HStack>
          <HStack>
            <Text>Sub unit: </Text>
            <Text>{worker?.subUnit}</Text>
          </HStack>
          <Flex h='full' mt={4} alignItems='center'>
            <FormLabel htmlFor='availability' mb='0'>Availability status: </FormLabel>
            <Switch isChecked={worker?.available} willChange={false} />
          </Flex>
        </SimpleGrid>
      </Box>
    </LayoutView>
  )
}

export default Auth(Worker)