import React, { useState } from 'react'
import { Box, Button, CircularProgress, Flex, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../../components/form/FormInput';
import LayoutView from '../../../components/layout';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from 'react-query'
import { registerNextOfKinApi } from '../../../api/auth';

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [error, setError] = useState('')

  const FormSchema = Yup.object().shape({
    NOKname: Yup.string().required('required'),
    NOKrelationship: Yup.string().required('required'),
    NOKtelephone: Yup.string().required('required'),
    NOKaddress: Yup.string().required('required'),
  });

  const registerNextOfKinMutation = useMutation(registerNextOfKinApi, {
    onSuccess: res => {
      toast({
        title: 'Patient registered',
        description: "You have successfully registered as a patient",
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      formik.resetForm();
      navigate('/')
    },
    onError: err => setError(err.response?.data?.msg)
  })


  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues: {
      NOKname: '',
      NOKrelationship: '',
      NOKtelephone: '',
      NOKaddress: '',
    },
    onSubmit: (values) => {
      setError('')
      const dataToSubmit = { ...values }
      registerNextOfKinMutation.mutate(dataToSubmit);
    }
  })

  return (
    <LayoutView>
      <Flex align="center" justifyContent="center">
        <Box mt={4} p={8} maxWidth="600px" w='full' borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading> Register Patient </Heading>
          </Box>
          <Box padding='24px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Heading mt='40px' textDecoration={'underline'} fontSize='25px'> Next Of Kin </Heading>
              <SimpleGrid my='10px' columns={{ base: 1, md: 2 }} spacing='19px'>
                <FormInput
                  label='Name'
                  type='text'
                  onChange={formik.handleChange('NOKname')}
                  value={formik.values.NOKname}
                  error={formik.errors.NOKname}
                  placeholder='Next of kin name'
                />
                <FormInput
                  label='Relationship'
                  type='text'
                  onChange={formik.handleChange('NOKrelationship')}
                  value={formik.values.NOKrelationship}
                  error={formik.errors.NOKrelationship}
                  placeholder='Relationship with next of kin'
                />
                <FormInput
                  label='Telephone'
                  type='text'
                  onChange={formik.handleChange('NOKtelephone')}
                  value={formik.values.NOKtelephone}
                  error={formik.errors.NOKtelephone}
                  placeholder='Next of kin telephone'
                />
                <FormInput
                  label='Address'
                  type='text'
                  onChange={formik.handleChange('NOKaddress')}
                  value={formik.values.NOKaddress}
                  error={formik.errors.NOKaddress}
                  placeholder='Next of kin address'
                />
              </SimpleGrid>
              <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
              <Button width="full" mt={6} type="submit">
                {registerNextOfKinMutation.isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Complete process'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </LayoutView>
  )
}

export default Register