import React, { useContext } from 'react'
import { Box, Button, Checkbox, CircularProgress, GridItem, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import FormInput from '../../components/form/FormInput';
import { useFormik } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { GlobalContext } from '../../context/Provider';

const Haematology = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      tests: [],
      doctor: `${authState.user?.firstName} ${authState.user?.lastName}`,
      date: new Date().toLocaleDateString(),
    }),
    onSubmit: (values) => {
      const dataToSubmit = {
        attachmentType: 'haematology',
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
      <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Haematology Form</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='10px'>
        <FormInput
          label='Diagnosis and details'
          type='text'
          onChange={formik.handleChange('Diagnosis')}
          value={formik.values.Diagnosis}
          placeholder='Diagnosis and details'
        />
        <FormInput
          label='Doctor'
          type='text'
          onChange={formik.handleChange('Doctor')}
          value={formik.values.Doctor}
          placeholder='Doctor'
        />
        <FormInput
          label='Date'
          type='text'
          onChange={formik.handleChange('Date')}
          value={formik.values.Date}
          placeholder='Date'
        />
        <FormInput
          label='Lab Ref'
          type='text'
          onChange={formik.handleChange('Lab')}
          value={formik.values.Lab}
          placeholder='Lab Ref'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing='12px'>
        <Box>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing='10px'>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('PCV')} onChange={(e) => handleCheckChange(e, 'PCV')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>PCV</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('PCV')}
                value={formik.values.PCV}
                placeholder='PCV'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('Hb')} onChange={(e) => handleCheckChange(e, 'Hb')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Hb</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('Hb')}
                value={formik.values.Hb}
                placeholder='Hb'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('WBC')} onChange={(e) => handleCheckChange(e, 'WBC')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>WBC</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('WBC')}
                value={formik.values.WBC}
                placeholder='WBC'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('eosinophils')} onChange={(e) => handleCheckChange(e, 'eosinophils')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>eosinophils</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('eosinophils')}
                value={formik.values.eosinophils}
                placeholder='eosinophils'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('platelets')} onChange={(e) => handleCheckChange(e, 'platelets')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>platelets</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('platelets')}
                value={formik.values.platelets}
                placeholder='platelets'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('ESR')} onChange={(e) => handleCheckChange(e, 'ESR')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>ESR</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('ESR')}
                value={formik.values.ESR}
                placeholder='ESR'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('microfilaria')} onChange={(e) => handleCheckChange(e, 'microfilaria')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>microfilaria</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('microfilaria')}
                value={formik.values.microfilaria}
                placeholder='microfilaria'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('malariaParasite')} onChange={(e) => handleCheckChange(e, 'malariaParasite')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>malariaParasite</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('malariaParasite')}
                value={formik.values.malariaParasite}
                placeholder='malariaParasite'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('HIV')} onChange={(e) => handleCheckChange(e, 'HIV')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>HIV</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('HIV')}
                value={formik.values.HIV}
                placeholder='HIV'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('HepatitisB')} onChange={(e) => handleCheckChange(e, 'HepatitisB')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>HepatitisB</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('HepatitisB')}
                value={formik.values.HepatitisB}
                placeholder='HepatitisB'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('HepatitisC')} onChange={(e) => handleCheckChange(e, 'HepatitisC')}>
                <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>HepatitisC</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('HepatitisC')}
                value={formik.values.HepatitisC}
                placeholder='HepatitisC'
              />
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box>
          <Checkbox mt='23px' isChecked={formik.values.tests?.includes('filmAppearance')} onChange={(e) => handleCheckChange(e, 'filmAppearance')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Film Appearance</Text>
          </Checkbox>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing='10px'>
            <FormInput
              type='text'
              onChange={formik.handleChange('anisocytosis')}
              value={formik.values.anisocytosis}
              label='anisocytosis'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('poikilocytosis')}
              value={formik.values.poikilocytosis}
              label='poikilocytosis'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('microcytosis')}
              value={formik.values.microcytosis}
              label='microcytosis'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('macrocytosis')}
              value={formik.values.macrocytosis}
              label='macrocytosis'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('hypochromia')}
              value={formik.values.hypochromia}
              label='hypochromia'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('sickleCell')}
              value={formik.values.sickleCell}
              label='sickleCell'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('targetCell')}
              value={formik.values.targetCell}
              label='targetCell'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('spherocytes')}
              value={formik.values.spherocytes}
              label='spherocytes'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('nucleatedRBC')}
              value={formik.values.nucleatedRBC}
              label='nucleatedRBC'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('sicklingTest')}
              value={formik.values.sicklingTest}
              label='sicklingTest'
            />
          </SimpleGrid>
        </Box>

        <Box>
          <Checkbox mt='23px' isChecked={formik.values.tests?.includes('differentialCount')} onChange={(e) => handleCheckChange(e, 'differentialCount')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Differential Count</Text>
          </Checkbox>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing='10px'>
            <FormInput
              type='text'
              onChange={formik.handleChange('polymorphs')}
              value={formik.values.polymorphs}
              label='polymorphs'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('lymphocytes')}
              value={formik.values.lymphocytes}
              label='lymphocytes'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('monocytes')}
              value={formik.values.monocytes}
              label='monocytes'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('eosinophils')}
              value={formik.values.eosinophils}
              label='eosinophils'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('basophils')}
              value={formik.values.basophils}
              label='basophils'
            />
            <Checkbox mt='23px' isChecked={formik.values.tests?.includes('widalsTest')} onChange={(e) => handleCheckChange(e, 'widalsTest')}>
              <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Widal's Test</Text>
            </Checkbox>
            <FormInput
              type='text'
              onChange={formik.handleChange('widalTest')}
              value={formik.values.widalTest}
              label='widalTest'
            />
            <FormInput
              type='text'
              onChange={formik.handleChange('widalTestNote')}
              value={formik.values.widalTestNote}
              label='widalTestNote'
            />
            <Checkbox mt='23px' isChecked={formik.values.tests?.includes('bloodGroup')} onChange={(e) => handleCheckChange(e, 'bloodGroup')}>
              <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Blood group</Text>
            </Checkbox>
            <FormInput
              type='text'
              onChange={formik.handleChange('bloodGroup')}
              value={formik.values.bloodGroup}
              label='bloodGroup'
            />
            <Checkbox mt='23px' isChecked={formik.values.tests?.includes('rhesusFactor')} onChange={(e) => handleCheckChange(e, 'rhesusFactor')}>
              <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Rhesus Factor</Text>
            </Checkbox>
            <FormInput
              type='text'
              onChange={formik.handleChange('rhesusFactor')}
              value={formik.values.rhesusFactor}
              label='rhesusFactor'
            />
            <Checkbox mt='23px' isChecked={formik.values.tests?.includes('genotype')} onChange={(e) => handleCheckChange(e, 'genotype')}>
              <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Genotype</Text>
            </Checkbox>
            <FormInput
              type='text'
              onChange={formik.handleChange('genotype')}
              value={formik.values.genotype}
              label='genotype'
            />
          </SimpleGrid>
        </Box>
      </SimpleGrid>
      <Button onClick={formik.handleSubmit} variant="outline" width="full" mt={6} type="submit">
        {formik.isSubmitting ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          'Attach'
        )}
      </Button>

    </Box>
  )
}

export default Haematology