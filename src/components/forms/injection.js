import React, { useContext } from 'react'
import { Box, Button, CircularProgress, FormLabel, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';
import FormTextarea from '../../components/form/FormTextarea';
import { GlobalContext } from '../../context/Provider';
import SelectSearch from 'react-select';
import drugsList from '../../utils/drugsList';
import { getAgeApp } from '../../utils/getAge';

const Injection = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      surname: bioData?.surname || '',
      otherNames: bioData?.otherNames || '',
      age: bioData?.dateOfBirth ? getAgeApp(bioData?.dateOfBirth) : '',
      unitNo: bioData?.unitNo || '',
      date: new Date().toLocaleDateString(),
      physician: `${authState.user?.firstName} ${authState.user?.lastName}`,
      RX: '',
      injection: '',
    }),
    onSubmit: (values) => {
      const dataToSubmit = {
        attachmentType: 'injection',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  return (
    <Box p='14px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Injection Form</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='14px'>
          <FormInput
            type='text'
            onChange={formik.handleChange('surname')}
            value={formik.values.surname}
            label='Surname'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('otherNames')}
            value={formik.values.otherNames}
            label='Other Names'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('age')}
            value={formik.values.age}
            label='Age'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('unitNo')}
            value={formik.values.unitNo}
            label='Unit Number'
          />
          <GridItem>
            <FormLabel>RX</FormLabel>
            <SelectSearch
              isSearchable
              options={drugsList}
              onChange={(option) => formik.handleChange('RX')(`${option.value}, ${formik.values.RX}`)}
            />
            <FormTextarea
              type='text'
              onChange={formik.handleChange('RX')}
              value={formik.values.RX}
            />
          </GridItem>
          <GridItem>
            <FormLabel>Injection</FormLabel>
            <SelectSearch
              isSearchable
              options={drugsList}
              onChange={(option) => formik.handleChange('injection')(`${option.value}, ${formik.values.injection}`)}
            />
            <FormTextarea
              onChange={formik.handleChange('injection')}
              value={formik.values.injection}
            />
          </GridItem>
          <FormInput
            type='text'
            onChange={formik.handleChange('date')}
            value={formik.values.date}
            label='Date'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('physician')}
            value={formik.values.physician}
            label='Physician'
          />
        </SimpleGrid>
        <Button variant="outline" width="full" mt={6} type="submit">
          {formik.isSubmitting ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            'Attach'
          )}
        </Button>
      </form>
    </Box>
  )
}

export default Injection