import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Flex, GridItem, Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay, SimpleGrid, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { useFormik } from 'formik';
import camera from '../../../images/camera.png';
import FormInput from '../../../components/form/FormInput';
import FormSelect from '../../../components/form/FromSelect';
import countries from '../../../utils/countries.json';
import LayoutView from '../../../components/layout';
import { useNavigate } from 'react-router-dom';
import FromDatePicker from '../../../components/form/FromDatePicker';
import * as Yup from 'yup';
import { useMutation } from 'react-query'
import { registerBioDataApi } from '../../../api/auth';
import { useLocation } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import avatar from '../../../assets/images/avatar.png'
import uploadImage from '../../../utils/uploadImage';

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [date, setDate] = useState(new Date())
  const [loadingImage, setLoadingImage] = useState(false);
  const [dependant, setDependant] = useState(null);
  const location = useLocation();
  const showDependancy = useDisclosure()

  const FormSchema = Yup.object().shape({
    surname: Yup.string().required('surname is required'),
    otherNames: Yup.string().required('other names is required'),
    telephone: Yup.string().required('telephone is required'),
    sex: Yup.string().required('choose a sex'),
    unitNo: Yup.string().required('enter your health-centre n0'),
    email: Yup.string().email('email not correct').required('email is required'),
  });

  const registerBioDataMutation = useMutation(registerBioDataApi, {
    onSuccess: res => {
      localStorage.setItem('userId', res.data?.patient?._id)
      navigate('/auth/register/next-of-kin')
    },
    onError: err => {
      if (err.response?.data?.msg === 'registerAsDependant') {
        showDependancy.onOpen();
        setDependant(err.response?.data?.dependant)
      } else {
        showDependancy.onClose();
        setError(err.response?.data?.msg)
      }
    },
    onSettled: () => formik.setSubmitting(false)
  })


  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues: {
      surname: '',
      otherNames: '',
      email: '',
      unitNo: '',
      title: '',
      homeAddress: '',
      telephone: '',
      maritalStatus: '',
      sex: '',
      homeTown: '',
      tribe: '',
      occupation: '',
      department: '',
      religionOrDenimination: '',
      nationality: '',
      state: '',
      xRayNumber: '',
      sensivity: '',
      rhesus: '',
      genotype: '',
      bloodGroup: '',
      allergies: '',
      image: '',
    },
    onSubmit: (values) => {
      setError('')
      const dataToSubmit = { ...location?.state, ...values, dateOfBirth: date }
      registerBioDataMutation.mutate(dataToSubmit)
    }
  })


  const addFiles = useCallback((acceptedFiles) => {
    setLoadingImage(true)
    uploadImage(acceptedFiles)
      .then(res => {
        const url = res.data.url;
        formik.setFieldValue('image', url);
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
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: addFiles
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);

  const handleProceedAsDependant = () => {
    const dataToSubmit = { ...location?.state, ...formik.values, dateOfBirth: date, registerAsDependant: true };
    registerBioDataMutation.mutate(dataToSubmit);
  }


  return (
    <LayoutView>
      <Flex align="center" justifyContent="center" minH='100vh'>
        <Box mt={4} p={8} maxWidth="600px" w='full' borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading> Register Patient </Heading>
          </Box>
          <Box padding='24px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Heading mt='40px' textDecoration={'underline'} fontSize='25px'> Bio-Data </Heading>
              <SimpleGrid my='10px' columns={{ base: 1, md: 2 }} spacing='19px'>
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
                    {loadingImage ? <Spinner w='full' h='full' /> : formik.values.image ? (
                      <Image
                        borderRadius={'full'}
                        w='full' h='full'
                        src={formik.values.image}
                        fallbackSrc={avatar}
                        position={'absolute'}
                        top={'0'} right={'0'}
                      />
                    ) : (
                      <Image
                        borderRadius={'full'}
                        w='full' h='full'
                        src={avatar}
                        position={'absolute'}
                        top={'0'} right={'0'}
                      />
                    )}
                    <Image zIndex={2} src={camera} position={'absolute'} top={'5px'} right={'5px'} />
                  </Box>
                </GridItem>

                <FormInput
                  label='Surname'
                  type='text'
                  id='surname'
                  onChange={formik.handleChange('surname')}
                  value={formik.values.surname}
                  error={formik.errors.surname}
                  placeholder='Your surname'
                />
                <FormInput
                  label='Other Names'
                  type='text'
                  id='otherNames'
                  onChange={formik.handleChange('otherNames')}
                  value={formik.values.otherNames}
                  error={formik.errors.otherNames}
                  placeholder='Other names'
                />
                <FormInput
                  label='Email'
                  type='email'
                  id='email'
                  onChange={formik.handleChange('email')}
                  value={formik.values.email}
                  error={formik.errors.email}
                  placeholder='Email'
                />
                <FormInput
                  label='Health center No'
                  type='text'
                  id='unitNo'
                  onChange={formik.handleChange('unitNo')}
                  value={formik.values.unitNo}
                  error={formik.errors.unitNo}
                  placeholder='Your healthcenter Health center No'
                />
                <FormSelect
                  options={['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.']}
                  label='Title'
                  id='title'
                  onChange={formik.handleChange('title')}
                  value={formik.values.title}
                  error={formik.errors.title}
                  placeholder='Select'
                />
                <FormInput
                  label='Home Address'
                  type='text'
                  id='homeAddress'
                  onChange={formik.handleChange('homeAddress')}
                  value={formik.values.homeAddress}
                  error={formik.errors.homeAddress}
                  placeholder='Your home address'
                />
                <FormInput
                  label='Telephone'
                  type='text'
                  id='telephone'
                  onChange={formik.handleChange('telephone')}
                  value={formik.values.telephone}
                  error={formik.errors.telephone}
                  placeholder='081000000000'
                />
                <FormSelect
                  label='Marital Status'
                  options={['Married', 'Single', 'Divorced', 'Sperated', 'Widow']}
                  id='maritalStatus'
                  onChange={formik.handleChange('maritalStatus')}
                  value={formik.values.maritalStatus}
                  error={formik.errors.maritalStatus}
                  placeholder='Select'
                />
                <FormSelect
                  label='Sex'
                  options={['Male', 'Female']}
                  id='sex'
                  onChange={formik.handleChange('sex')}
                  value={formik.values.sex}
                  error={formik.errors.sex}
                  placeholder='Select'
                />
                <FormInput
                  label='Home Town'
                  type='text'
                  id='homeTown'
                  onChange={formik.handleChange('homeTown')}
                  value={formik.values.homeTown}
                  error={formik.errors.homeTown}
                  placeholder='Your home town'
                />
                <FormInput
                  label='Tribe'
                  type='text'
                  id='tribe'
                  onChange={formik.handleChange('tribe')}
                  value={formik.values.tribe}
                  error={formik.errors.tribe}
                  placeholder='Your tribe'
                />
                <FormInput
                  label='Occupation'
                  type='text'
                  id='occupation'
                  onChange={formik.handleChange('occupation')}
                  value={formik.values.occupation}
                  error={formik.errors.occupation}
                  placeholder='Your occupation'
                />
                <FormInput
                  label='Department'
                  type='text'
                  id='department'
                  onChange={formik.handleChange('department')}
                  value={formik.values.department}
                  error={formik.errors.department}
                  placeholder='Your department'
                />
                <FormSelect
                  label='Religion'
                  options={['Islam', 'Christianity', 'Traditional religion']}
                  id='religionOrDenimination'
                  onChange={formik.handleChange('religionOrDenimination')}
                  value={formik.values.religionOrDenimination}
                  error={formik.errors.religionOrDenimination}
                  placeholder='Select'
                />
                <FromDatePicker
                  label='Date Of Birth'
                  id='dateOfBirth'
                  onChange={e => setDate(e)}
                  value={date}
                />
                <FormSelect
                  label='Nationality'
                  options={countries}
                  id='nationality'
                  onChange={formik.handleChange('nationality')}
                  value={formik.values.nationality}
                  error={formik.errors.nationality}
                  placeholder='Select'
                />
                <FormInput
                  label='State'
                  type='text'
                  id='state'
                  onChange={formik.handleChange('state')}
                  value={formik.values.state}
                  error={formik.errors.state}
                  placeholder='State of residence'
                />
                <FormInput
                  label='XRay No.'
                  type='text'
                  id='xRayNumber'
                  onChange={formik.handleChange('xRayNumber')}
                  value={formik.values.xRayNumber}
                  error={formik.errors.xRayNumber}
                  placeholder='Select'
                />
                <FormInput
                  label='Sensivity'
                  type='text'
                  id='sensivity'
                  onChange={formik.handleChange('sensivity')}
                  value={formik.values.sensivity}
                  error={formik.errors.sensivity}
                  placeholder='Select'
                />
                <FormInput
                  label='Rhesus'
                  type='text'
                  id='rhesus'
                  onChange={formik.handleChange('rhesus')}
                  value={formik.values.rhesus}
                  error={formik.errors.rhesus}
                  placeholder='Select'
                />
                <FormSelect
                  label='Genotype'
                  options={['AS', 'AA', 'SS']}
                  id='genotype'
                  onChange={formik.handleChange('genotype')}
                  value={formik.values.genotype}
                  error={formik.errors.genotype}
                  placeholder='Select'
                />
                <FormSelect
                  label='Blood Group'
                  options={['O', 'AB', 'BA', 'BB']}
                  id='bloodGroup'
                  onChange={formik.handleChange('bloodGroup')}
                  value={formik.values.bloodGroup}
                  error={formik.errors.bloodGroup}
                  placeholder='Select'
                />
                <FormInput
                  label='Allergies'
                  type='text'
                  id='allergies'
                  onChange={formik.handleChange('allergies')}
                  value={formik.values.allergies}
                  error={formik.errors.allergies}
                  placeholder='Enter allergies'
                />
              </SimpleGrid>
              <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
              <Button width="full" mt={6} type="submit">
                {formik.isSubmitting ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>

      <Modal isCentered isOpen={showDependancy?.isOpen} onClose={showDependancy?.onClose}>
        <ModalOverlay />
        <ModalContent maxW='600px' minHeight={'260px'}>
          <ModalBody maxH='90vh' overflowY={'scroll'}>
            <Box my='10%'>
              <Heading size='md' textAlign='center'>
                {`Would you like to register as a dependant to ${dependant?.bioData?.surname, dependant?.bioData?.otherNames}?`}
              </Heading>
              <Flex justify={'space-between'} align='center' mt='30px'>
                <Button w='45%' onClick={handleProceedAsDependant}>Yes</Button>
                <Button w='45%' onClick={showDependancy?.onClose}>No</Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </LayoutView>
  )
}

export default Register