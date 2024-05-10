import React, { useContext, useState } from 'react'
import { Box, Button, Center, Flex, Text, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, useToast, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import LayoutView from '../../components/layout';
import Auth from '../../hoc/Auth';
import Biodata from './sections/Biodata';
import ContinuationSheet from './sections/ContinuatioSheet/index';
import Timeline from './sections/Timeline';
import Forward from '../../components/forms/Forward';
import EndModal from './sections/EndModal';
import Nursing from './sections/Nursing/index';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/Provider';
import ConfirmModal from './sections/ConfirmModal';
import { forwardPatientApi, getAppointmentsByIdApi, openAppointmentApi } from '../../api/appointments';
import { useMutation, useQuery } from 'react-query';
import { getAgeApp } from '../../utils/getAge';

const Appointment = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();
  const appointmentId = useParams().id
  const forwardModal = useDisclosure()
  const endModal = useDisclosure()
  const { authState } = useContext(GlobalContext)
  const confirmModal = useDisclosure()

  const getAppointmentsByIdQuery = useQuery(['getAppointmentsByIdApi', appointmentId], () => getAppointmentsByIdApi(appointmentId));
  const appointment = getAppointmentsByIdQuery?.data?.data?.appointment;
  const bioData = appointment?.patient?.bioData;
  const notCurrentWorker = appointment?.currentAttendingWorker && authState.user && appointment?.currentAttendingWorker?._id !== authState.user?._id;

  const forwardPatientMutation = useMutation(forwardPatientApi, {
    onSuccess: res => {
      forwardModal.onClose();
      toast({
        title: 'Forwarded success',
        description: "The patient has been forwarded",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('/dashboard')
    },
    onError: err => {
      toast({
        title: 'Forwarded error',
        description: "Patient forward was not successfully try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  });

  const openAppointmentMutation = useMutation(openAppointmentApi, {
    onSuccess: res => {
      getAppointmentsByIdQuery.refetch()
      toast({
        title: 'Success',
        description: "Appointment opened",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Opening error',
        description: "Opening appointment was not successfully try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const tabs = [
    {
      tablist: "Timeline",
      component: <Timeline refetch={getAppointmentsByIdQuery.refetch} appointment={appointment} />,
    },
    {
      tablist: "Continuation Sheet",
      component: <ContinuationSheet patientId={appointment?.patient?._id} />,
    },
    {
      tablist: "Patient Biodata",
      component: <Biodata bioData={bioData} patient={appointment?.patient} />,
    },
    {
      tablist: "Nursing",
      component: <Nursing appointment={appointment} bioData={bioData} />,
    },
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const onForward = (workerId) => {
    const formData = {
      nextWorker: workerId,
      appointmentId: appointment._id
    }
    forwardPatientMutation.mutate(formData)
  }

  const openAttendance = () => {
    openAppointmentMutation.mutate(appointmentId)
  }


  return (
    <LayoutView>
      <Box pt='50px' pb='20px' px='24px' w='full'>
        <SimpleGrid columns={{ base: 1, md: 4 }} rowGap={'10px'} columnGap={'8px'}>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Surname: </Text>
            <Text as='span' >{bioData?.surname}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Other Names: </Text>
            <Text as='span' >{bioData?.otherNames}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Telephone: </Text>
            <Text as='span' >{bioData?.telephone}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>NHIS No.: </Text>
            <Text as='span' >{bioData?.NHISNo}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Unit No: </Text>
            <Text as='span' >{bioData?.unitNo}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Age: </Text>
            <Text as='span'>{bioData?.dateOfBirth && getAgeApp(bioData?.dateOfBirth)}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Sex: </Text>
            <Text as='span' >{bioData?.sex}</Text>
          </Text>
          <Text noOfLines={1}>
            <Text as='span' fontWeight={500}>Email: </Text>
            <Text as='span' >{bioData?.email}</Text>
          </Text>
        </SimpleGrid>
      </Box>

      {appointment?.closed ? (
        <Center h='40vh' w='full' flexDirection={'column'} gap='15px'>
          <Text color='#ff0000'>Attendance closed</Text>
          <Button color={'white'} onClick={openAttendance} bg='green'>Open attendance</Button>
        </Center>
      ) : (
        <Box>
          {notCurrentWorker ? (
            <Center h='40vh' w='full' flexDirection={'column'} gap='15px'>
              <Heading size='sm' color='#191919'>Unauthorized attendance</Heading>
              <Text color='#191919'>This attendance is not in your posession, would you like to transfer it here?</Text>
              <Button color={'white'} bg='blue'>Push attendance</Button>
            </Center>
          ) : (
            <Tabs onChange={handleTabChange} align="start" isLazy>
              <TabList justifyContent={'space-between'} bg='#EAECF5' borderRadius={'full'} fontWeight="600" fontSize="18px" maxW="100%" w='full' >
                <Flex justify='flex-start'>
                  {tabs.map((item, index) => (
                    <Tab key={index} borderBottom={'0'}>
                      {tabIndex === index ? (
                        <Box fontWeight='700' color='black' bg='white' border='1px solid #B3B8DB' borderRadius='full' mx="auto" minW="73px" px='12px' py='8px'>
                          {item.tablist}
                        </Box>
                      ) : (
                        <Box fontWeight='400' color='#667085' borderRadius='full' mx="auto" minW="73px" px='12px' py='8px'>
                          {item.tablist}
                        </Box>
                      )}
                    </Tab>
                  ))}
                </Flex>
                <Flex h='full' justify={'center'} align={'center'} p='4' gap='40px' pr='6'>
                  {notCurrentWorker && (
                    <Text onClick={confirmModal.onOpen} cursor={'pointer'} color='blue'>
                      Push attendance
                    </Text>
                  )}
                  <Link to={`/patient/${appointment?.patient?._id}`}>
                    <Text cursor={'pointer'} color='#009900'>
                      View patient
                    </Text>
                  </Link>
                  <Text cursor={'pointer'} onClick={forwardModal.onOpen} color='#19518D'>
                    Forward patient
                  </Text>
                  <Text cursor={'pointer'} onClick={endModal.onOpen} color='#ff0000'>
                    End
                  </Text>
                </Flex>
              </TabList>

              <TabPanels>
                {tabs.map((item, index) => (
                  <TabPanel key={index} px="0px">
                    {item.component}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>

          )}
        </Box>
      )}
      <Forward heading={'Forward patient to'} onForward={onForward} forwardModal={forwardModal} />
      <EndModal appointment={appointment} endModal={endModal} />
      <ConfirmModal refetch={getAppointmentsByIdQuery.refetch} appointment={appointment} confirmModal={confirmModal} />
    </LayoutView>
  )
}

export default Auth(Appointment)