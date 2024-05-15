import React from 'react'
import { Box, Flex, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react'
import FormTextarea from '../../../../components/form/FormTextarea';

const CommentAndTreatmentView = ({ modal, comment }) => {

  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form>
              <Text fontSize={'20px'} fontWeight={600}>View Comments and Treatments</Text>
              <Flex gap='25px' my='20px'>
                <SimpleGrid w='47%' columns={{ base: 1, md: 1 }} spacing='20px'>
                  <GridItem>
                    <FormTextarea
                      type='text'
                      value={comment?.signsAndSymptoms}
                      label='Signs and symptoms'
                    />
                  </GridItem>
                  <GridItem>
                    <FormTextarea
                      type='text'
                      value={comment?.assessment}
                      label='Assessment'
                    />
                  </GridItem>
                  <GridItem>
                    <FormTextarea
                      type='text'
                      value={comment?.plan}
                      label='Plan'
                    />
                  </GridItem>
                </SimpleGrid>

                <Box w='47%'>
                  <Heading size='md'>Record Image</Heading>
                  {comment?.image && <Image objectFit="cover" src={comment?.image} alt="Image" /> }
                  {!comment?.image && <p>No image uploaded</p> }
                
                  <Heading size='md' textAlign={'center'}>Examinations</Heading>
                  <Flex direction={'column'} align='center' gap='10px' mt='2'>
                    {(comment?.examination || []).map((exam, index) => (
                      <Box bg='#E4DFDA' w='full' py='8px' px='10px' borderRadius={'8px'} minH={'150px'}>
                        <Text textAlign={'center'} textDecoration={'underline'} fontWeight='500'>{exam.exam}</Text>
                        <Text mt='2'>{exam.note}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </form>
          </Box>
        </ModalBody >
      </ModalContent >
    </Modal >
  )
}

export default CommentAndTreatmentView