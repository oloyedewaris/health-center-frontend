import React, { useContext } from 'react'
import { Box, Button, Checkbox, CircularProgress, SimpleGrid, Text } from '@chakra-ui/react'
import FormInput from '../../components/form/FormInput';
import { useFormik } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { GlobalContext } from '../../context/Provider';
import FormTextarea from '../../components/form/FormTextarea';
import FormSelect from '../../components/form/FromSelect';

const Urine = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      tests: [],
      doctor: `${authState.user?.firstName} ${authState.user?.lastName}`,
      date: new Date().toLocaleDateString(),
      natureOfSpecimen: '',
      investigationRequired: ''
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'urine',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  const handleCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('tests', [...formik.values.tests, key])
    } else {
      const testsCopy = [...formik.values.tests].filter(test => test !== key)
      formik.setFieldValue('tests', testsCopy)
    }
  }

  return (
    <Box padding='24px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Urine Form</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='19px'>
          <Box>
            <FormSelect
              options={['Urine', 'Ear swop', 'HVS', 'Wound swop', 'Others']}
              label='Nature of specimen'
              type='text'
              onChange={e => formik.handleChange('natureOfSpecimen')(`${e.target.value}, ${formik.values.natureOfSpecimen}`)}
              value={formik.values.natureOfSpecimen}
            />
            <FormTextarea
              type='text'
              onChange={formik.handleChange('natureOfSpecimen')}
              value={formik.values.natureOfSpecimen}
              placeholder='Nature of specimen'
            />
          </Box>
          <Box>
            <FormSelect
              options={['Pregnancy test', 'Urine analysis', 'Urine microscopy', 'Urine vvvlds']}
              label='Investigation Required'
              type='text'
              onChange={e => formik.handleChange('investigationRequired')(`${e.target.value}, ${formik.values.investigationRequired}`)}
              value={formik.values.investigationRequired}
            />
            <FormTextarea
              type='text'
              onChange={formik.handleChange('investigationRequired')}
              value={formik.values.investigationRequired}
              placeholder='Investigation Required'
            />
          </Box>
          <FormInput
            label='Doctor'
            type='text'
            onChange={formik.handleChange('doctor')}
            value={formik.values.doctor}
            placeholder='Doctor'
          />
          <FormInput
            label='Date'
            type='text'
            onChange={formik.handleChange('date')}
            value={formik.values.date}
            placeholder='Date'
          />
          <FormInput
            label='Lab Ref'
            type='text'
            onChange={formik.handleChange('labRef')}
            value={formik.values.labRef}
            placeholder='Lab Ref'
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing='49px'>
          <Box>
            <>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('urinalysis')} onChange={(e) => handleCheckChange(e, 'urinalysis')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Urinalysis</Text>
              </Checkbox>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('appearance')}
                  value={formik.values.appearance}
                  label='Appearance'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('pH')}
                  value={formik.values.pH}
                  label='pH'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('glucose')}
                  value={formik.values.glucose}
                  label='Glucose'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('protein')}
                  value={formik.values.protein}
                  label='Protein'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('bilirubin')}
                  value={formik.values.bilirubin}
                  label='Bilirubin'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('urobilinogen')}
                  value={formik.values.urobilinogen}
                  label='Urobilinogen'
                />
              </SimpleGrid>
            </>
            <>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('microscopy')} onChange={(e) => handleCheckChange(e, 'microscopy')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Microscopy</Text>
              </Checkbox>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('plusCells')}
                  value={formik.values.plusCells}
                  label='Plus Cells'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('redCells')}
                  value={formik.values.redCells}
                  label='Red Cells'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('casts')}
                  value={formik.values.casts}
                  label='Casts'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('crystals')}
                  value={formik.values.crystals}
                  label='Crystals'
                />
                <FormInput
                  type='text'
                  onChange={formik.handleChange('others')}
                  value={formik.values.others}
                  label='Others'
                />
              </SimpleGrid>
            </>
          </Box>

          <Box>
            <Checkbox mt='23px' isChecked={formik.values.tests?.includes('sensitivity')} onChange={(e) => handleCheckChange(e, 'sensitivity')}>
              <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Sensitivity</Text>
            </Checkbox>
            <Text fontSize={'18px'} textDecoration={'underline'} mt='5px' fontWeight={500}>Antibiotics</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='19px'>
              <FormInput
                type='text'
                onChange={formik.handleChange('ampicilin')}
                value={formik.values.ampicilin}
                label='Ampicilin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('mechicilin')}
                value={formik.values.mechicilin}
                label='Mechicilin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('erythromycin')}
                value={formik.values.erythromycin}
                label='Erythromycin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('tetracycline')}
                value={formik.values.tetracycline}
                label='Tetracycline'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('septrin')}
                value={formik.values.septrin}
                label='Septrin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('streptomycin')}
                value={formik.values.streptomycin}
                label='Streptomycin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('nitrofurantoin')}
                value={formik.values.nitrofurantoin}
                label='Nitrofurantoin'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('cefotaxine')}
                value={formik.values.cefotaxine}
                label='Cefotaxine'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('tarivid')}
                value={formik.values.tarivid}
                label='Tarivid'
              />
              <FormInput
                type='text'
                onChange={formik.handleChange('ciprofloxacin')}
                value={formik.values.ciprofloxacin}
                label='Ciprofloxacin'
              />
            </SimpleGrid>
            <Box>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('culture')} onChange={(e) => handleCheckChange(e, 'culture')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Culture</Text>
              </Checkbox>
              <FormTextarea
                type='text'
                onChange={formik.handleChange('cultureNote')}
                value={formik.values.cultureNote}
                label='Culture Note'
              />
            </Box>
          </Box>
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

export default Urine