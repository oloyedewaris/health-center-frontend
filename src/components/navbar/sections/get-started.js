import React from 'react'
import { Button, VStack } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GetStarted = ({ getStarted }) => {
  const navigate = useNavigate()

  return (
    <Modal isCentered isOpen={getStarted.isOpen} onClose={getStarted.onClose}>
      <ModalOverlay />
      <ModalContent maxW='400px'>
        <ModalBody p='50px'>
          <VStack align={'stretch'} spacing={'20px'}>
            <Button onClick={() => navigate('/auth/register/')}>Signup as Patient</Button>
            <Button onClick={() => navigate('/auth/register-worker')}>Signup as Health-centre Worker</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GetStarted