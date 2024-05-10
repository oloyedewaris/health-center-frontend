import React, { useState } from 'react'
import { Box, Button, CircularProgress, Image, SimpleGrid, Text, useToast, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../../components/form/FormInput';
import FormSelect from '../../../components/form/FromSelect';
import countries from '../../../utils/countries.json';
import FromDatePicker from '../../../components/form/FromDatePicker';
import NextOfKin from './NexOfKin';
import { updatePatientApi } from '../../../api/patients';
import { useMutation } from 'react-query'

const Biodata = ({ patient, refetch }) => {
  const DOB = patient?.bioData?.dateRegistered
  const toast = useToast()
  const [error, setError] = useState('')
  const [date, setDate] = useState(new Date())

  const updatePatientMutation = useMutation(
    (data) => {
      return updatePatientApi(data?.patientId, data?.type, data?.dataToSubmit)
    }, {
    onSuccess: async res => {
      await refetch()
      toast({
        title: 'Bio-data updated',
        description: "Your bio-data has been succesfully updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => setError(err.response?.data?.msg)
  })

  const formik = useFormik({
    initialValues: {
      surname: patient?.bioData?.surname || '',
      otherNames: patient?.bioData?.otherNames || '',
      email: patient?.bioData?.email || '',
      unitNo: patient?.bioData?.unitNo || '',
      matricNo: patient?.bioData?.matricNo || '',
      title: patient?.bioData?.title || '',
      homeAddress: patient?.bioData?.homeAddress || '',
      NHISNo: patient?.bioData?.NHISNo || '',
      patientType: patient?.bioData?.patientType || '',
      telephone: patient?.bioData?.telephone || '',
      maritalStatus: patient?.bioData?.maritalStatus || '',
      sex: patient?.bioData?.sex || '',
      homeTown: patient?.bioData?.homeTown || '',
      tribe: patient?.bioData?.tribe || '',
      occupation: patient?.bioData?.occupation || '',
      department: patient?.bioData?.department || '',
      religionOrDenimination: patient?.bioData?.religionOrDenimination || '',
      nationality: patient?.bioData?.nationality || '',
      state: patient?.bioData?.state || '',
      xRayNumber: patient?.bioData?.xRayNumber || '',
      sensivity: patient?.bioData?.sensivity || '',
      rhesus: patient?.bioData?.rhesus || '',
      genotype: patient?.bioData?.genotype || '',
      bloodGroup: patient?.bioData?.bloodGroup || '',
      allergies: patient?.bioData?.allergies || '',
    },
    onSubmit: (values) => {
      setError('')
      const dataToSubmit = { ...values, dateOfBirth: date }
      updatePatientMutation.mutate({ patientId: patient?._id, type: 'biodata', dataToSubmit })
    }
  })

  return (
    <>
      <Box padding='24px' w='full' >
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid my='10px' columns={{ base: 1, md: 2 }} spacing='19px'>
            <FormInput
              label='Surname'
              type='text'
              id='surname'
              onChange={formik.handleChange('surname')}
              value={formik.values.surname}
              placeholder='Your surname'
            />
            <FormInput
              label='Other Names'
              type='text'
              id='otherNames'
              onChange={formik.handleChange('otherNames')}
              value={formik.values.otherNames}
              placeholder='Other names'
            />
            <FormInput
              label='Email'
              type='email'
              id='email'
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              placeholder='Email'
            />
            <FormInput
              label='Unit No'
              type='text'
              id='unitNo'
              onChange={formik.handleChange('unitNo')}
              value={formik.values.unitNo}
              placeholder='Your healthcenter Unit No'
            />
            <FormInput
              label='UTME/Matric No'
              type='text'
              id='matricNo'
              onChange={formik.handleChange('matricNo')}
              value={formik.values.matricNo}
              placeholder='Your utme or matric No'
            />
            <FormSelect
              options={['Mr.', 'Mrs.', 'Miss']}
              label='Title'
              id='title'
              onChange={formik.handleChange('title')}
              value={formik.values.title}
              placeholder='Select'
            />
            <FormInput
              label='Home Address'
              type='text'
              id='homeAddress'
              onChange={formik.handleChange('homeAddress')}
              value={formik.values.homeAddress}
              placeholder='Your home address'
            />
            <FormInput
              label='NHIS No.'
              type='text'
              id='NHISNo'
              onChange={formik.handleChange('NHISNo')}
              value={formik.values.NHISNo}
              placeholder='NHISNo'
            />
            <FormSelect
              options={['Student', 'Senior staff', 'Senior staff dependent', 'Junior staff', 'Junior staff dependent', 'Others']}
              label='Patient Type'
              id='patientType'
              onChange={formik.handleChange('patientType')}
              value={formik.values.patientType}
              placeholder='Select a category'
            />
            <FormInput
              label='Telephone'
              type='text'
              id='telephone'
              onChange={formik.handleChange('telephone')}
              value={formik.values.telephone}
              placeholder='081000000000'
            />
            <FormSelect
              label='Marital Status'
              options={['Married', 'Single', 'Divorced', 'Ssperated', 'Barchelor']}
              id='maritalStatus'
              onChange={formik.handleChange('maritalStatus')}
              value={formik.values.maritalStatus}
              placeholder='Select'
            />
            <FormSelect
              label='Sex'
              options={['Male', 'Female']}
              id='sex'
              onChange={formik.handleChange('sex')}
              value={formik.values.sex}
              placeholder='Select'
            />
            <FormInput
              label='Home Town'
              type='text'
              id='homeTown'
              onChange={formik.handleChange('homeTown')}
              value={formik.values.homeTown}
              placeholder='Your home town'
            />
            <FormInput
              label='Tribe'
              type='text'
              id='tribe'
              onChange={formik.handleChange('tribe')}
              value={formik.values.tribe}
              placeholder='Your tribe'
            />
            <FormInput
              label='Occupation'
              type='text'
              id='occupation'
              onChange={formik.handleChange('occupation')}
              value={formik.values.occupation}
              placeholder='Your occupation'
            />
            <FormInput
              label='Department'
              type='text'
              id='department'
              onChange={formik.handleChange('department')}
              value={formik.values.department}
              placeholder='Your department'
            />
            <FormSelect
              label='Religion'
              options={['Islam', 'Christianity', 'Traditional religion']}
              id='religionOrDenimination'
              onChange={formik.handleChange('religionOrDenimination')}
              value={formik.values.religionOrDenimination}
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
              placeholder='Select'
            />
            <FormInput
              label='State'
              type='text'
              id='state'
              onChange={formik.handleChange('state')}
              value={formik.values.state}
              placeholder='State of residence'
            />
            <FormInput
              label='XRay No.'
              type='text'
              id='xRayNumber'
              onChange={formik.handleChange('xRayNumber')}
              value={formik.values.xRayNumber}
              placeholder='Select'
            />
            <FormInput
              label='Sensivity'
              type='text'
              id='sensivity'
              onChange={formik.handleChange('sensivity')}
              value={formik.values.sensivity}
              placeholder='Select'
            />
            <FormInput
              label='Rhesus'
              type='text'
              id='rhesus'
              onChange={formik.handleChange('rhesus')}
              value={formik.values.rhesus}
              placeholder=''
            />
            <FormSelect
              label='Genotype'
              options={['AS', 'AA', 'SS']}
              id='genotype'
              onChange={formik.handleChange('genotype')}
              value={formik.values.genotype}
              placeholder='Select'
            />
            <FormSelect
              label='Blood Group'
              options={['O', 'AB', 'BA', 'BB']}
              id='bloodGroup'
              onChange={formik.handleChange('bloodGroup')}
              value={formik.values.bloodGroup}
              placeholder='Select'
            />
            <FormInput
              label='Allergies'
              type='text'
              id='allergies'
              onChange={formik.handleChange('allergies')}
              value={formik.values.allergies}
              placeholder='Enter allergies'
            />
          </SimpleGrid>
          <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
          <Button width="full" mt={6} type="submit">
            {updatePatientMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Update Bio-data'
            )}
          </Button>

        </form>
      </Box>
      <NextOfKin patient={patient} />
    </>
  )
}

export default Biodata