import React, { useEffect, useState } from 'react'
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import Injection from './injection';
import Prescription from './prescription';
import VitalSigns from './vitalSigns';
import Payment from './payment';
import Note from './note';
import Parasitology from './parasitology';
import ChemPathology from './chemPathology';
import Urine from './urine';
import Haematology from './haematology';
import VisualSkill from './visualSkill';

const Attachment = ({ bioData, setAttachmentToEdit, attachmentToEdit, attachmentModal, onSubmitAttachment }) => {
  const [step, setStep] = useState(null)
  const goBack = () => setStep(null);


  useEffect(() => {
    if (attachmentToEdit) {
      setStep(attachmentToEdit?.type)
    }
  }, [attachmentToEdit])

  const handleCloseComplete = () => {
    setStep(null)
    setAttachmentToEdit && setAttachmentToEdit(null)
  }

  return (
    <Modal isCentered onCloseComplete={handleCloseComplete} isOpen={attachmentModal?.isOpen} onClose={attachmentModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='90vw' maxH='90vh' overflowY={'scroll'}>
        <ModalBody>
          {step === 'injection' ? (
            <Injection
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'prescription' ? (
            <Prescription
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'note' ? (
            <Note
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'payment' ? (
            <Payment
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'vital' ? (
            <VitalSigns
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'parasitology' ? (
            <Parasitology
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'chemPathology' ? (
            <ChemPathology
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'urine' ? (
            <Urine
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'haematology' ? (
            <Haematology
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : step === 'visualSkill' ? (
            <VisualSkill
              goBack={goBack}
              bioData={bioData}
              form={attachmentToEdit?.form}
              onSubmitAttachment={onSubmitAttachment}
            />
          ) : (
            <Box p='50px'>
              <Text fontSize='20px' fontWeight='600' mb='20px' textAlign={'center'}>Form to Attach</Text>
              <VStack align={'stretch'} spacing={'20px'}>
                <Button onClick={() => setStep('injection')} color='#19518D'>Injection Form</Button>
                <Button onClick={() => setStep('prescription')} color='#19518D'>Prescription Form</Button>
                <Button onClick={() => setStep('payment')} color='#19518D'>Payment slip</Button>
                <Button onClick={() => setStep('vital')} color='#19518D'>Vital Signs</Button>
                <Button onClick={() => setStep('parasitology')} color='#19518D'>Parasitology Form</Button>
                <Button onClick={() => setStep('chemPathology')} color='#19518D'>Chemical Pathology Form</Button>
                <Button onClick={() => setStep('urine')} color='#19518D'>Urine Form</Button>
                <Button onClick={() => setStep('haematology')} color='#19518D'>Haematology Form</Button>
                <Button onClick={() => setStep('visualSkill')} color='#19518D'>Visual Skill Form</Button>
                <Button onClick={() => setStep('note')} color='#19518D'>A short note</Button>
              </VStack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Attachment