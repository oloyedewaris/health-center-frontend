import React, { useState } from 'react'
import { Box, Button, Flex, Heading, SimpleGrid, useToast, Center } from '@chakra-ui/react'
import LayoutView from '../../../components/layout';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [patientType, setPatienttype] = useState(null)

  const patientTypeArr = [
    { type: 'Student', href: '/auth/register/bio-data2', id: '1' },
    { type: 'Senior staff', href: '/auth/register/bio-data', id: '2' },
    { type: 'Senior staff dependent', href: '/auth/register/bio-data', id: '3' },
    { type: 'Junior staff', href: '/auth/register/bio-data', id: '4' },
    { type: 'Junior staff dependent', href: '/auth/register/bio-data', id: '5' },
    { type: 'Others', href: '/auth/register/bio-data', id: '6' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (patientType) {
      navigate(patientType?.href, { state: { patientType: patientType?.type } })
    }
    else
      toast({
        title: 'Patient error',
        description: "You have to select a patient type",
        status: 'error',
        duration: 6000,
        isClosable: true
      })
  }

  return (
    <LayoutView>
      <Flex align="center" justifyContent="center" minH='100vh'>
        <Box mt={4} p={8} maxWidth="600px" w='full' borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading> Register Patient </Heading>
          </Box>
          <Box padding='24px' w='full'>
            <form onSubmit={handleSubmit}>
              <Heading mt='40px' textDecoration={'underline'} fontSize='25px'> Patient Type </Heading>
              <SimpleGrid my='10px' columns={{ base: 1, md: 2 }} spacing='19px'>
                {patientTypeArr?.map(pType => (
                  <Center
                    key={pType?.id}
                    cursor={'pointer'}
                    onClick={() => setPatienttype(pType)}
                    borderRadius='8px'
                    w='full'
                    h='44px'
                    color={pType?.id === patientType?.id ? 'white' : '#19518D'}
                    border={'1px solid #19518D'}
                    bg={pType?.id === patientType?.id ? '#19518D' : 'white'}

                  >
                    {pType.type}
                  </Center>
                ))}
              </SimpleGrid>
              <Button width="full" mt={6} type="submit"> Continue </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </LayoutView>
  )
}

export default Register