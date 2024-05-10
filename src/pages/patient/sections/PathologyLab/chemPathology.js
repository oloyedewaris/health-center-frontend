import React from 'react'
import { Box, SimpleGrid, Text, } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import FormInput from '../../../../components/form/FormInput';

const ChemPathology = () => {

  return (
    <Box padding='24px' w='full' >
      <Formik
        initialValues={{
          chemicalDiagnosis: '',
          doctor: '',
          date: '',
          labRef: '',
          labComment: '',
        }}
        onSubmit={(values) => {
        }}>
        {({ values, handleChange }) => (
          <Form>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
              <FormInput
                label='Chemical diagnosis'
                type='text'
                onChange={handleChange('chemicalDiagnosis')}
                value={values.chemicalDiagnosis}
                placeholder='Chemical diagnosis'
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
              <FormInput
                label='Lab comment'
                type='text'
                onChange={handleChange('labComment')}
                value={values.labComment}
                placeholder='Lab comment'
              />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='49px'>
              <Box>
                <>
                  <Text fontSize={'22px'} mt='30px' fontWeight={600}>Electrolytes</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='Na'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='K'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='CI'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='HcO3'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='Creatinnie'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='urea'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='uricAcid'
                    />
                  </SimpleGrid>
                </>
                <>
                  <Text fontSize={'22px'} mt='30px' fontWeight={600}>Proteins</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='totalProteins'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='albumin'
                    />
                    <FormInput
                      type='text'
                      onChange={handleChange('amplitudeOfAccomodation')}
                      value={values.amplitudeOfAccomodation}
                      placeholder='globulin'
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
                <Text fontSize={'22px'} mt='30px' fontWeight={600}>Fasting Lipids</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='totalChol'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='TG'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='HDL'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='LDL'
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
                    placeholder='glucoseFasting'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='glucose2HPP'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='LFT'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='bilirubinTotal'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='bilirubinConj'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ALKPhos'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='acidPhos'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ALTSPGT'
                  />
                  <FormInput
                    type='text'
                    onChange={handleChange('amplitudeOfAccomodation')}
                    value={values.amplitudeOfAccomodation}
                    placeholder='ASLWGOT'
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

export default ChemPathology