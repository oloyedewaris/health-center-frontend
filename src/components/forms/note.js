import React from 'react'
import { Box, Button, CircularProgress, Text } from '@chakra-ui/react'
import { useFormik } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import FormTextarea from '../../components/form/FormTextarea';
import FormInput from '../../components/form/FormInput';

const Note = ({ form, goBack, onSubmitAttachment, bioData }) => {

  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      topic: '',
      text: '',
    }),
    onSubmit: (values) => {
      const dataToSubmit = {


        attachmentType: 'note',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  return (
    <Box p='14px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Short note</Text>
        <FormInput
          type='text'
          onChange={formik.handleChange('topic')}
          value={formik.values.topic}
          placeholder='Topic'
        />
        <FormTextarea
          type='text'
          onChange={formik.handleChange('text')}
          value={formik.values.text}
          placeholder='Write a note'
        />
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

export default Note