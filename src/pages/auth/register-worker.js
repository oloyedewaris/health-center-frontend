import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  FormControl,
  FormLabel,
  Switch,
  useToast,
  SimpleGrid
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/form/FormInput';
import LayoutView from '../../components/layout';
import { useNavigate } from 'react-router-dom';
import FormSelect from '../../components/form/FromSelect';
import { Link } from 'react-router-dom';
import units from '../../utils/units'
import FormInputPassword from '../../components/form/FormInputPassword';
import { useMutation } from 'react-query'
import { registerWorkerApi } from '../../api/auth';

export default function Register() {
  const navigate = useNavigate()
  const toast = useToast();
  const [error, setError] = useState('');
  const [selectedUnit, setSselectedUnit] = useState(null)

  const FormSchema = Yup.object().shape({
    idNo: Yup.string()
      .min(3, 'idNo too short')
      .required('required'),
    firstName: Yup.string()
      .min(3, 'Name too short')
      .required('required'),
    lastName: Yup.string()
      .min(3, 'lastName too short')
      .required('required'),
    email: Yup.string()
      .email('Invalid email')
      .required('required'),
    password: Yup.string()
      .min(6, 'Password Too Short!')
      .required('required'),
    confirmPassword: Yup.string()
      .min(6, 'Confirm Password Too Short!')
      .required('required'),
    phoneNumber: Yup.string()
      .min(11, 'phoneNumber too short')
      .required('required'),
    unit: Yup.string()
      .required('required'),
    subUnit: Yup.string()
      .required('required'),
    available: Yup.boolean()
      .required('required'),
  });

  const registerWorkerMutation = useMutation(registerWorkerApi, {
    onSuccess: res => {
      toast({
        title: 'Account created',
        description: "We've succesfully created your account, now login as a worker",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('/auth/login')
    },
    onError: err => setError(err.response?.data?.msg)
  })


  const formik = useFormik({
    initialValues: {
      idNo: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      unit: '',
      subUnit: '',
      available: true,
    },
    onSubmit: values => {
      if (values.password !== values.password) {
        return setError('Passwords does not match, please check again')
      }
      setError('')
      registerWorkerMutation.mutate(values)
    },
    validationSchema: FormSchema
  });

  const handleUnit = (e) => {
    const unitGotten = units.find(unit => unit.unit === e.target.value)
    setSselectedUnit(unitGotten)
    formik.handleChange('unit')(e)
  }

  return (
    <LayoutView>
      <Flex align="center" justifyContent="center" minH='100vh' my='10vh'>
        <Box p={8} maxWidth="600px" w='full' borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading> Register Staff </Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <SimpleGrid columns={2} columnGap={'20px'}>
                <FormInput
                  mt='4'
                  label='Staff ID'
                  type="text"
                  id='id'
                  placeholder="Your Staff Identification"
                  onChange={formik.handleChange('idNo')}
                  value={formik.values.idNo}
                  error={formik.errors.idNo}
                />
                <FormInput
                  mt='4'
                  label='First Name'
                  type="text"
                  id='firstName'
                  placeholder="Your first name"
                  onChange={formik.handleChange('firstName')}
                  value={formik.values.firstName}
                  error={formik.errors.firstName}
                />
                <FormInput
                  mt='4'
                  label='Last Name'
                  type="text"
                  id='lastName'
                  placeholder="Your last name"
                  onChange={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  error={formik.errors.lastName}
                />
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
                <FormInput
                  mt='4'
                  label='Phone Number'
                  type="tel"
                  id='phone'
                  placeholder="081**********"
                  onChange={formik.handleChange('phoneNumber')}
                  value={formik.values.phoneNumber}
                  error={formik.errors.phoneNumber}
                />
                <FormInputPassword
                  mt='4'
                  label='Password'
                  type="password"
                  id='password'
                  placeholder="********"
                  onChange={formik.handleChange('password')}
                  value={formik.values.password}
                  error={formik.errors.password}
                />
                <FormInputPassword
                  mt='4'
                  label='Confirm Password'
                  type="password"
                  id='confirmPassword'
                  placeholder="********"
                  onChange={formik.handleChange('confirmPassword')}
                  value={formik.values.confirmPassword}
                  error={formik.errors.confirmPassword}
                />
                <FormSelect
                  mt={4}
                  label='Unit'
                  options={units.map(unit => unit.unit)}
                  placeholder='Your unit'
                  value={formik.values.unit}
                  error={formik.errors.unit}
                  onChange={handleUnit}
                />
                {selectedUnit && (
                  <FormSelect
                    mt={4}
                    label='Sub Unit'
                    options={selectedUnit?.subUnits}
                    placeholder='Your sub unit'
                    value={formik.values.subUnit}
                    error={formik.errors.subUnit}
                    onChange={formik.handleChange('subUnit')}
                  />
                )}
                <FormControl display='flex' mt={4} alignItems='flex-end' mb='2'>
                  <FormLabel htmlFor='isWorker' mb='0'>Availability status</FormLabel>
                  <Switch isChecked={formik.values.available} onChange={formik.handleChange('available')} />
                </FormControl>
              </SimpleGrid>
              <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
              <Text textAlign={'center'} mt='2'>
                Already have an acount, login
                <Link to={'/auth/login'} > here</Link>
              </Text>
              <Button isLoading={registerWorkerMutation.isLoading} width="full" mt={2} type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </LayoutView>
  );
}