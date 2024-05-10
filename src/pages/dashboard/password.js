import React, { useState } from 'react'
import { Box, SimpleGrid, Button, CircularProgress, useToast, Text } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import LayoutView from '../../components/layout';
import { useMutation } from 'react-query'
import { updateWorkerPasswordApi } from '../../api/workers';

const Password = () => {
  const toast = useToast()
  const [error, setError] = useState('')

  const updatePatientPasswordMutation = useMutation(updateWorkerPasswordApi, {
    onSuccess: res => {
      toast({
        title: 'Password updated',
        description: "Your password has been succesfully updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      formik.setValues({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      })
      setError('')
    },
    onError: err => setError(err.response?.data?.msg)
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: (values) => {
      setError('');
      updatePatientPasswordMutation.mutate(values)
    }
  })

  return (
    <LayoutView>
      <Box padding='24px' w='full' >
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid columns={2} columnGap={'20px'}>
            <FormInput
              mt='4'
              label='Password'
              type="password"
              id='password'
              placeholder="Your current password"
              onChange={formik.handleChange('password')}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <FormInput
              mt='4'
              label='New Password'
              type="password"
              id='newPassword'
              placeholder="Your new password"
              onChange={formik.handleChange('newPassword')}
              value={formik.values.newPassword}
              error={formik.errors.newPassword}
            />
            <FormInput
              mt='4'
              label='Confirm New Password'
              type="password"
              id='confirmNewPassword'
              placeholder="Confirm New Password"
              onChange={formik.handleChange('confirmNewPassword')}
              value={formik.values.confirmNewPassword}
              error={formik.errors.confirmNewPassword}
            />
          </SimpleGrid>
          <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
          <Button width="full" mt={6} type="submit">
            {updatePatientPasswordMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Change password'
            )}
          </Button>
        </form>
      </Box>
    </LayoutView>
  )
}

export default Password