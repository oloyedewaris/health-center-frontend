import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, FormLabel, GridItem, Image, SimpleGrid, Switch, Select, Button, CircularProgress, useToast, Text, Flex, Spinner, Heading } from '@chakra-ui/react'
import { useFormik } from 'formik';
import camera from '../../images/camera.png';
import FormInput from '../../components/form/FormInput';
import { GlobalContext } from '../../context/Provider';
import FormSelect from '../../components/form/FromSelect';
import LayoutView from '../../components/layout';
import Auth from '../../hoc/Auth';
import { Link } from 'react-router-dom';
import units from '../../utils/units'
import { useDropzone } from "react-dropzone";
import uploadImage from '../../utils/uploadImage';
import { authenticateUser } from '../../context/actions/auth';
import avatar from '../../assets/images/avatar.png'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Patients from './section/patients';
import Workers from './section/workers';
import { useNavigate } from 'react-router-dom';
import { updateWorkerApi, updateWorkerImageApi } from '../../api/workers';
import { useMutation } from 'react-query'

const Dashboard = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const { authState, authDispatch } = useContext(GlobalContext)
  const [selectedUnit, setSselectedUnit] = useState(() => units.find(unit => unit?.unit === (authState.user?.unit)))
  const [loadingImage, setLoadingImage] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);


  useEffect(() => {
    if (authState.isAuthenticated && !authState.user.isAdmin) {
      navigate('/dashboard')
    }
  }, [authState])


  const updateWorkerImageMutation = useMutation(updateWorkerImageApi, {
    onSuccess: res => {
      authenticateUser({ user: res.data.updatedWorker })(authDispatch)
    },
    onError: err => {
      toast({
        title: "Error...",
        description: 'An error occurred while saving image',
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  })

  const updateWorkerMutation = useMutation(updateWorkerApi, {
    onSuccess: res => {
      toast({
        description: "Your profile data has been succesfully updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => setError(err.response?.data?.msg)
  })

  const formik = useFormik({
    initialValues: {
      idNo: authState.user?.idNo || '',
      firstName: authState.user?.firstName || '',
      lastName: authState.user?.lastName || '',
      email: authState.user?.email || '',
      phoneNumber: authState.user?.phoneNumber || '',
      unit: authState.user?.unit || '',
      subUnit: authState.user?.subUnit || '',
      available: authState.user?.available,
    },
    onSubmit: (values) => {
      setError('');
      updateWorkerMutation.mutate(values)
    }
  })

  const handleUnit = (e) => {
    const unitGotten = units.find(unit => unit.unit === e.target.value)
    setSselectedUnit(unitGotten)
    formik.handleChange('unit')(e)
  }

  const addFiles = useCallback((acceptedFiles) => {
    setLoadingImage(true)
    uploadImage(acceptedFiles)
      .then(res => {
        const url = res.data.url;
        const dataToSubmit = { image: url, workerId: authState?.user?._id };
        updateWorkerImageMutation.mutate(dataToSubmit)
      })
      .catch(err => {
        toast({
          title: "Error...",
          description: 'An error occurred while uploading image',
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => setLoadingImage(false))
  })

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: { "image/*": [], },
    maxSize: 15 * 1024 * 1024,
    multiple: false,
    onDrop: addFiles
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${fileRejections[0].errors[0].code}: file is larger than 15MB`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);


  const tabs = [
    {
      tablist: "Workers",
      component: <Workers />,
    },
    {
      tablist: "Patients",
      component: <Patients />,
    },
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };



  return (
    <LayoutView>
      <Box padding='24px' w='full' >
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid columns={2} columnGap={'20px'}>
            <GridItem colSpan={2} mb='30px'>
              <Box
                h='140px' w='140px'
                borderRadius={'full'}
                mx='auto'
                position={'relative'}
                {...getRootProps({ className: "dropzone" })}
              >
                <input {...getInputProps()} />
                {isDragActive && <Text>Drop the files here</Text>}
                {loadingImage ? <Spinner w='full' h='full' /> : (
                  <Image
                    borderRadius={'full'}
                    w='full' h='full'
                    src={authState?.user?.image}
                    fallbackSrc={avatar}
                    position={'absolute'}
                    top={'0'} right={'0'}
                  />
                )}
                <Image zIndex={2} src={camera} position={'absolute'} top={'5px'} right={'5px'} />
              </Box>
            </GridItem>
            <FormInput
              mt='4'
              label='Hospital ID'
              type="text"
              id='id'
              placeholder="Your hospital Identification"
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
            <Flex h='full' mt={4} alignItems='center'>
              <FormLabel htmlFor='availability' mb='0'>Availability status</FormLabel>
              <Switch isChecked={formik.values.available} onChange={formik.handleChange('available')} />
            </Flex>
            <Box mt={4} alignItems='center'>
              <Link to={'/dashboard/password'} >
                <Text color='red' cursor={'pointer'}>Change password</Text>
              </Link>
            </Box>
          </SimpleGrid>
          <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
          <Button width="full" mt={6} type="submit">
            {updateWorkerMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Update Profile'
            )}
          </Button>
        </form>
      </Box>

      <Box mt='5'>
        <Heading textAlign={'center'} size='md'>Admin panel</Heading>
        <Tabs onChange={handleTabChange} isLazy shadow={'xl'}>
          <SimpleGrid columns={{ base: 1, md: 4 }} w='full' spacing='20px' >
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <TabList minH='80vh' flexDirection={'column'} h='full' px='0' gap='10px' pt='30px' shadow='md' fontWeight="600" fontSize="18px">
                {tabs.map((item, index) => (
                  <Tab key={index} borderBottom={0} w='full' mx='0'>
                    {tabIndex === index ? (
                      <Flex fontWeight='600' color='white' bg='#19518D' borderRadius='10px' mx="0" w="full" px='12px' py='8px'>
                        {item.tablist}
                      </Flex>
                    ) : (
                      <Flex fontWeight='600' color='black' borderRadius='10px' mx="auto" w="full" px='12px' py='8px'>
                        {item.tablist}
                      </Flex>
                    )}
                  </Tab>
                ))}
              </TabList>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 3 }} >
              <TabPanels shadow='md' minH='80vh'>
                {tabs.map((item, index) => (
                  <TabPanel key={index} px="0px">
                    {item.component}
                  </TabPanel>
                ))}
              </TabPanels>
            </GridItem>
          </SimpleGrid>
        </Tabs>
      </Box>
    </LayoutView>
  )
}

export default Auth(Dashboard)