import React, { useContext } from 'react';
import { Flex, Text, HStack, Box, useDisclosure, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { Button } from '../Buttons/index';
import bars from '../../assets/images/bars.svg';
import MobileDrawer from './MobileDrawer';
import { Image } from '@chakra-ui/react';
import { GlobalContext } from '../../context/Provider';
import ProfileMenu from './ProfileMenu';
import { motion } from 'framer-motion';
import GetStarted from './sections/get-started';
import Appointment from './sections/appointment';
import { useQuery } from 'react-query'
import PatientDrawer from './sections/patients';
import SchedulesDrawer from './sections/schedules';
import RequestFormDrawer from './sections/requestForms';
import { getRequestsApi, getSchedulesApi } from '../../api/appointments';


const Navbar = () => {
  const drawerDisclosure = useDisclosure();

  const { authState } = useContext(GlobalContext);
  const loggedIn = authState.isAuthenticated;
  const patientDrawer = useDisclosure();
  const schedulesDrawer = useDisclosure();
  const requestFormDrawer = useDisclosure();
  const getStarted = useDisclosure();
  const appointmentModal = useDisclosure();

  const SCHEDULES_NO = loggedIn ? useQuery(
    ['getSchedulesApi', authState.user?._id],
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
    ['getRequestsApi', authState.user?._id],
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
    <Box mb={{ base: '0', md: '100px' }}>
      <Flex
        position={'fixed'} w='full' top='0' right={0}
        bg='#fff' shadow={'sm'} borderBottom={'1px solid #E4E4E4'}
        display={{ base: 'none', md: 'flex' }} zIndex={20}
        fontFamily={'euclid-medium'} h='94px' px='100px' justify={'space-between'} align={'center'}>
        <Flex align={'center'} gap={'70px'}>
          <Link to={'/'}>
            <Image
              cursor={'pointer'}
              src={logo}
              maxH={'42px'}
              maxW={'400px'}
              alt={logo}
            />
          </Link>
          {loggedIn ? (
            <HStack align={'center'} spacing={'28px'}>
              {auth_data.map((item) => (
                item.path ? (
                  <Link to={item.path} key={item.key}>
                    <Text
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
            </HStack>
          ) : (
            <HStack align={'center'} spacing={'28px'}>
              {no_auth_data.map((item) => (
                item.path ? (
                  <Link to={item.path} key={item.key}>
                    <Text
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
            </HStack>
          )}
        </Flex>

        {loggedIn ? (
          <>
            <ProfileMenu />
            <PatientDrawer patientDrawer={patientDrawer} />
            <SchedulesDrawer schedulesDrawer={schedulesDrawer} />
            <RequestFormDrawer requestFormDrawer={requestFormDrawer} />
          </>
        ) : (
          <>
            <HStack
              h={'75px'} justify={'end'} cursor={'pointer'}
              spacing='15px' whiletap={{ scale: 0.9 }}
              as={motion.div} whilehover={{ scale: 1.1 }}
            >
              <Link to='/auth/login'>
                <Button borderRadius={0} bg='white' color='#19508D' border='1px solid #19508D'>Login</Button>
              </Link>

              <Button
                onClick={getStarted.onOpen}
                borderRadius={0} color='white'
                bg='#19508D' border='1px solid #19508D'
              >Get Started</Button>
            </HStack>
            <Appointment appointmentModal={appointmentModal} />
          </>
        )}

      </Flex>

      <Flex
        position={'fixed'} top='0' right={0}
        bg='#fff' shadow={'sm'} borderBottom={'1px solid #E4E4E4'}
        w='full' px='18px' py='16px' zIndex={20}
        display={{ base: 'flex', md: 'none' }}
        justify={'space-between'} align={'center'}
      >
        <Flex gap='24px' align={'center'}>
          <Box onClick={drawerDisclosure.onOpen}>
            <Image src={bars} />
          </Box>
          <Link to={'/'}>
            <Image
              cursor={'pointer'}
              src={logo}
              maxH={'42px'}
              maxW={'400px'}
              alt={logo}
            />
          </Link>
        </Flex>
        <Button
          onClick={getStarted.onOpen}
          h='34px' w='102px'
          bg='#fff'
          color='#19508d'
          border='1px solid #19508d'
          borderRadius='5px'
        >Get Started</Button>
      </Flex>

      <MobileDrawer drawerDisclosure={drawerDisclosure} />

      <GetStarted getStarted={getStarted} />

    </Box>
  );
};

export default Navbar