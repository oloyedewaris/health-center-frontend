import React from 'react'
import { Box, Button, CircularProgress, SimpleGrid, Text } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';

const VitalSigns = ({ form, goBack, onSubmitAttachment }) => {
  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      weight: '',
      bloodPressure: '',
      temperature: '',
      pulseRate: '',
      respiratoryRate: '',
      SP02: ''
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'vital',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })
  return (
    <Box p='14px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Vital Signs form</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='14px'>
          <FormInput
            type='text'
            onChange={formik.handleChange('weight')}
            value={formik.values.weight}
            label='Weight (kg)'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('bloodPressure')}
            value={formik.values.bloodPressure}
            label='Blood Pressure (mm|Hg)'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('temperature')}
            value={formik.values.temperature}
            label='Temperature (OC)'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('pulseRate')}
            value={formik.values.pulseRate}
            label='Pulse rate (b|m)'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('respiratoryRate')}
            value={formik.values.respiratoryRate}
            label='Respiratory rate c|m'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('SP02')}
            value={formik.values.SP02}
            label='SP02 (%)'
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

export default VitalSigns