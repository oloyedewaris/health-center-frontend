import React from 'react'
import { Box, Button, Checkbox, CircularProgress, HStack, SimpleGrid, Text, } from '@chakra-ui/react'
import FormInput from '../../components/form/FormInput';
import { useFormik } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';

const Parasitology = ({ form, goBack, onSubmitAttachment, bioData }) => {

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      tests: [],
      ovaOf: [],
      trophozoites: [],
      larvaeOf: [],
      cells: [],
      occultBlood: [],
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'parasitology',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  const handleOvaOfCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('ovaOf', [...formik.values.ovaOf, key])
    } else {
      const testsCopy = [...formik.values.ovaOf].filter(test => test !== key)
      formik.setFieldValue('ovaOf', testsCopy)
    }
  }

  const handleTrophozoitesCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('trophozoites', [...formik.values.trophozoites, key])
    } else {
      const testsCopy = [...formik.values.trophozoites].filter(test => test !== key)
      formik.setFieldValue('trophozoites', testsCopy)
    }
  }

  const handleLarvaeOfCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('larvaeOf', [...formik.values.larvaeOf, key])
    } else {
      const testsCopy = [...formik.values.larvaeOf].filter(test => test !== key)
      formik.setFieldValue('larvaeOf', testsCopy)
    }
  }

  const handleCellsCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('cells', [...formik.values.cells, key])
    } else {
      const testsCopy = [...formik.values.cells].filter(test => test !== key)
      formik.setFieldValue('cells', testsCopy)
    }
  }

  const handleOccultBloodCheckChange = (e, key) => {
    if (e.target.checked) {
      formik.setFieldValue('occultBlood', [...formik.values.occultBlood, key])
    } else {
      const testsCopy = [...formik.values.occultBlood].filter(test => test !== key)
      formik.setFieldValue('occultBlood', testsCopy)
    }
  }

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
      <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Parasitology Form</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} my='20px' spacing='19px'>
        <FormInput
          label='Nature of specimen'
          type='text'
          onChange={formik.handleChange('natureOfSpecimen')}
          value={formik.values.natureOfSpecimen}
          placeholder='Nature of specimen'
        />
        <FormInput
          label='Investigation required'
          type='text'
          onChange={formik.handleChange('investigationRequired')}
          value={formik.values.investigationRequired}
          placeholder='Investigation required'
        />
        <FormInput
          label='Date of collection'
          type='text'
          onChange={formik.handleChange('dateOfCollection')}
          value={formik.values.dateOfCollection}
          placeholder='Date of collection'
        />
        <FormInput
          label='Date reported'
          type='text'
          onChange={formik.handleChange('dateReported')}
          value={formik.values.dateReported}
          placeholder='Date reported'
        />
        <FormInput
          label='Diagnosis'
          type='text'
          onChange={formik.handleChange('diagnosis')}
          value={formik.values.diagnosis}
          placeholder='Diagnosis'
        />
        <FormInput
          label='Lab number'
          type='text'
          onChange={formik.handleChange('labNumber')}
          value={formik.values.labNumber}
          placeholder='Lab number'
        />
      </SimpleGrid>

      <Text fontSize={'22px'} mt='30px' fontWeight={600}>Lab Report</Text>
      <SimpleGrid columns={{ base: 1, md: 5 }} rowGap='29px' columnGap='70px' mt='10px'>
        <Box>
          <Checkbox mt='13px' isChecked={formik.values.tests?.includes('ovaOf')} onChange={(e) => handleCheckChange(e, 'ovaOf')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Ova of</Text>
          </Checkbox>
          <HStack mt='2' justify={'space-between'}>
            <Text>Hook worm</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'Hook worm')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>A.lumbriocoides</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'A.lumbriocoides')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>T.Trichuris</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'T.Trichuris')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>E.vemicularis</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'E.vemicularis')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>S.haematobium</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'S.haematobium')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>No cysts. ova</Text>
            <Checkbox onChange={e => handleOvaOfCheckChange(e, 'No cysts. ova')} />
          </HStack>
        </Box>

        <Box>
          <Checkbox mt='13px' isChecked={formik.values.tests?.includes('trophozoites')} onChange={(e) => handleCheckChange(e, 'trophozoites')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Trophozoites</Text>
          </Checkbox>
          <HStack mt='2' justify={'space-between'}>
            <Text>E.coli</Text>
            <Checkbox onChange={e => handleTrophozoitesCheckChange(e, 'E.coli')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>E.hysto</Text>
            <Checkbox onChange={e => handleTrophozoitesCheckChange(e, 'E.hysto')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>G. lamblia</Text>
            <Checkbox onChange={e => handleTrophozoitesCheckChange(e, 'G. lamblia')} />
          </HStack>
        </Box>

        <Box>
          <Checkbox mt='13px' isChecked={formik.values.tests?.includes('larvaeOf')} onChange={(e) => handleCheckChange(e, 'larvaeOf')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Larvae Of</Text>
          </Checkbox>
          <HStack mt='2' justify={'space-between'}>
            <Text>Hook worm</Text>
            <Checkbox onChange={e => handleLarvaeOfCheckChange(e, 'Hook worm')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>S. stercoralis</Text>
            <Checkbox onChange={e => handleLarvaeOfCheckChange(e, 'S. stercoralis')} />
          </HStack>
        </Box>

        <Box>
          <Checkbox mt='13px' isChecked={formik.values.tests?.includes('cells')} onChange={(e) => handleCheckChange(e, 'cells')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Cells</Text>
          </Checkbox>
          <HStack mt='2' justify={'space-between'}>
            <Text>RBCs</Text>
            <Checkbox onChange={e => handleCellsCheckChange(e, 'RBCs')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>WBCs</Text>
            <Checkbox onChange={e => handleCellsCheckChange(e, 'WBCs')} />
          </HStack>
        </Box>

        <Box>
          <Checkbox mt='13px' isChecked={formik.values.tests?.includes('occultBlood')} onChange={(e) => handleCheckChange(e, 'occultBlood')}>
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Occult Blood</Text>
          </Checkbox>
          <HStack mt='2' justify={'space-between'}>
            <Text>Positive</Text>
            <Checkbox onChange={e => handleOccultBloodCheckChange(e, 'Positive')} />
          </HStack>
          <HStack mt='2' justify={'space-between'}>
            <Text>Negative</Text>
            <Checkbox onChange={e => handleOccultBloodCheckChange(e, 'Negative')} />
          </HStack>
        </Box>
      </SimpleGrid>

      <Button onClick={formik.handleSubmit} variant="outline" width="full" mt={6} type="submit">
        {formik.isSubmitting ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          'Attach'
        )}
      </Button>

    </Box >
  )
}

export default Parasitology