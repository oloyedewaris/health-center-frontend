import React, { useEffect } from 'react'
import { Box, Button, Checkbox, CircularProgress, GridItem, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FormTextarea from '../../../../../components/form/FormTextarea';
import axiosInstance from '../../../../../utils/axiosInstance';
import FormSelect from '../../../../../components/form/FromSelect';
import SelectSearch from 'react-select';
import drugsList from '../../../../../utils/drugsList';
import FormInput from '../../../../../components/form/FormInput';
import { updateFluidBalanceApi } from '../../../../../api/patients';
import { useMutation } from 'react-query'


const FluidBalanceEdit = ({ modal, patient, setPatient, fluidBalance }) => {
  const toast = useToast();

  useEffect(() => {
    formik.setValues({
      typeOfFluid: fluidBalance?.typeOfFluid || '',
      intraVenous: fluidBalance?.intraVenous || '',
      oral: fluidBalance?.oral || '',
      urine: fluidBalance?.urine || '',
      othersIntake: fluidBalance?.othersIntake || '',
      gastricAspirate: fluidBalance?.gastricAspirate || '',
      vomit: fluidBalance?.vomit || '',
      bile: fluidBalance?.bile || '',
      blood: fluidBalance?.blood || '',
      stool: fluidBalance?.stool || '',
      othersOutput: fluidBalance?.othersOutput || '',
    })
  }, [fluidBalance])

  const updateFluidBalanceMutation = useMutation(
    (form) => updateFluidBalanceApi(form?.patientId, form?.fluidBalanceId, form?.values), {
    onSuccess: async res => {
      formik.resetForm();
      modal.onClose();
      formik.setSubmitting(false)
      toast({
        title: 'Submitted successfully',
        description: "Record editted",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await refetch()
    },
    onError: err => {
      toast({
        title: 'Submission error',
        description: "An error occurred while submitting, try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      typeOfFluid: fluidBalance?.typeOfFluid || '',
      intraVenous: fluidBalance?.intraVenous || '',
      oral: fluidBalance?.oral || '',
      urine: fluidBalance?.urine || '',
      othersIntake: fluidBalance?.othersIntake || '',
      gastricAspirate: fluidBalance?.gastricAspirate || '',
      vomit: fluidBalance?.vomit || '',
      bile: fluidBalance?.bile || '',
      blood: fluidBalance?.blood || '',
      stool: fluidBalance?.stool || '',
      othersOutput: fluidBalance?.othersOutput || '',
    },
    onSubmit: (values) => {
      updateFluidBalanceMutation.mutate({ patientId: patient?._id, fluidBalanceId: fluidBalance?._id, values })
    }
  })


  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Text fontSize={'20px'} fontWeight={600} my='10px'> Fluid balance (Intake)</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='20px'>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('typeOfFluid')}
                  value={formik.values.typeOfFluid}
                  label='Type of fluid'
                />

                <FormInput
                  type='text'
                  onChange={formik.handleChange('intraVenous')}
                  value={formik.values.intraVenous}
                  label='Intra Venous'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('oral')}
                  value={formik.values.oral}
                  label='Oral'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('othersIntake')}
                  value={formik.values.othersIntake}
                  label='Others'
                />
              </SimpleGrid>


              <Text fontSize={'20px'} fontWeight={600} my='10px'> Fluid balance (Output)</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='20px'>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('gastricAspirate')}
                  value={formik.values.gastricAspirate}
                  label='Gastric Aspirate'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('urine')}
                  value={formik.values.urine}
                  label='Urine'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('vomit')}
                  value={formik.values.vomit}
                  label='Vomit'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('bile')}
                  value={formik.values.bile}
                  label='Bile'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('blood')}
                  value={formik.values.blood}
                  label='Blood'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('stool')}
                  value={formik.values.stool}
                  label='Stool'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('othersOutput')}
                  value={formik.values.othersOutput}
                  label='Others'
                />
              </SimpleGrid>
              <Button variant="outline" width="full" mt={6} type="submit">
                {formik.isSubmitting ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Box>
        </ModalBody >
      </ModalContent >
    </Modal >
  )
}

export default FluidBalanceEdit