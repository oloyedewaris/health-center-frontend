import React from 'react'
import { Box, SimpleGrid, Text, GridItem } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import FormInput from '../../../../components/form/FormInput';

const Haematology = () => {

  return (
    <Box padding='24px' w='full' >
      <Formik
        initialValues={{
          diagnosisAndDetails: '',
          doctor: '',
          date: '',
          labRef: '',
        }}
        onSubmit={(values) => {
        }}>
        {({ values, handleChange }) => (
          <Form>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
              <FormInput
                label='Diagnosis and details'
                type='text'
                onChange={handleChange('diagnosisAndDetails')}
                value={values.diagnosisAndDetails}
                placeholder='Diagnosis and details'
              />
              <FormInput
                label='Doctor'
                type='text'
                onChange={handleChange('doctor')}
                value={values.doctor}
                placeholder='Doctor'
              />
              <FormInput
                label='Date'
                type='text'
                onChange={handleChange('date')}
                value={values.date}
                placeholder='Date'
              />
              <FormInput
                label='Lab Ref'
                type='text'
                onChange={handleChange('labRef')}
                value={values.labRef}
                placeholder='Lab Ref'
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='49px'>
              <Box>
                <Text fontSize={'22px'} mt='30px' fontWeight={600}>Units</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='PCV'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='Hb'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='HCHC'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='WBC'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='eosinophils'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='platelets'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='rectics'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ESR'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='microfilaria'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='malariaParasite'
                  />
                </SimpleGrid>
              </Box>
              <Box>
                <Text fontSize={'22px'} mt='30px' fontWeight={600}>Film Appearance</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='anisocytosis'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='poikilocytosis'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='microcytosis'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='macrocytosis'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='hypochromia'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='sickleCell'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='targetCell'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='spherocytes'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='nucleatedRBC'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='sicklingTest'
                  />
                </SimpleGrid>
              </Box>
              <Box>
                <Text fontSize={'22px'} mt='30px' fontWeight={600}>Differential Count</Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='polymorphs'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='lymphocytes'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='monocytes'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='eosinophils'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='basophils'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='widalTest'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='bloodGroud'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='rhesusFactor'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='tarivid'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ciprofloxacin'
                  />
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Haematology