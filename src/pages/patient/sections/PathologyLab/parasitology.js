import React from 'react'
import { Box, FormControl, FormLabel, SimpleGrid, Switch, Text, } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import FormInput from '../../../../components/form/FormInput';
import FormSelect from '../../../../components/form/FromSelect';

const Parasitology = () => {

  return (
    <Box padding='24px' w='full' >
      <Formik
        initialValues={{
          natureOfSpecimen: '',
          investigationRequired: '',
          dateOfCollection: '',
          dateReported: '',
          diagnosis: '',
          doctorSignature: '',
          labNumber: '',
        }}
        onSubmit={(values) => {
        }}>
        {({ values, handleChange }) => (
          <Form>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
              <FormInput
                label='Nature of specimen'
                type='text'
                onChange={handleChange('natureOfSpecimen')}
                value={values.natureOfSpecimen}
                placeholder='Nature of specimen'
              />
              <FormInput
                label='Investigation required'
                type='text'
                onChange={handleChange('investigationRequired')}
                value={values.investigationRequired}
                placeholder='Investigation required'
              />
              <FormInput
                label='Date of collection'
                type='text'
                onChange={handleChange('dateOfCollection')}
                value={values.dateOfCollection}
                placeholder='Date of collection'
              />
              <FormInput
                label='Date reported'
                type='text'
                onChange={handleChange('dateReported')}
                value={values.dateReported}
                placeholder='Date reported'
              />
              <FormInput
                label='Diagnosis'
                type='text'
                onChange={handleChange('diagnosis')}
                value={values.diagnosis}
                placeholder='Diagnosis'
              />
              <FormInput
                label='Doctor signature'
                type='text'
                onChange={handleChange('doctorSignature')}
                value={values.doctorSignature}
                placeholder='Doctor signature'
              />
              <FormInput
                label='Lab number'
                type='text'
                onChange={handleChange('labNumber')}
                value={values.labNumber}
                placeholder='Lab number'
              />
            </SimpleGrid>


            <Text fontSize={'22px'} mt='30px' fontWeight={600}>Lab Report</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} rowGap='29px' columnGap='19px' mt='10px'>
              <FormSelect
                mt={4}
                label='Ova Of'
                options={['hookWorm', 'A.lumbriocoides', 'T.Trichuris', 'E.vemicularis', 'S.haematobium', 'No cysts. ova']}
                placeholder='Ova Of'
              // value={formik.values.type}
              // borderColor={formik.errors.type && 'red'}
              // onChange={formik.handleChange('type')}
              />
              <FormSelect
                mt={4}
                label='Trophozoites'
                options={['E.coli', 'E.hysto', 'G. lamblia']}
                placeholder='Trophozoites'
              // value={formik.values.type}
              // borderColor={formik.errors.type && 'red'}
              // onChange={formik.handleChange('type')}
              />
              <FormSelect
                mt={4}
                label='Larvae Of'
                options={['Hook worm', 'S. stercoralis',]}
                placeholder='Larvae Of'
              // value={formik.values.type}
              // borderColor={formik.errors.type && 'red'}
              // onChange={formik.handleChange('type')}
              />
              <FormSelect
                mt={4}
                label='Cells'
                options={["RBC's", "WBC's",]}
                placeholder='Cells'
              // value={formik.values.type}
              // borderColor={formik.errors.type && 'red'}
              // onChange={formik.handleChange('type')}
              />
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='email-alerts' mb='0'>Occult Blood</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Box >
  )
}

export default Parasitology