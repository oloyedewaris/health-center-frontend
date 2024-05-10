import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Button, Flex, useToast, Center, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { endAppointmentApi } from '../../../api/appointments';
import { useMutation } from 'react-query'

const EndModal = ({ endModal, appointment }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const endAppointmentMutation = useMutation(endAppointmentApi, {
    onSuccess: res => {
      endModal.onClose();
      toast({
        title: 'Attendance ended',
        description: "The patient's attendance has ended",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('/dashboard')
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

  const handleEnd = () => {
    endAppointmentMutation.mutate(appointment?._id);
  }

  return (
    <Modal isCentered isOpen={endModal?.isOpen} onClose={endModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='600px' minHeight={'260px'}>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box my='10%'>
            <Heading size='md' textAlign='center'>Are you sure you want to end patient attendance?</Heading>
            <Flex justify={'space-between'} align='center' mt='30px'>
              <Button w='45%' onClick={handleEnd}>Yes</Button>
              <Button w='45%' onClick={endModal?.onClose}>No</Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EndModal