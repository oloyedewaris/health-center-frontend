import React, { useState } from 'react'
import { Box, Button, CircularProgress, SimpleGrid, Text, useToast, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../../components/form/FormInput';
import { updatePatientApi } from '../../../api/patients';
import { useMutation } from 'react-query'

const VisualSkill = ({ patient }) => {
  const toast = useToast()
  const [error, setError] = useState('')

  const updatePatientMutation = useMutation(
    (form) => updatePatientApi(form?.patientId, form.type, form.values), {
    onSuccess: res => {
      toast({
        title: 'Visual skill profile updated',
        description: "Your visual skill profile has been succesfully updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => setError(err.response?.data?.msg)
  })

  const formik = useFormik({
    initialValues: {
      weight: patient?.visualSkillProfile?.weight || '',
      health: patient?.visualSkillProfile?.health || '',
      stereopsis: patient?.visualSkillProfile?.stereopsis || '',
      amplitudeOfAccomodation: patient?.visualSkillProfile?.amplitudeOfAccomodation || '',
      distanceRe: patient?.visualSkillProfile?.distanceRe || '',
      distanceLe: patient?.visualSkillProfile?.distanceLe || '',
      distanceBe: patient?.visualSkillProfile?.distanceBe || '',
      nearRe: patient?.visualSkillProfile?.nearRe || '',
      nearLe: patient?.visualSkillProfile?.nearLe || '',
      nearBe: patient?.visualSkillProfile?.nearBe || '',
      pinholeRe: patient?.visualSkillProfile?.pinholeRe || '',
      pinholeLe: patient?.visualSkillProfile?.pinholeLe || '',
      pinholeBe: patient?.visualSkillProfile?.pinholeBe || '',
    },
    onSubmit: (values) => {
      setError('')
      updatePatientMutation.mutate({ patientId: patient?._id, type: 'visualskill', values })
    }
  })

  return (
    <Box padding='24px' w='full'>
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
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
            onChange={formik.handleChange('health')}
            value={formik.values.health}
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
        <Text color='red.500' textAlign={'center'} mt='2'>{error}</Text>
        <Button width="full" mt={6} type="submit">
          {formik.isSubmitting ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            'Update data'
          )}
        </Button>
      </form>
    </Box>
  )
}

export default VisualSkill