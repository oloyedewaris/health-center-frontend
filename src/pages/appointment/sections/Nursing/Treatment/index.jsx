import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Flex, Heading, Spinner, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import NursingTreatment from './NursingTreatment';
import { BiPlus } from 'react-icons/bi';
import axiosInstance from '../../../../../utils/axiosInstance';
import NursingTreatmentEdit from './TreatmentEdit';
import { getPatientByIdApi, removeTreatmentApi } from '../../../../../api/patients';
import { useMutation, useQuery } from 'react-query'

const Treatment = ({ appointment }) => {
  const patientId = appointment?.patient?._id;
  const treatmentModal = useDisclosure()
  const treatmentViewModal = useDisclosure()
  const [treatment, setTreatment] = useState(null)
  const toast = useToast();

  const getPatientByIdQuery = useQuery(['getPatientByIdApi', patientId], () => getPatientByIdApi(patientId));
  const patient = getPatientByIdQuery?.data?.data


  const removeTreatmentMutation = useMutation(
    (form) => removeTreatmentApi(form.patientId, form.treatmentId), {
    onSuccess: async res => {
      toast({
        title: 'Comment deleted',
        description: "Comments and treatments deleted",
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


  const deleteTreatment = (treatment) => {
    removeTreatmentMutation.mutate({ patientId: patient._id, treatmentId: treatment._id })
  }

  const onViewModal = (cmt) => {
    setTreatment(cmt);
    treatmentViewModal.onOpen();
  }


  return (
    <Box px='24px' w='full'>
      <Flex align={'center'} justify='space-between'>
        <Box w='50px' />
        <Heading textAlign={'center'} size='md'>Nursing And Treatments</Heading>
        <BiPlus style={{ cursor: 'pointer' }} onClick={treatmentModal.onOpen} size={30} />
      </Flex>
      <Box>
        {patient ? (
          <VStack w='full' spacing={'10px'} divider={<Divider />}>
            <Flex gap='7px' w='full' justify={'center'} fontWeight={500}>
              <Text textAlign={'center'} w='13%'>Time</Text>
              <Text textAlign={'center'} w='13%'>Date</Text>
              <Text textAlign={'center'} w='20%'>Drug</Text>
              <Text textAlign={'center'} w='13%'>Given</Text>
              <Text textAlign={'center'} w='13%'>Route</Text>
              <Text textAlign={'center'} w='13%'>Note</Text>
              <Box w='15%'>
                <Text>Action</Text>
              </Box>
            </Flex>
            {(patient?.continuationSheet?.nursingTreatment || [])(cmt => (
              <Flex gap='7px' w='full' justify={'center'}>
                <Text textAlign={'center'} w='13%'>{cmt?.time}</Text>
                <Text textAlign={'center'} w='13%'>{cmt?.date}</Text>
                <Text textAlign={'center'} w='20%'>{cmt?.drug}</Text>
                <Text textAlign={'center'} w='13%'>{cmt?.given ? 'Yes' : 'No'}</Text>
                <Text textAlign={'center'} w='13%'>{cmt?.route}</Text>
                <Text textAlign={'center'} w='13%'>{cmt?.note}</Text>
                <Flex w='15%' gap={'7px'}>
                  <Button onClick={() => onViewModal(cmt)} color='blue'>Edit</Button>
                  <Button onClick={() => deleteTreatment(cmt)} color='red'>Delete</Button>
                </Flex>
              </Flex>
            ))}

          </VStack>
        ) : <Spinner />}
      </Box>

      <NursingTreatment refetch={getPatientByIdQuery.refetch} patient={patient} treatmentModal={treatmentModal} />
      <NursingTreatmentEdit refetch={getPatientByIdQuery.refetch} patient={patient} treatment={treatment} modal={treatmentViewModal} />
    </Box>
  )
}

export default Treatment