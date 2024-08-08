import React, { useState } from 'react'
import { Box, Button, Center, CircularProgress, Flex, GridItem, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FromDatePicker from '../../../../components/form/FromDatePicker';
import FormTextarea from '../../../../components/form/FormTextarea';
import FormInput from '../../../../components/form/FormInput';
import FormSelect from '../../../../components/form/FromSelect';
import PreviewImage from '../../../../components/PreviewImage';
import continuationSheetData from '../../../../utils/continuationSheetData';
import { CloseIcon } from '@chakra-ui/icons';
import { addCommentApi } from '../../../../api/patients';
import { useMutation } from 'react-query'

const {
  signsAndSymptomsData,
  examinationData,
  assessmentData,
  planData,
} = continuationSheetData

const CommentAndTreatment = ({ commentModal, patient, refetch }) => {
  const toast = useToast();
  const [examTitle, setExamTitle] = useState('')
  const [examNote, setExamNote] = useState('')
  const [exams, setExams] = useState([]);
  const [date, setDate] = useState(new Date())
  // const [images, setImages] = useState([]);


  const addCommentMutation = useMutation(
    (form) => addCommentApi(form?.patientId, form?.dataToSubmit),
    {
      onSuccess: async res => {
        formik.resetForm();
        formik.setSubmitting(false)
        formik.resetForm();
        setExams([])
        commentModal.onClose();
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
        images: [], // Update to store multiple images
      },
      onSubmit: (values) => {
        const dataToSubmit = { ...values, examination: exams, dateOfRecord: date };
        addCommentMutation.mutate({ patientId: patient?._id, dataToSubmit });
      },
    });

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      formik.setFieldValue('images', [...formik.values.images, ...files]);
    };

  const handleAddExam = () => {
    const examToAdd = {
      exam: examTitle,
      note: examNote
    }
    setExams([examToAdd, ...exams])
    setExamTitle('')
    setExamNote('')
  }

  const removeExam = (index) => {
    const copy = [...exams];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setExams(copy);
  };


  return (
    <Modal isCentered isOpen={commentModal?.isOpen} onClose={commentModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='800px' w='full'>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box p='14px' w='full'>
            <form onSubmit={formik.handleSubmit}>
              <Text fontSize={'20px'} fontWeight={600}>Comments and Treatments</Text>
              <Flex gap='25px' my='20px'>
                <SimpleGrid w='47%' columns={{ base: 1, md: 1 }} spacing='30px'>
                  <GridItem>
                  <FromDatePicker
              label='Date of Record'
              id='dateOfRecord'
              onChange={e => setDate(e)}
              value={date}
            />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('signsAndSymptoms')(`${e.target.value}, ${formik.values.signsAndSymptoms}`)}
                      value={formik.values.signsAndSymptoms}
                      options={signsAndSymptomsData}
                      placeholder='Signs and Symptoms'
                      label='Signs and Symptoms'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('signsAndSymptoms')}
                      value={formik.values.signsAndSymptoms}
                    />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('assessment')(`${e.target.value}, ${formik.values.assessment}`)}
                      value={formik.values.assessment}
                      options={assessmentData}
                      placeholder='Assessment'
                      label='Assessment'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('assessment')}
                      value={formik.values.assessment}
                    />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      onChange={e => formik.handleChange('plan')(`${e.target.value}, ${formik.values.plan}`)}
                      value={formik.values.plan}
                      options={planData}
                      placeholder='Plan'
                      label='Plan'
                    />
                    <FormTextarea
                      type='text'
                      onChange={formik.handleChange('plan')}
                      value={formik.values.plan}
                    />
                  </GridItem>
                </SimpleGrid>

                <Box w='47%'>
                <FormInput
  type='file'
  onChange={handleFileChange}
  label='Images'
  placeholder='Images'
  id="images"
  multiple // Allow multiple file selection
/>
{formik.values.images.length > 0 && formik.values.images.map((image, index) => (
  <Box key={index} bg='#E4DFDA' w='full' my='8px' py='8px' px='10px' borderRadius={'8px'} minH={'150px'}>
    <PreviewImage file={image} />
  </Box>
))}

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
                    {exams.map((exam, index) => (
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

export default CommentAndTreatment