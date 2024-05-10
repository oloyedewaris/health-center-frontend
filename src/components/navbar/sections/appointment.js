import React from 'react'
import { Button, ModalHeader, VStack, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import FormInput from '../../../components/form/FormInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query'
import { startAppointmentByStudentApi } from '../../../api/appointments';

const Appointment = ({ appointmentModal }) => {
  const toast = useToast()

  const startAppointmentMutation = useMutation(startAppointmentByStudentApi, {
    onSuccess: res => {
      toast({
        title: 'Attendance started',
        description: res.data?.msg || "Patient's attendance has successfully started",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      appointmentModal.onClose()
    },
    onError: err => {
      toast({
        title: 'An error occurred',
        description: err.response?.data?.msg || "An error occurred while starting appointment",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const FormSchema = Yup.object().shape({
    unit: Yup.string()
      .min(3, 'unit no too short')
      .required('required'),
  });

  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues: {
      unit: ''
    },
    onSubmit: values => startAppointmentMutation.mutate(values.unit)
  })

  return (
    <Modal isCentered isOpen={appointmentModal.isOpen} onClose={appointmentModal.onClose}>
      <ModalOverlay />
      <ModalContent maxW='450px'>
        <ModalHeader>Schedule an appointment</ModalHeader>
        <ModalBody p='50px'>
          <VStack align={'stretch'} spacing={'20px'}>
            <FormInput
              label={'Unit No'}
              placeholder={'Enter Your Unit No'}
              value={formik.values.unit}
              error={formik.errors.unit}
              onChange={formik.handleChange('unit')}
            />
            <Button onClick={formik.handleSubmit}>Set appointment</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Appointment