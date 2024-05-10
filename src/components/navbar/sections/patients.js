import React, { useState } from 'react'
import { Flex, DrawerCloseButton, Text } from '@chakra-ui/react';
import { VStack, StackDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/form/FormInput';
import { getPatientsApi } from '../../../api/patients';
import { useQuery } from 'react-query'

const PatientDrawer = ({ patientDrawer }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('')

  const patientsQuery = useQuery(['getPatientsApi', searchText], () => getPatientsApi(searchText));
  const patients = patientsQuery?.data?.data;

  const handlePatientClick = (patient) => {
    patientDrawer?.onClose();
    navigate(`/patient/${patient._id}`)
  }


  return (
    <Drawer isCentered={false} scrollBehavior='inside' isOpen={patientDrawer.isOpen} onClose={patientDrawer.onClose}>
      <DrawerOverlay />
      <DrawerContent maxW='500px'>
        <DrawerCloseButton onClose={patientDrawer.onClose} />
        <DrawerHeader my='21px' pb='12px' borderBottom='1px solid #D3D3D3' fontSize={28} fontWeight={500} px='0'>
          <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
            <Heading fontSize={'22px'} fontWeight={600} as='h1'>
              All Patients
            </Heading>
          </Flex>
        </DrawerHeader>
        <DrawerBody p='0'>
          <Box px='40px' mb='20px'>
            <FormInput
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder={'Search patient...'}
            />
          </Box>

          <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} stretch mt='15px'>
            {patients?.map(patient => (
              <Box px='20px' w='full' key={patient?._id} cursor={'pointer'} onClick={() => handlePatientClick(patient)}>
                <Flex align='center' justify='space-between' w='full'>
                  <Text fontSize='16px' fontWeight={600} as='h2' textTransform={'capitalize'}>
                    {patient?.bioData?.surname}  {patient?.bioData?.otherNames}
                  </Text>
                  <Text fontSize={'12px'} ml='8px' lineHeight='16px'>
                    {patient?.bioData?.matricNo}
                  </Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text fontSize={'14px'} fontWeight={400}>
                    {patient?.bioData?.email}
                  </Text>
                  <Text fontSize={'12px'} fontWeight={400}>
                    {patient?.bioData?.NHISNo}
                  </Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PatientDrawer