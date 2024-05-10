import React, { useContext } from 'react';
import { Badge, Box, Image, Text, useDisclosure } from '@chakra-ui/react';
import {
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import cross from '../../assets/images/cross-black.svg'
import { useQuery } from 'react-query'
import { GlobalContext } from '../../context/Provider';
import { getRequestsApi, getSchedulesApi } from '../../api/appointments';

const DrawerComp = ({ drawerDisclosure }) => {
  const { authState } = useContext(GlobalContext);
  const loggedIn = authState.isAuthenticated;
  const patientDrawer = useDisclosure();
  const schedulesDrawer = useDisclosure();
  const requestFormDrawer = useDisclosure();
  const appointmentModal = useDisclosure();

  const SCHEDULES_NO = loggedIn ? useQuery(
    ['schedulesId', authState.user?._id],
    getSchedulesApi,
    {
      enabled: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      // retry: true,
      // retryDelay: 1000,
      // retryOnMount: true,
    }
  ) : null


  const REQUESTS_NO = loggedIn ? useQuery(
    ['requestsId', authState.user?._id],
    getRequestsApi,
    {
      enabled: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      // retry: true,
      // retryDelay: 1000,
      // retryOnMount: true,
    }
  ) : null

  const auth_data = [
    {
      key: 'home',
      title: 'Home',
      path: '/dashboard',
      badge: null
    },
    {
      key: 'schedules',
      title: 'Schedules',
      badge: SCHEDULES_NO?.data?.data?.no,
      onClick: schedulesDrawer.onOpen
    },
    {
      key: 'requestForms',
      title: 'Request Forms',
      badge: REQUESTS_NO?.data?.data?.no,
      onClick: requestFormDrawer.onOpen
    },
    {
      key: 'patients',
      title: 'Patients',
      onClick: patientDrawer.onOpen,
      badge: null
    }
  ]

  const no_auth_data = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'projects',
      title: 'Contact',
    },
    {
      key: 'appointment',
      title: 'Appointment',
      onClick: appointmentModal.onOpen
    },
  ];


  return (
    <Drawer placement='top' isOpen={drawerDisclosure?.isOpen} onClose={drawerDisclosure.onClose}>
      <DrawerOverlay />
      <DrawerContent maxW='400px' px='24px' py='38px'>
        <Box onClick={drawerDisclosure.onClose}>
          <Image src={cross} w='17px' h='17px' />
        </Box>
        {loggedIn ? (
          <VStack align={'flex-start'} mt='30px' spacing={'33px'}>
            {auth_data.map((item) => (
              item.path ? (
                <Link to={item.path} key={item.key}>
                  <Text
                    onClick={drawerDisclosure.onClose}
                    ml='5px' cursor='pointer'
                    color='#19518D'
                    fontSize='16px' fontWeight={600}
                    whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }}
                  >
                    {item.title}
                    {Boolean(item.badge) && (
                      <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                        {item.badge}
                      </Badge>
                    )}
                  </Text>
                </Link>
              ) : (
                <Text
                  key={item.key}
                  ml='5px' cursor='pointer'
                  onClick={item.onClick} color='#19518D'
                  fontSize='16px' fontWeight={600}
                  whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }}
                >
                  {item.title}
                  {Boolean(item.badge) && (
                    <Badge ml='1' fontSize='0.8em' colorScheme='red'>
                      {item.badge}
                    </Badge>
                  )}
                </Text>
              )
            ))}
          </VStack>
        ) : (
          <VStack align={'flex-start'} mt='30px' spacing={'33px'}>
            {no_auth_data.map((item) => (
              item.path ? (
                <Link to={item.path} key={item.key}>
                  <Text
                    onClick={drawerDisclosure.onClose}
                    ml='5px' cursor='pointer'
                    color='#19518D'
                    fontSize='16px' fontWeight={600}
                    whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }}
                  >
                    {item.title}
                  </Text>
                </Link>
              ) : (
                <Text
                  key={item.key}
                  ml='5px' cursor='pointer'
                  onClick={item.onClick} color='#19518D'
                  fontSize='16px' fontWeight={600}
                  whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }}
                >
                  {item.title}
                </Text>
              )
            ))}
          </VStack>
        )}

        <Link to={'/veerge'}>
          <Button
            outline={'none'}
            borderRadius={'0'}
            onClick={drawerDisclosure.onClose}
            w='full'
            color='white'
            px='20px'
            py='12px'
            mt='30px'
            bg={'#4545FE'}
          >
            Get Started
          </Button>
        </Link>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
