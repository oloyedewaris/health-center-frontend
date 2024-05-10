import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Flex, GridItem, HStack, Heading, SimpleGrid, Spinner, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import FluidBalance from './FluidBalanceComp';
import { BiPlus } from 'react-icons/bi';
import FluidBalanceEdit from './FluidBalanceEdit';
import { Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { removeFluidBalanceApi } from '../../../../../api/patients';
import { useMutation, useQuery } from 'react-query'


const indexed = ({ appointment }) => {
  const patientId = appointment?.patient?._id;
  const fluidModal = useDisclosure()
  const fluidBalanceViewModal = useDisclosure()
  const [fluidBalance, setFluidBalance] = useState(null)
  const toast = useToast();
  const [newRow, setNewRow] = useState(false);

  const getPatientByIdQuery = useQuery(['getPatientByIdApi', patientId], () => getPatientByIdApi(patientId));
  const patient = getPatientByIdQuery?.data?.data

  const removeFluidBalanceMutation = useMutation(
    (form) => removeFluidBalanceApi(form.patientId, form.fluidBalanceId), {
    onSuccess: async res => {
      toast({
        title: 'Deleted',
        description: "Fluid details deleted",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await getPatientByIdQuery.refetch()
    },
    onError: err => {
      toast({
        title: 'Deletion error',
        description: "An error occurred while deleting, try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const deleteTreatment = (fluidBalance) => {
    removeFluidBalanceMutation.mutate({ patientId: patient._id, fluidBalanceId: fluidBalance._id })
  }

  const onViewModal = (cmt) => {
    setFluidBalance(cmt);
    fluidBalanceViewModal.onOpen();
  }


  return (
    <Box w='full' h='full'>
      <Heading textAlign={'center'} size='md'>Fluid Balance Chart</Heading>

      <Flex align='center' mt='40px' w='1500px' overflowY={'scroll'} gap='40px' h='full'>
        <Box w='40%' fontWeight={500}>
          <Text fontWeight={500} textAlign={'center'}>Fluid balance (Intake)</Text>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Type of fluid</Th>
                  <Th>Intra venous</Th>
                  <Th>Oral</Th>
                  <Th>Others</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(patient?.continuationSheet?.fluidChart || [])?.map(cmt => (
                  <Tr>
                    <Td>{cmt?.typeOfFluid}</Td>
                    <Td>{cmt?.intraVenous}</Td>
                    <Td>{cmt?.oral}</Td>
                    <Td>{cmt?.othersIntake}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box h='full' borderRight={'1px solid #191919'} />
        <Box w='60%' fontWeight={500}>
          <Text fontWeight={500} textAlign={'center'}>Fluid balance (Intake)</Text>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Urine</Th>
                  <Th>Gastric aspirate</Th>
                  <Th>Vomit</Th>
                  <Th>Bile</Th>
                  <Th>Blood</Th>
                  <Th>Stool</Th>
                  <Th>Others</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(patient?.continuationSheet?.fluidChart || [])?.map(cmt => (
                  <Tr>
                    <Td>{cmt?.urine}</Td>
                    <Td>{cmt?.gastricAspirate}</Td>
                    <Td>{cmt?.vomit}</Td>
                    <Td>{cmt?.bile}</Td>
                    <Td>{cmt?.blood}</Td>
                    <Td>{cmt?.stool}</Td>
                    <Td>{cmt?.othersOutput}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>

      {newRow && (
        <FluidBalance setNewRow={setNewRow} refetch={getPatientByIdQuery.refetch} patient={patient} fluidModal={fluidModal} />
      )}

      <Button
        mx='20px' mt='30px'
        rightIcon={<BiPlus
          style={{ cursor: 'pointer' }}
          onClick={() => setNewRow(true)}
          size={25}
        />}
      >New row</Button>

      {/* <Flex w='40%' gap={'7px'}>
            <Button onClick={() => onViewModal(cmt)} color='blue'>Edit</Button>
            <Button onClick={() => deleteTreatment(cmt)} color='red'>Delete</Button>
          </Flex> */}

      <FluidBalanceEdit refetch={getPatientByIdQuery.refetch} patient={patient} fluidBalance={fluidBalance} modal={fluidBalanceViewModal} />
    </Box >
  )
}

export default indexed