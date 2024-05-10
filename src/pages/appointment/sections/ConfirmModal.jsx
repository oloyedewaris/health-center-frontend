import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Button, Flex, useToast, Center, Box } from '@chakra-ui/react';
import { pushAttendanceApi } from '../../../api/appointments';
import { useMutation } from 'react-query'


const ConfirmModal = ({ refetch, confirmModal, appointment }) => {
  const toast = useToast();
  const pushAttendanceMutation = useMutation(pushAttendanceApi, {
    onSuccess: async res => {
      confirmModal.onClose();
      await refetch();
      toast({
        title: 'Attendance pushed',
        description: "You can attend to this patient",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Ending error',
        description: "Patient attendance did successfully ended",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const handleYes = () => {
    pushAttendanceMutation.mutate(appointment?._id)
  }

  return (
    <Modal isCentered isOpen={confirmModal?.isOpen} onClose={confirmModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='600px' minHeight={'260px'}>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box my='10%'>
            <Heading size='md' textAlign='center'>Would you like to attend to this patient?</Heading>
            <Flex justify={'space-between'} align='center' mt='30px'>
              <Button w='45%' onClick={handleYes}>Yes</Button>
              <Button w='45%' onClick={confirmModal?.onClose}>No</Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal