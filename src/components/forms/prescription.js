import React, { useContext } from 'react'
import { Box, Button, Checkbox, CircularProgress, Flex, FormLabel, GridItem, SimpleGrid, Text, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';
import FormTextarea from '../../components/form/FormTextarea';
import { GlobalContext } from '../../context/Provider';
import drugsList from '../../utils/drugsList';
import SelectSearch from 'react-select';
import daysOptionsData from '../../utils/daysOptionsData';
import { getAgeApp } from '../../utils/getAge';

const Prescription = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      patientAge: bioData?.dateOfBirth ? getAgeApp(bioData?.dateOfBirth) : '',
      patientSex: bioData?.sex || '',
      patientName: `${bioData?.surname || ''} ${bioData?.otherNames || ''}`,
      date: new Date().toLocaleDateString(),
      patientAddress: bioData?.homeAddress || '',
      patientNHIS: bioData?.NHISNo || '',
      patientTel: bioData?.telephone || '',
      patientHMONo: bioData?.name || '',
      RX: '',
      noOfItemsDispensed: '',
      valueOfItemsDispensed: '',
      prescribersName: `${authState.user?.firstName} ${authState.user?.lastName}`,
      days: [],
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'prescription',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  const handleAddDays = (option) => {
    const findExisting = formik.values.days?.find(day => day.time === option?.value)

    if (!findExisting)
      formik.setFieldValue('days', [...formik.values.days, { time: option.value, checked: false }])
  }

  const handleToggleDay = (i) => {
    const newDays = [...formik.values.days]
    const day = newDays?.find((val, index) => i === index)
    day.checked = !day.checked

    formik.setFieldValue('days', newDays)
  }

  return (
    <Box p='14px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Prescription Form</Text>
        <Box my='20px'>
          <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='14px'>
            <FormInput
              type='text'
              onChange={formik.handleChange('patientName')}
              value={formik.values.patientName}
              label='Name'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientAge')}
              value={formik.values.patientAge}
              label='Age'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientSex')}
              value={formik.values.patientSex}
              label='Sex'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('date')}
              value={formik.values.date}
              label='Date'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientAddress')}
              value={formik.values.patientAddress}
              label='Address'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientNHIS')}
              value={formik.values.patientNHIS}
              label='NHIS No'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientHMONo')}
              value={formik.values.patientHMONo}
              label='HMO No'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('patientTel')}
              value={formik.values.patientTel}
              label='Telephone'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('noOfItemsDispensed')}
              value={formik.values.noOfItemsDispensed}
              label='No of Item Dispensed'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('valueOfItemsDispensed')}
              value={formik.values.valueOfItemsDispensed}
              label='Value of Items Dispensed'
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
              <FormLabel>Dosage days</FormLabel>
              <SelectSearch
                isSearchable
                options={daysOptionsData}
                onChange={handleAddDays}
              />
              <Flex mt='23px' flexWrap={'wrap'} w='full' rowGap='10px'>
                {formik.values.days?.map((day, i) => (
                  <Checkbox w='50%' isChecked={day?.checked} onChange={() => handleToggleDay(i)}>
                    <Text display={'inline'}>{day?.time}</Text>
                  </Checkbox>
                ))}
              </Flex>
            </GridItem>


            <FormInput
              type='text'
              onChange={formik.handleChange('prescribersName')}
              value={formik.values.prescribersName}
              label='Prescribers Name'
            />
          </SimpleGrid>
        </Box>

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

export default Prescription