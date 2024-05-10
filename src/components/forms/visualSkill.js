import React from 'react'
import { Box, Button, CircularProgress, SimpleGrid, Text } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';

const VisualSkill = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      name: '',
      age: '',
      sex: '',
      no: '',
      date: '',
      weight: '',
      height: '',
      amplitudeOfAccomodation: '',
      stereopsis: '',
      distanceRe: '',
      distanceLe: '',
      distanceBe: '',
      nearRe: '',
      nearLe: '',
      nearBe: '',
      pinholeRe: '',
      pinholeLe: '',
      pinholeBe: '',
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'visualSkill',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })


  return (
    <Box padding='24px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Visual skill Form</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='19px'>
          <FormInput
            label='Name'
            type='text'
            onChange={formik.handleChange('name')}
            value={formik.values.name}
            placeholder='Your name'
          />
          <FormInput
            label='Age'
            type='text'
            onChange={formik.handleChange('age')}
            value={formik.values.age}
            placeholder='13 years'
          />
          <FormInput
            label='Sex'
            type='text'
            onChange={formik.handleChange('sex')}
            value={formik.values.sex}
            placeholder='Male'
          />
          <FormInput
            label='Number'
            type='text'
            onChange={formik.handleChange('no')}
            value={formik.values.no}
            placeholder='Your number'
          />
          <FormInput
            label='Date'
            type='text'
            onChange={formik.handleChange('date')}
            value={formik.values.date}
            placeholder='Date'
          />
          <FormInput
            type='text'
            label='Weight'
            onChange={formik.handleChange('weight')}
            value={formik.values.weight}
            placeholder='Weight'
          />
          <FormInput
            label='Health'
            type='text'
            onChange={formik.handleChange('height')}
            value={formik.values.height}
            placeholder='Health'
          />
          <FormInput
            label='Stereopsiss'
            type='text'
            onChange={formik.handleChange('stereopsis')}
            value={formik.values.stereopsis}
            placeholder='Stereopsiss'
          />
          <FormInput
            label='Amplitude Of Accomodation'
            type='text'
            onChange={formik.handleChange('amplitudeOfAccomodation')}
            value={formik.values.amplitudeOfAccomodation}
            placeholder='amplitudeOfAccomodation'
          />
        </SimpleGrid>
        <Box mt='30px'>
          <Text fontSize={'22px'} fontWeight={600}>Visual Acuity</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing='19px'>
            <>
              <FormInput
                type='text'
                onChange={formik.handleChange('distanceRe')}
                value={formik.values.distanceRe}
                placeholder='Distance (RE)'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('distanceLe')}
                value={formik.values.distanceLe}
                placeholder='Distance (LE)'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('distanceBe')}
                value={formik.values.distanceBe}
                placeholder='Distance (BE)'
              />
            </>
            <>
              <FormInput
                type='text'
                onChange={formik.handleChange('nearRe')}
                value={formik.values.nearRe}
                placeholder='Near (RE)'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('nearLe')}
                value={formik.values.nearLe}
                placeholder='Near (LE)'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('nearBe')}
                value={formik.values.nearBe}
                placeholder='Near (BE)'
              />
            </>
          </SimpleGrid>
        </Box>
        <Box mt='30px'>
          <Text fontSize={'22px'} fontWeight={600}>Pinhole Acuity</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing='19px'>
            <FormInput
              type='text'
              onChange={formik.handleChange('pinholeRe')}
              value={formik.values.pinholeRe}
              placeholder='RE'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('pinholeLe')}
              value={formik.values.pinholeLe}
              placeholder='LE'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('pinholeBe')}
              value={formik.values.pinholeBe}
              placeholder='BE'
            />
          </SimpleGrid>
        </Box>
        <Button width="full" mt={6} type="submit">
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

export default VisualSkill