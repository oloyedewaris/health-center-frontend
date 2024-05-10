import React, { useState } from 'react'
import { Box, Button, Divider, Flex, Heading, Spinner, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import CommentAndTreatment from './CommentAndTreatment';
import { BiPlus } from 'react-icons/bi';
import CommentAndTreatmentEdit from './CommentAndTreatmentEdit';
import { getPatientByIdApi, removeCommentApi } from '../../../../api/patients';
import { useMutation, useQuery } from 'react-query'

const ContinuationSheet = ({ patientId }) => {
  const commentModal = useDisclosure()
  const commentViewModal = useDisclosure()
  const [comment, setComment] = useState(null)
  const toast = useToast();

  const getPatientByIdQuery = useQuery(['getPatientByIdApi', patientId], () => getPatientByIdApi(patientId));
  const patient = getPatientByIdQuery?.data?.data


  const removeCommentMutation = useMutation(
    (form) => removeCommentApi(form?.patientId, form?.commentId), {
    onSuccess: async res => {
      await getPatientByIdQuery.refetch()
      toast({
        title: 'Comment deleted',
        description: "Comments and treatments deleted",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
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

  const deleteComment = (comment) => {
    removeCommentMutation.mutate({ patientId: patient._id, commentId: comment._id })
  }

  const onViewModal = (cmt) => {
    setComment(cmt);
    commentViewModal.onOpen();
  }

  return (
    <Box px='24px' w='full'>
      <Flex align={'center'} justify='space-between'>
        <Box w='50px' />
        <Heading textAlign={'center'} size='md'>Comments And Treatments</Heading>
        <BiPlus style={{ cursor: 'pointer' }} onClick={commentModal.onOpen} size={30} />
      </Flex>
      {patient ? (
        <VStack w='full' spacing={'10px'} divider={<Divider />}>
          <Flex gap='20px' w='full' justify={'center'} fontWeight={500}>
            <Text w='28%'>Signs and Symptoms</Text>
            <Text w='28%'>Assessment</Text>
            <Text w='28%'>Plan</Text>
            <Box w='16%'>
              <Text>Action</Text>
            </Box>
          </Flex>
          {(patient?.continuationSheet?.commentAndTreatment || []).map(cmt => (
            <Flex gap='20px' w='full' justify={'center'}>
              <Text w='28%'>{cmt?.signsAndSymptoms}</Text>
              <Text w='28%'>{cmt?.assessment}</Text>
              <Text w='28%'>{cmt?.plan}</Text>
              <Flex w='16%' gap={'7px'}>
                <Button onClick={() => onViewModal(cmt)} color='blue'>Edit</Button>
                <Button onClick={() => deleteComment(cmt)} color='red'>Delete</Button>
              </Flex>
            </Flex>
          ))}

        </VStack>
      ) : <Spinner />}

      <CommentAndTreatment refetch={getPatientByIdQuery.refetch} patient={patient} commentModal={commentModal} />
      <CommentAndTreatmentEdit refetch={getPatientByIdQuery.refetch} patient={patient} comment={comment} modal={commentViewModal} />
    </Box>
  )
}

export default ContinuationSheet