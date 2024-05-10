import React, { useContext } from 'react'
import { Box, Button, Checkbox, CircularProgress, FormControl, FormLabel, HStack, Radio, RadioGroup, SimpleGrid, Text, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import FormInput from '../../components/form/FormInput';
import { FaArrowLeft } from 'react-icons/fa';
import { GlobalContext } from '../../context/Provider';
import FormTextarea from '../../components/form/FormTextarea';

const Payment = ({ form, goBack, onSubmitAttachment, bioData }) => {
  const { authState } = useContext(GlobalContext)
  console.log('bioData', bioData)
  const formik = useFormik({
    initialValues: (form ? { ...form } : {
      customer: `${bioData?.surname || ''} ${bioData?.otherNames || ''}`,
      attendingOfficer: `${authState.user?.firstName} ${authState.user?.lastName}`,
      phone: bioData?.telephone || '',
      amount: '',
      date: new Date().toLocaleDateString(),
      paid: false,
      discountRate: '0',
      discountedAmount: '',
      receiptNo: '',
      amountReceived: '',
      amountToPay: ''
    }),
    onSubmit: (values) => {
      if (values.paid)
        alert('This slip will be submitted as paid!!!')
      const dataToSubmit = {


        attachmentType: 'payment',
        attachment: values
      }
      onSubmitAttachment(dataToSubmit)
    }
  })

  const handleAmountChange = (e) => {
    const originalAmount = Number(e.target.value)
    const discountedAmount = (formik.values.discountRate * originalAmount / 100)
    const amountToPay = originalAmount - discountedAmount
    formik.setValues({ ...formik.values, discountedAmount, amountToPay, amount: e.target.value })
  }

  const handleRateChange = (discountRate) => {
    const originalAmount = formik.values.amount ? Number(formik.values.amount) : 0
    const discountedAmount = (Number(discountRate) * originalAmount / 100)
    const amountToPay = originalAmount - discountedAmount
    formik.setValues({ ...formik.values, discountedAmount, amountToPay, discountRate })
  }

  return (
    <Box p='14px' w='full'>
      <FaArrowLeft onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }} />
      <form onSubmit={formik.handleSubmit}>
        <Text textAlign={'center'} fontSize={'25px'} fontWeight={700}>Payment form</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing='14px' my='20px'>
          <FormInput
            type='text'
            onChange={formik.handleChange('customer')}
            value={formik.values.customer}
            placeholder='Customer'
            label='Customer'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('phone')}
            value={formik.values.phone}
            placeholder="Customer's phone"
            label="Customer's phone"
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('attendingOfficer')}
            value={formik.values.attendingOfficer}
            placeholder='Attending Officer'
            label='Attending Officer'
          />
          <FormInput
            type='text'
            onChange={formik.handleChange('date')}
            value={formik.values.date}
            placeholder='Date'
            label='Date'
          />
          <FormControl display='flex' mt={4} alignItems='flex-end' mb='2'>
            <FormLabel mb='0'>Discount Rate</FormLabel>
            <HStack>
              <RadioGroup
                onChange={handleRateChange}
                name='discount'
                defaultValue={'0'}
              >
                <HStack spacing={'20px'}>
                  <Radio value={'0'} name='0'>0%</Radio>
                  <Radio value={'10'} name='10'>10%</Radio>
                  <Radio value={'50'} name='50'>50%</Radio>
                  <Radio value={'90'} name='90'>90%</Radio>
                  <Radio value={'100'} name='100'>TSHIP(100%)</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </FormControl>
          <FormControl display='flex' mt={4} alignItems='flex-end' mb='2'>
            <FormLabel mb='0'>Discounted amount</FormLabel>
            <Text>N{Number(formik.values.discountedAmount)}</Text>
          </FormControl>
          <FormInput
            type='number'
            onChange={handleAmountChange}
            value={formik.values.amount}
            placeholder='Total amount'
            label='Total amount'
          />

          <FormInput
            type='number'
            onChange={formik.handleChange('amountToPay')}
            value={formik.values.amountToPay}
            // placeholder='Amount to pay'
            label='Amount to pay (N)'
          />
          <FormTextarea
            type='text'
            onChange={formik.handleChange('description')}
            value={formik.values.description}
            placeholder='Description'
            label='Description'
          />
        </SimpleGrid>
        <Text mt='8' fontSize={'20px'} textDecoration={'underline'} fontWeight={500}>Cash point section</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing='14px'>
          <Checkbox mt='23px' isChecked={formik.values.paid} onChange={formik.handleChange('paid')} >
            <Text display={'inline'} fontSize={'22px'} mt='10px' fontWeight={600}>Paid</Text>
          </Checkbox>

          <FormInput
            type='number'
            onChange={formik.handleChange('amountReceived')}
            value={formik.values.amountReceived}
            placeholder='Amount received'
            label='Amount received'
          />

          <FormInput
            type='number'
            onChange={formik.handleChange('receiptNo')}
            value={formik.values.receiptNo}
            placeholder='Receipt No.'
            label='Receipt No.'
          />

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

export default Payment