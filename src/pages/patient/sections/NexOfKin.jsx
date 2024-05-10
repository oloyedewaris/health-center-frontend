import React, { useState } from 'react'
import { Box, Button, CircularProgress, SimpleGrid, Text, useToast, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../../components/form/FormInput';
import { updatePatientApi } from '../../../api/patients';
import { useMutation } from 'react-query'

const NextOfKin = ({ patient }) => {
  const toast = useToast()
  const [error, setError] = useState('')

  const updatePatientMutation = useMutation((data) => {
    return updatePatientApi(data?.patientId, data?.type, data?.values)
  }, {
    onSuccess: res => {
      toast({
        title: 'Next of kin updated',
        description: "Your next of kin data has been succesfully updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => setError(err.response?.data?.msg)
  })

  const formik = useFormik({
    initialValues: {
      name: patient?.nextOfKin?.name || '',
      relationship: patient?.nextOfKin?.relationship || '',
      telephone: patient?.nextOfKin?.telephone || '',
      address: patient?.nextOfKin?.address || '',
    },
    onSubmit: (values) => {
      setError('')
      updatePatientMutation.mutate({ patientId: patient?._id, type: 'nextofkin', values })
    }
  })

  return (
    <Box padding='24px' w='full' >
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
          <FormInput
            label='Name'
            type='text'
            onChange={formik.handleChange('name')}
            value={formik.values.name}
            placeholder='Your name'
          />
          <FormInput
            label='Relationship'
            type='text'
            onChange={formik.handleChange('relationship')}
            value={formik.values.relationship}
            placeholder='Relationship with next of kin'
          />
          <FormInput
            label='Telephone'
            type='text'
            onChange={formik.handleChange('telephone')}
            value={formik.values.telephone}
            placeholder='Next of kin telephone'
          />
          <FormInput
            label='Address'
            type='text'
            onChange={formik.handleChange('address')}
            value={formik.values.address}
            placeholder='Next of kin address'
          />
        </SimpleGrid>
        <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
        <Button width="full" mt={6} type="submit">
          {updatePatientMutation.isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            'Update next of kin data'
          )}
        </Button>
      </form>
    </Box>
  )
}

export default NextOfKin