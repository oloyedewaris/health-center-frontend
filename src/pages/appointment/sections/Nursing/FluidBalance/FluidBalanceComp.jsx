import React from 'react'
import { Box, Button, Checkbox, CircularProgress, Flex, GridItem, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FormTextarea from '../../../../../components/form/FormTextarea';
import axiosInstance from '../../../../../utils/axiosInstance';
import FormSelect from '../../../../../components/form/FromSelect';
import SelectSearch from 'react-select';
import drugsList from '../../../../../utils/drugsList';
import FormInput from '../../../../../components/form/FormInput';
import { addFluidBalanceApi } from '../../../../../api/patients';
import { useMutation } from 'react-query'


const FluidBalanceComp = ({ setNewRow, patient, refetch }) => {
  const toast = useToast();

  const addFluidBalanceMutation = useMutation(
    (form) => addFluidBalanceApi(form?.patientId, form?.values), {
    onSuccess: async res => {
      formik.resetForm();
      setNewRow(false)
      formik.setSubmitting(false)
      toast({
        title: 'Submitted successfully',
        description: "Record added",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await refetch()
    },
    onError: err => {
      toast({
        title: 'Submission error',
        description: "An error occurred while submitting, try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      typeOfFluid: '',
      intraVenous: '',
      oral: '',
      othersIntake: '',
      urine: '',
      gastricAspirate: '',
      vomit: '',
      bile: '',
      blood: '',
      stool: '',
      othersOutput: '',
    },
    onSubmit: (values) => {
      addFluidBalanceMutation.mutate({ patientId: patient?._id, values })
    }
  })


  return (
    <Box w='full'>
      <Flex align='center' mt='40px' w='1500px' overflowY={'scroll'} gap='40px' h='full'>
        <Box w='40%' fontWeight={500}>
          {/* <Text fontWeight={500} textAlign={'center'}>Fluid balance (Intake)</Text> */}
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <FormInput
                      type='text'
                      onChange={formik.handleChange('typeOfFluid')}
                      value={formik.values.typeOfFluid}
                      label='Type of fluid'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('intraVenous')}
                      value={formik.values.intraVenous}
                      label='Intra Venous'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('oral')}
                      value={formik.values.oral}
                      label='Oral'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('othersIntake')}
                      value={formik.values.othersIntake}
                      label='Others'
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box h='full' borderRight={'1px solid #191919'} />
        <Box w='60%' fontWeight={500}>
          {/* <Text fontWeight={500} textAlign={'center'}>Fluid balance (Intake)</Text> */}
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('gastricAspirate')}
                      value={formik.values.gastricAspirate}
                      label='Gastric Aspirate'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('urine')}
                      value={formik.values.urine}
                      label='Urine'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('vomit')}
                      value={formik.values.vomit}
                      label='Vomit'
                    />

                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('bile')}
                      value={formik.values.bile}
                      label='Bile'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('blood')}
                      value={formik.values.blood}
                      label='Blood'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('stool')}
                      value={formik.values.stool}
                      label='Stool'
                    />
                  </Td>
                  <Td>
                    <FormInput
                      type='number'
                      onChange={formik.handleChange('othersOutput')}
                      value={formik.values.othersOutput}
                      label='Others'
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
      <Button
        onClick={formik.handleSubmit}
        variant="outline" width="full"
        mt={6} type="submit"
      >
        {formik.isSubmitting ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          'Submit'
        )}
      </Button>
    </Box>
  )
}

export default FluidBalanceComp