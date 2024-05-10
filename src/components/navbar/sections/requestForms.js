import React, { useContext, useState } from 'react'
import { Flex, DrawerCloseButton, Text, useToast, useDisclosure, Center, SimpleGrid, GridItem, VStack, StackDivider } from '@chakra-ui/react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Attachment from '../../../components/forms';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import attachmentKeys from '../../../utils/attachmentKeys';
import { RiSendPlaneLine } from 'react-icons/ri';
import Forward from '../../../components/forms/Forward';
import { useMutation, useQuery } from 'react-query';
import { GlobalContext } from '../../../context/Provider';
import { Button } from '../../../components/Buttons';
import FormInput from '../../../components/form/FormInput';
import { createFormApi, deleteRequestApi, forwardRequestApi, getFormsApi, submitAttachmentApi } from '../../../api/request';
import { getPatientsApi } from '../../../api/patients';


const RequestFormDrawer = ({ requestFormDrawer }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { authState } = useContext(GlobalContext);
  const forwardModal = useDisclosure();
  const attachmentModal = useDisclosure();
  const attachmentCreateModal = useDisclosure();
  const [attachmentToEdit, setAttachmentToEdit] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [stepPage, setStepPage] = useState('forms');
  const [searchText, setSearchText] = useState('')

  const getFormsQuery = useQuery(
    ['getScheduleData', authState.user?._id],
    getFormsApi,
    {
      enabled: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      // retry: true,
      // retryDelay: 1000,
      // retryOnMount: true,
    }
  )

  const requestFormsData = getFormsQuery?.data?.data?.requestForms;
  const patientsQuery = useQuery(['getPatientsApi', searchText], () => getPatientsApi(searchText));
  const patients = patientsQuery?.data?.data;

  const submitAttachmentMutation = useMutation(submitAttachmentApi, {
    onSuccess: res => {
      attachmentModal?.onClose();
      getFormsQuery.refetch()
      toast({
        title: 'Form updated',
        description: "Your request form has been updated",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'request error',
        description: err?.response?.data?.msg || "An error occurred while updating form",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const forwardRequestMutation = useMutation(forwardRequestApi, {
    onSuccess: res => {
      forwardModal.onClose();
      getFormsQuery.refetch();
      requestFormDrawer.onClose()
      toast({
        title: 'Form sent',
        description: "The request form has been sent",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Forwarded error',
        description: "Patient forward was not successfully try again",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const deleteRequestMutation = useMutation(deleteRequestApi, {
    onSuccess: res => {
      getFormsQuery.refetch()
      toast({
        title: 'Form deleted',
        description: 'Request form successfully deleted',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Appointment error',
        description: err?.response?.data?.msg || "An error occurred while getting appointments",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const createFormMutation = useMutation(createFormApi, {
    onSuccess: async res => {
      attachmentModal?.onClose();
      attachmentCreateModal.onClose();
      setStepPage('forms');
      await getFormsQuery.refetch();
      toast({
        title: 'Form created',
        description: "Your request form has been created",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Form error',
        description: err?.response?.data?.msg || "An error occurred while creating form",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })


  const handlePatientClick = (patient) => {
    attachmentCreateModal.onOpen();
    setPatientDetails(patient)
  }

  const onSubmitAttachment = (data) => {
    const dataToSubmit = {
      ...data,
      requestFormId: attachmentToEdit._id,
    }
    submitAttachmentMutation.mutate(dataToSubmit)
  }

  const onForward = (workerId) => {
    const formData = {
      nextWorker: workerId,
      requestFormId: attachmentToEdit._id
    }
    forwardRequestMutation.mutate(formData)
  }

  const deleteForm = (attachment) => {
    deleteRequestMutation.mutate(attachment?._id)
  }

  const editForm = (attachment) => {
    setAttachmentToEdit(attachment);
    setPatientDetails(attachment?.patient?.bioData);
    attachmentModal.onOpen()
  }


  const sendForm = (attachment) => {
    setAttachmentToEdit(attachment)
    forwardModal.onOpen()
  }


  const createNewRequestForm = (data) => {
    const dataToSubmit = {
      ...data,
      patientId: patientDetails?._id
    }
    createFormMutation.mutate(dataToSubmit)
  }

  return (
    <>
      <Drawer isCentered={false} scrollBehavior='inside' isOpen={requestFormDrawer.isOpen} onClose={requestFormDrawer.onClose}>
        <DrawerOverlay />
        <DrawerContent maxW='600px'>
          <DrawerCloseButton onClose={requestFormDrawer.onClose} />
          <DrawerHeader my='21px' pb='12px' borderBottom='1px solid #D3D3D3' fontSize={28} fontWeight={500} px='0'>
            <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
              <Heading fontSize={'18px'} fontWeight={600} as='h1'>
                Request forms
              </Heading>
            </Flex>
          </DrawerHeader>
          {stepPage === 'list' ? (
            <DrawerBody p='0'>
              <Box px='40px' mb='20px'>
                <Heading size='sm'>Select a patient to assign form to</Heading>
                <FormInput
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder={'Search patient...'}
                />
              </Box>

              <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} stretch mt='15px'>
                {patients?.map(patient => (
                  <Box key={patient._id} px='20px' w='full' cursor={'pointer'} onClick={() => handlePatientClick(patient)}>
                    <Flex align='center' justify='space-between' w='full'>
                      <Text fontSize='16px' fontWeight={600} as='h2' textTransform={'capitalize'}>
                        {patient?.bioData?.surname}  {patient?.bioData?.otherNames}
                      </Text>
                      <Text fontSize={'12px'} ml='8px' lineHeight='16px'>
                        {patient?.bioData?.matricNo}
                      </Text>
                    </Flex>
                    <Flex justify='space-between'>
                      <Text fontSize={'14px'} fontWeight={400}>
                        {patient?.bioData?.email}
                      </Text>
                      <Text fontSize={'12px'} fontWeight={400}>
                        {patient?.bioData?.NHISNo}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </DrawerBody>
          ) : (
            <DrawerBody px='20px'>
              <Button onClick={() => setStepPage('list')}>
                Create a new form
              </Button>
              {(requestFormsData || [])?.map(attachment => (
                <Box key={attachment?._id} px={4} py={4} w='full' fontWeight={500} shadow={'md'} borderRadius={'12px'}>
                  <Text fontSize={'17px'} textAlign={'center'} textTransform={'capitalize'}>
                    <Text as='span' textDecoration={'underline'} fontWeight={700} fontSize={'20px'}>{attachment?.type} form</Text>
                    {attachment?.precedingHolder && (
                      <Text my='10px' as='p'>Sent from {` ${attachment?.precedingHolder?.firstName} ${attachment?.precedingHolder?.lastName} (${attachment?.precedingHolder?.unit})`}</Text>
                    )}
                  </Text>

                  <Text>
                    Patient's Name: {attachment?.patient?.bioData?.surname} {attachment?.patient?.bioData?.otherNames}
                    <Text onClick={() => navigate(`/patient/${attachment?.patient?._id}`)} color='green' cursor='pointer'>View patient</Text>
                  </Text>
                  <Center float='right' gap='4'>
                    <DeleteIcon
                      cursor={'pointer'} color='#ff1212'
                      fontSize='20px'
                      onClick={() => deleteForm(attachment)}
                    />
                    <EditIcon
                      cursor={'pointer'} color='#000099'
                      fontSize={'20px'}
                      onClick={() => editForm(attachment)}
                    />
                    <RiSendPlaneLine
                      cursor={'pointer'} color='#009900'
                      size={'25'}
                      onClick={() => sendForm(attachment)}
                    />
                  </Center>
                  <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={'12px'} rowGap='4px' w='full'>
                    {Object.keys(attachment?.form || {})?.map((key, i) => {
                      if (key.isArray && key.isArray()) {
                        return (
                          <GridItem colSpan={2} key={i}>
                            <Text display={'inline'}>
                              <Text fontWeight={700} as='span'>{attachmentKeys[key] || key}: </Text>
                              {Object.values(attachment?.form)[i].map(test => (
                                <Text key={test} as='span' fontSize={'18px'}>{attachmentKeys[test] || test} {', '} </Text>
                              ))}
                            </Text>
                          </GridItem>
                        )
                      } else {
                        return (
                          <Text display={'inline'} key={i}>
                            <Text fontWeight={700} as='span'>{attachmentKeys[key] || key}: </Text>
                            <Text as='span'>{Object.values(attachment?.form)[i]?.toString()}</Text>
                          </Text>
                        )
                      }
                    })}
                  </SimpleGrid>
                </Box>
              ))}
              {(requestFormsData || []).length <= 0 && <Text mt='4' textAlign='center' mx='auto'>No request form yet</Text>}
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
      <Forward heading={'Send form to'} onForward={onForward} forwardModal={forwardModal} />
      <Attachment
        bioData={patientDetails?.bioData}
        onSubmitAttachment={onSubmitAttachment}
        setAttachmentToEdit={setAttachmentToEdit}
        attachmentToEdit={attachmentToEdit}
        attachmentModal={attachmentModal}
      />
      <Attachment
        bioData={patientDetails?.bioData}
        onSubmitAttachment={createNewRequestForm}
        attachmentModal={attachmentCreateModal}
      />
    </>
  )
}

export default RequestFormDrawer