import React from 'react'
import { Box, Flex, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import FormTextarea from '../../../../../components/form/FormTextarea';
import FormInput from '../../../../../components/form/FormInput';

const FluidBalanceView = ({ modal, comment }) => {

  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form>
              <Text fontSize={'20px'} fontWeight={600} my='10px'> Fluid balance (Intake)</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='20px'>
                <FormInput
                  type='text'
                  value={comment?.typeOfFluid}
                  label='Type of fluid'
                />

                <FormInput
                  type='text'
                  value={comment?.intraVenous}
                  label='Intra Venous'
                />
                <FormInput
                  type='text'
                  value={comment?.oral}
                  label='Oral'
                />
                <FormInput
                  type='text'
                  value={comment?.othersIntake}
                  label='Others'
                />
              </SimpleGrid>


              <Text fontSize={'20px'} fontWeight={600} my='10px'> Fluid balance (Output)</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='20px'>
                <FormInput
                  type='text'
                  value={comment?.gastricAspirate}
                  label='Gastric Aspirate'
                />
                <FormInput
                  type='text'
                  value={comment?.urine}
                  label='Urine'
                />
                <FormInput
                  type='text'
                  value={comment?.vomit}
                  label='Vomit'
                />
                <FormInput
                  type='text'
                  value={comment?.bile}
                  label='Bile'
                />
                <FormInput
                  type='text'
                  value={comment?.blood}
                  label='Blood'
                />
                <FormInput
                  type='text'
                  value={comment?.stool}
                  label='Stool'
                />
                <FormInput
                  type='text'
                  value={comment?.othersOutput}
                  label='Others'
                />
              </SimpleGrid>
            </form>
          </Box>
        </ModalBody >
      </ModalContent >
    </Modal >
  )
}

export default FluidBalanceView