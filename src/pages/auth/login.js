import React, { useContext, useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Button,
  CircularProgress,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import axiosInstance from '../../utils/axiosInstance';
import * as Yup from 'yup';
import { GlobalContext } from '../../context/Provider';
import { loginUser } from '../../context/actions/auth';
import FormInput from '../../components/form/FormInput';
import { useNavigate } from 'react-router-dom';
import LayoutView from '../../components/layout';
import FormInputPassword from '../../components/form/FormInputPassword';
import { useMutation } from 'react-query'
import { loginApi } from '../../api/auth';

export default function Login() {
  const navigate = useNavigate()
  const { authDispatch } = useContext(GlobalContext);
  const [error, setError] = useState('');

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('invalid email')
      .required('required'),
    password: Yup.string()
      .min(6, 'password too short!')
      .required('required')
  });

  const loginMutation = useMutation(loginApi, {
    onSuccess: res => {
      loginUser(res.data)(authDispatch)
      navigate('/dashboard')
    },
    onError: err => {
      setError(err.response?.data?.msg)
    }
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      setError('')
      loginMutation.mutate(values)
    },
    validationSchema: FormSchema
  });

  return (
    <LayoutView>
      <Flex align="center" justifyContent="center" minH='100vh'>
        <Box p={8} maxWidth="600px" w='full' borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading> Login </Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                mt='4'
                label='Email'
                type="email"
                id='email'
                placeholder="test@test.com"
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <FormInputPassword
                mt='6'
                label='Password'
                type="password"
                id='password'
                placeholder="********"
                onChange={formik.handleChange('password')}
                value={formik.values.password}
                error={formik.errors.password}
              />
              <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
              <Button variant="outline" width="full" mt={6} type="submit">
                {loginMutation.isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </LayoutView>
  );
}