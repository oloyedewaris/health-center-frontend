import React, { useEffect } from 'react'
import { Box, Button, Checkbox, CircularProgress, GridItem, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FormTextarea from '../../../../../components/form/FormTextarea';
import FormSelect from '../../../../../components/form/FromSelect';
import SelectSearch from 'react-select';
import drugsList from '../../../../../utils/drugsList';
import FormInput from '../../../../../components/form/FormInput';
import { updateTreatmentApi } from '../../../../../api/patients';
import { useMutation } from 'react-query'


const NursingTreatmentEdit = ({ modal, patient, refetch, treatment }) => {
  const toast = useToast();

  useEffect(() => {
    formik.setValues({
      time: treatment?.time || '',
      date: treatment?.date || '',
      drug: treatment?.drug || '',
      given: treatment?.given || false,
      reason: treatment?.reason || '',
      route: treatment?.route || '',
      note: treatment?.note || ''
    })
  }, [treatment])

  const updateTreatmentMutation = useMutation(
    (form) => updateTreatmentApi(form.patientId, form.treatmentId, form.values), {
    onSuccess: async res => {
      formik.resetForm();
      modal.onClose();
      formik.setSubmitting(false)
      toast({
        title: 'Submitted successfully',
        description: "Treatments editted",
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
      time: treatment?.time || '',
      date: treatment?.date || '',
      drug: treatment?.drug || '',
      given: treatment?.given || false,
      reason: treatment?.reason || '',
      route: treatment?.route || '',
      note: treatment?.note || ''
    },
    onSubmit: (values) => {
      updateTreatmentMutation.mutate({ patientId: patient?._id, treatmentId: treatment?._id, values })
    }
  })


  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Text fontSize={'20px'} fontWeight={600}>Comments and Treatments</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='30px'>
                <FormTextarea
                  type='text'
                  onChange={formik.handleChange('time')}
                  value={formik.values.time}
                  label={'Time'}
                />
                <FormTextarea
                  type='text'
                  onChange={formik.handleChange('date')}
                  value={formik.values.date}
                  label={'Date'}
                />
                <GridItem>
                  <SelectSearch
                    isSearchable
                    options={drugsList}
                    onChange={(option) => formik.handleChange('drug')(`${option.value}, ${formik.values.drug}`)}
                  />
                  <FormTextarea
                    type='text'
                    onChange={formik.handleChange('drug')}
                    value={formik.values.drug}
                    label='Drug'
                  />
                </GridItem>
                <FormTextarea
                  type='text'
                  onChange={formik.handleChange('note')}
                  value={formik.values.note}
                  label={'Note'}
                />
                <FormSelect
                  onChange={formik.handleChange('route')}
                  value={formik.values.route}
                  options={['I.M', 'I.V', 'Subcut', 'Oral']}
                  placeholder='Route'
                  label='Route'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('reason')}
                  value={formik.values.reason}
                  label={'Reason'}
                />
                <Checkbox mt='23px' isChecked={formik.values.given} onChange={formik.handleChange('given')} >
                  <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Given</Text>
                </Checkbox>
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

export default NursingTreatmentEdit