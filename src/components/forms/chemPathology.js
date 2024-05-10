import React, { useContext } from 'react'
import { Box, Button, Checkbox, CircularProgress, GridItem, SimpleGrid, Text, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';
import { GlobalContext } from '../../context/Provider';

const ChemPathology = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      tests: [],
      doctor: `${authState.user?.firstName} ${authState.user?.lastName}`,
      date: new Date().toLocaleDateString(),
    }),
    onSubmit: (values) => {
      const dataToSubmit = {
        attachmentType: 'chemPathology',
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
      <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Chemical Pathology Form</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='10px'>
        <FormInput
          label='Chemical diagnosis'
          type='text'
          onChange={formik.handleChange('ChemicalDiagnosis')}
          value={formik.values.ChemicalDiagnosis}
          placeholder='Chemical diagnosis'
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
          onChange={formik.handleChange('LabRef')}
          value={formik.values.LabRef}
          placeholder='Lab Ref'
        />
        <FormInput
          label='Lab comment'
          type='text'
          onChange={formik.handleChange('LabComment')}
          value={formik.values.Lab}
          placeholder='Lab comment'
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing='49px'>
        <Box>
          <>
            <Text fontSize={'22px'} mt='20px' fontWeight={600}>Electrolytes</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='10px'>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('Na')} onChange={(e) => handleCheckChange(e, 'Na')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Na (120 - 140)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('Na')}
                  value={formik.values.Na}
                  placeholder='Na'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('K')} onChange={(e) => handleCheckChange(e, 'K')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>K (3 - 5)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('K')}
                  value={formik.values.K}
                  placeholder='K'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('CI')} onChange={(e) => handleCheckChange(e, 'CI')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>CI (95 - 110)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('CI')}
                  value={formik.values.CI}
                  placeholder='CI'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('HcO3')} onChange={(e) => handleCheckChange(e, 'HcO3')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>HcO3 (20 - 30)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('HcO3')}
                  value={formik.values.HcO3}
                  placeholder='HcO3'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('Creatinnie')} onChange={(e) => handleCheckChange(e, 'Creatinnie')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Creatinnie (50 - 132)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('Creatinnie')}
                  value={formik.values.Creatinnie}
                  placeholder='Creatinnie'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('urea')} onChange={(e) => handleCheckChange(e, 'urea')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Urea (2.5 - 5.8)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('urea')}
                  value={formik.values.urea}
                  placeholder='urea'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('uricAcid')} onChange={(e) => handleCheckChange(e, 'uricAcid')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Uric Acid (0.12 - 0.36)</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('uricAcid')}
                  value={formik.values.uricAcid}
                  placeholder='uricAcid'
                />
              </GridItem>
            </SimpleGrid>
          </>
          <>
            <Text fontSize={'22px'} mt='20px' fontWeight={600}>Proteins</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='10px'>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('totalProteins')} onChange={(e) => handleCheckChange(e, 'totalProteins')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Total Proteins </Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('totalProteins')}
                  value={formik.values.totalProteins}
                  placeholder='totalProteins'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('albumin')} onChange={(e) => handleCheckChange(e, 'albumin')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Albumin</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('albumin')}
                  value={formik.values.albumin}
                  placeholder='albumin'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('globulin')} onChange={(e) => handleCheckChange(e, 'globulin')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Globulin</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('globulin')}
                  value={formik.values.globulin}
                  placeholder='globulin'
                />
              </GridItem>
              <GridItem>
                <Checkbox mt='23px' isChecked={formik.values.tests?.includes('others')} onChange={(e) => handleCheckChange(e, 'others')}>
                  <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Others</Text>
                </Checkbox>
                <FormInput
                  type='text'
                  onChange={formik.handleChange('others')}
                  value={formik.values.others}
                  placeholder='others'
                />
              </GridItem>
            </SimpleGrid>
          </>
        </Box>
        <Box>
          <Text fontSize={'22px'} mt='20px' fontWeight={600}>Fasting Lipids</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing='10px'>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('totalChol')} onChange={(e) => handleCheckChange(e, 'totalChol')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Total Chol (2.5 - 5.17)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('totalChol')}
                value={formik.values.totalChol}
                placeholder='totalChol'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('TG')} onChange={(e) => handleCheckChange(e, 'TG')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>{`TG < 2.3`}</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('TG')}
                value={formik.values.TG}
                placeholder='TG'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('HDL')} onChange={(e) => handleCheckChange(e, 'HDL')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>{`HDL < 1.0.4`}</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('HDL')}
                value={formik.values.HDL}
                placeholder='HDL'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('LDL')} onChange={(e) => handleCheckChange(e, 'LDL')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>{`LDL < 2.3`}</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('LDL')}
                value={formik.values.LDL}
                placeholder='LDL'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('hypochromia')} onChange={(e) => handleCheckChange(e, 'hypochromia')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Hypochromia</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('hypochromia')}
                value={formik.values.hypochromia}
                placeholder='hypochromia'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('glucoseFasting')} onChange={(e) => handleCheckChange(e, 'glucoseFasting')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Glucose (Fasting)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('glucoseFasting')}
                value={formik.values.glucoseFasting}
                placeholder='glucoseFasting'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('glucose2HPP')} onChange={(e) => handleCheckChange(e, 'glucose2HPP')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Glucose (2HPP)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('glucose2HPP')}
                value={formik.values.glucose2HPP}
                placeholder='glucose2HPP'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('LFT')} onChange={(e) => handleCheckChange(e, 'LFT')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>LFT:</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('LFT')}
                value={formik.values.LFT}
                placeholder='LFT'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('bilirubinTotal')} onChange={(e) => handleCheckChange(e, 'bilirubinTotal')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Bilirubin (Total)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('bilirubinTotal')}
                value={formik.values.bilirubinTotal}
                placeholder='bilirubinTotal'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('bilirubinConj')} onChange={(e) => handleCheckChange(e, 'bilirubinConj')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Bilirubin (Conj)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('bilirubinConj')}
                value={formik.values.bilirubinConj}
                placeholder='bilirubinConj'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('ALKPhos')} onChange={(e) => handleCheckChange(e, 'ALKPhos')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>ALK (Phos)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('ALKPhos')}
                value={formik.values.ALKPhos}
                placeholder='ALKPhos'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('acidPhos')} onChange={(e) => handleCheckChange(e, 'acidPhos')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>Acid (Phos)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('acidPhos')}
                value={formik.values.acidPhos}
                placeholder='acidPhos'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('ALTSPGT')} onChange={(e) => handleCheckChange(e, 'ALTSPGT')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>ALT (SPGT)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('ALTSPGT')}
                value={formik.values.ALTSPGT}
                placeholder='ALTSPGT'
              />
            </GridItem>
            <GridItem>
              <Checkbox mt='23px' isChecked={formik.values.tests?.includes('ASLWGOT')} onChange={(e) => handleCheckChange(e, 'ASLWGOT')}>
                <Text display={'inline'} fontSize={'18px'} mt='10px' fontWeight={500}>ASL (WGOT)</Text>
              </Checkbox>
              <FormInput
                type='text'
                onChange={formik.handleChange('ASLWGOT')}
                value={formik.values.ASLWGOT}
                placeholder='ASLWGOT'
              />
            </GridItem>
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

export default ChemPathology
