import React from 'react'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import FormInput from '../../../../components/form/FormInput';

const Urine = () => {

  return (
    <Box padding='24px' w='full' >
      <Formik
        initialValues={{
          investigationRequired: '',
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
                label='Investigation Required'
                type='text'
                onChange={handleChange('investigationRequired')}
                value={values.investigationRequired}
                placeholder='Investigation Required'
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
                <>
                  <Text fontSize={'22px'} mt='30px' fontWeight={600}>Urinalysis</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='appearance'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='pH'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='glucose'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='protein'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='bilirubin'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='urobilinogen'
                    />
                  </SimpleGrid>
                </>
                <>
                  <Text fontSize={'22px'} mt='30px' fontWeight={600}>Microscopy</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='plusCells'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='redCells'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='casts'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='crystals'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='others'
                    />
                  </SimpleGrid>
                </>
              </Box>

              <Box>
                <Text fontSize={'22px'} mt='30px' fontWeight={600}>Antibiotics</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ampicilin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='mechicilin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='erythromycin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='tetracycline'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='septrin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='streptomycin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='nitrofurantoin'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='cefotaxine'
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

export default Urine