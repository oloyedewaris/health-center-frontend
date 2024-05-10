import React, { useEffect, useState } from 'react'
import { Box, Button, Center, CircularProgress, Flex, GridItem, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FormTextarea from '../../../../components/form/FormTextarea';
import FormSelect from '../../../../components/form/FromSelect';
import continuationSheetData from '../../../../utils/continuationSheetData';
import { CloseIcon } from '@chakra-ui/icons';
import { updateCommentApi } from '../../../../api/patients';
import { useMutation } from 'react-query'

const {
  signsAndSymptomsData,
  examinationData,
  assessmentData,
  planData,
} = continuationSheetData

const CommentAndTreatmentEdit = ({ modal, patient, refetch, comment }) => {
  const toast = useToast();
  const [examTitle, setExamTitle] = useState('')
  const [examNote, setExamNote] = useState('')

  useEffect(() => {
    formik.setValues({
      signsAndSymptoms: comment?.signsAndSymptoms || '',
      examination: comment?.examination || [],
      assessment: comment?.assessment || '',
      plan: comment?.plan || '',
    })
  }, [comment])


  const updateCommentMutation = useMutation(
    (form) => updateCommentApi(form?.patientId, form?.commentid, form?.values), {
    onSuccess: async res => {
      formik.resetForm();
      modal.onClose();
      formik.setSubmitting(false)
      toast({
        title: 'Submitted successfully',
        description: "Comments and treatments added",
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
      signsAndSymptoms: '',
      examination: [],
      assessment: '',
      plan: '',
    },
    onSubmit: (values) => {
      updateCommentMutation.mutate({ patientId: patient?._id, commentid: comment?._id, values })
    }
  })

  const handleAddExam = () => {
    const examToAdd = {
      exam: examTitle,
      note: examNote
    }
    formik.setFieldValue('examination', [examToAdd, ...formik.values?.examination])
    setExamTitle('')
    setExamNote('')
  }

  const removeExam = (index) => {
    const copy = [...formik.values?.examination];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    formik.setFieldValue('examination', copy)
  };


  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Text fontSize={'20px'} fontWeight={600}>Edit Comments and Treatments</Text>
              <Flex gap='25px' my='20px'>
                <SimpleGrid w='47%' columns={{ base: 1, md: 1 }} spacing='30px'>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('signsAndSymptoms')(`${e.target.value}, ${formik.values?.signsAndSymptoms}`)}
                      value={formik.values?.signsAndSymptoms}
                      options={signsAndSymptomsData}
                      placeholder='Signs and Symptoms'
                      label='Signs and Symptoms'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('signsAndSymptoms')}
                      value={formik.values?.signsAndSymptoms}
                    />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('assessment')(`${e.target.value}, ${formik.values?.assessment}`)}
                      value={formik.values?.assessment}
                      options={assessmentData}
                      placeholder='Assessment'
                      label='Assessment'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('assessment')}
                      value={formik.values?.assessment}
                    />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('plan')(`${e.target.value}, ${formik.values?.plan}`)}
                      value={formik.values?.plan}
                      options={planData}
                      placeholder='Plan'
                      label='Plan'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('plan')}
                      value={formik.values?.plan}
                    />
                  </GridItem>
                </SimpleGrid>

                <Box w='47%'>
                  <FormSelect
                    onChange={e => setExamTitle(e.target.value)}
                    value={examTitle}
                    options={examinationData}
                    placeholder='Examination'
                    label='Examination'
                  />
                  <FormTextarea
                    type='text'
                    onChange={e => setExamNote(e.target.value)}
                    placeholder='Write about the examination here'
                    value={examNote}
                  />
                  <Button
                    variant="outline"
                    width="full" mt={2}
                    onClick={handleAddExam}
                  >Add examination</Button>

                  <Heading size='md' mt='6' textAlign={'center'}>Examinations</Heading>
                  <Flex direction={'column'} align='center' gap='10px' mt='2'>
                    {formik.values?.examination.map((exam, index) => (
                      <Box bg='#E4DFDA' w='full' py='8px' px='10px' borderRadius={'8px'} minH={'150px'}>
                        < CloseIcon
                          float={'right'}
                          color='red'
                          cursor={'pointer'}
                          onClick={() => removeExam(index)}
                          fontSize={'12px'}
                        />
                        <Text textAlign={'center'} textDecoration={'underline'} fontWeight='500'>{exam.exam}</Text>
                        <Text mt='2'>{exam.note}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Flex>
              <Button variant="outline" width="full" mt={6} type="submit">
                {formik.isSubmitting ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Box>
        </ModalBody >
      </ModalContent >
    </Modal >
  )
}

export default CommentAndTreatmentEdit