import React, { useState } from 'react'
import { Box, Button, Divider, Flex, Heading, Spinner, Text, VStack, useDisclosure } from '@chakra-ui/react'
import CommentAndTreatmentView from '../../../pages/appointment/sections/ContinuatioSheet/CommentAndTreatmentView';

const ContinuationSheet = ({ patient }) => {
  const commentViewModal = useDisclosure()
  const [comment, setComment] = useState(null)

  const onViewModal = (cmt) => {
    setComment(cmt);
    commentViewModal.onOpen();
  }


  return (
    <Box px='24px' w='full'>
      <Flex align={'center'} justify='center'>
        <Heading textAlign={'center'} size='md'>Comments And Treatments</Heading>
      </Flex>
      {patient ? (
        <VStack w='full' spacing={'10px'} divider={<Divider />}>
          <Flex gap='10px' w='full' justify={'center'} fontWeight={500}>
            <Text w='28%'>Signs and Symptoms</Text>
            <Text w='28%'>Assessment</Text>
            <Text w='28%'>Plan</Text>
            <Box w='16%'>
              <Text>Action</Text>
            </Box>
          </Flex>
          {(patient?.continuationSheet?.commentAndTreatment || [])?.map(cmt => (
            <Flex gap='10px' w='full' justify={'center'}>
              <Text w='28%'>{cmt?.signsAndSymptoms}</Text>
              <Text w='28%'>{cmt?.assessment}</Text>
              <Text w='28%'>{cmt?.plan}</Text>
              <Flex w='16%' gap={'7px'}>
                <Button onClick={() => onViewModal(cmt)} color='blue'>View</Button>
              </Flex>
            </Flex>
          ))}

        </VStack>
      ) : <Spinner />}

      <CommentAndTreatmentView comment={comment} modal={commentViewModal} />
    </Box>
  )
}

export default ContinuationSheet;