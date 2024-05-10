import React, { useContext, useState } from 'react'
import { Box, Center, Flex, GridItem, Heading, Image, SimpleGrid, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import Card from '../../../components/card';
import { BiPlus } from 'react-icons/bi';
import Attachment from '../../../components/forms';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import { GlobalContext } from '../../../context/Provider';
import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import attachmentKeys from '../../../utils/attachmentKeys';
import avatar from '../../../assets/images/avatar.png'
import { addAttachmentApi, getAppointmentsTimelineApi, removeAttachmentApi } from '../../../api/appointments';
import { useMutation, useQuery } from 'react-query';

const Timeline = ({ appointment, refetch }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [attachmentToEdit, setAttachmentToEdit] = useState(null)
  const { authState } = useContext(GlobalContext)
  const attachmentModal = useDisclosure();

  const timelineQuery = useQuery(['getAppointmentsTimelineApi', appointment?._id], () => getAppointmentsTimelineApi(appointment?._id));
  const timeline = timelineQuery?.data?.data?.timeline;
  const [timelineToAttach, setTimelineToAttach] = useState(null);


  const addAttachmentMutation = useMutation(addAttachmentApi, {
    onSuccess: async res => {
      attachmentModal?.onClose()
      await refetch();
      await timelineQuery.refetch();
      setTimelineToAttach(null)
      toast({
        title: 'Form attached',
        description: "Your attachment form is uploaded",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Attachent error',
        description: err?.response?.data?.msg || "An error occurred while attaching form",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const removeAttachmentMutation = useMutation(removeAttachmentApi, {
    onSuccess: async res => {
      await refetch();
      await timelineQuery.refetch();
      toast({
        title: 'Form removed',
        description: "Attachment form is removed",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'Attachent error',
        description: err?.response?.data?.msg || "An error occurred while removing form",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const onSubmitAttachment = (data) => {
    const dataToSubmit = {
      ...data,
      appointmentId: appointment._id,
      timelineId: timelineToAttach._id,
    }
    addAttachmentMutation.mutate(dataToSubmit);
  }

  const removeAttachment = (attachmentId, timelineId) => {
    const dataToSubmit = {
      timelineId,
      attachmentId,
      appointmentId: appointment._id,
    }
    removeAttachmentMutation.mutate(dataToSubmit);
  }

  const handleCopyForm = (attachment, timeline) => {
    setAttachmentToEdit(attachment)
    setTimelineToAttach(timeline)
    attachmentModal.onOpen()
  }

  const handleOpenAttachment = (timeline) => {
    setTimelineToAttach(timeline)
    attachmentModal.onOpen()
  }

  return (
    <Box padding='24px' w='full'>
      {timeline?.map(currentTimeline => {
        const worker = currentTimeline.attendingWorker;
        return (
          <Flex key={currentTimeline._id} px='20px' w='full' py='10px' justify={'space-between'} align='flex-start' gap={'50px'}>
            <Box w='70%'>
              <Heading size='md'> Attending officer </Heading>

              <Flex
                w='full' maxWidth={"463px"} cursor={"pointer"}
                borderRadius='xl' bgSize={"cover"} mt={6}
                outline={"0.5px solid gray"} px={"20px"} py={"30px"}
                justifyContent={'space-between'}
                alignItems={'center'} flexDirection={'row'}
                onClick={() => navigate(`/worker/${worker._id}`)}
              >
                <VStack spacing={'4px'} align={'stretch'}>
                  <Text size='sm'><b>Name:</b> {worker?.firstName} {worker?.lastName}</Text>
                  <Text><b>Unit:</b> {worker?.unit}</Text>
                  <Text><b>Sub unit:</b> {worker?.subUnit || ''}</Text>
                  <Text><b>Forwarded time:</b> {new Date(Number(currentTimeline?.createdAt)).toLocaleString()}</Text>
                </VStack>
                <Image w='120px' h='120px' src={worker?.image || avatar} borderRadius='full' />
              </Flex>

            </Box>
            <Box w='full' py='5px'>
              <Flex justify={'space-between'} align='center'>
                <Heading size='md'> Attachment </Heading>
                <Center gap='10px'>
                  {worker?._id === authState.user?._id && (
                    <BiPlus
                      cursor={'pointer'} style={{ cursor: 'pointer' }}
                      onClick={() => handleOpenAttachment(currentTimeline)}
                      size={30}
                    />
                  )}
                </Center>
              </Flex>
              {(currentTimeline?.attachments?.length) ? (
                <Box my='4' borderRadius={8} borderWidth={1} w='full'>
                  <Carousel showArrows={false}>
                    {currentTimeline?.attachments.map(attachment => (
                      <Box px={2} py={4} w='full' key={attachment._id}>
                        <Heading textDecoration={'underline'} size='sm' textAlign={'center'} textTransform={'capitalize'}>{attachment?.type} form</Heading>
                        <Center float='right' gap='4'>
                          <CopyIcon
                            cursor={'pointer'} fontSize='20px'
                            onClick={() => handleCopyForm(attachment, currentTimeline)}
                          />
                          {worker?._id === authState.user?._id && (
                            <CloseIcon
                              cursor={'pointer'} color='red'
                              fontSize={'20px'}
                              onClick={() => removeAttachment(attachment._id, currentTimeline?._id)}
                            />
                          )}
                        </Center>
                        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={'12px'} rowGap='4px' w='full'>
                          {Object.keys(attachment?.form || {})?.map((key, i) => {
                            if (key.isArray && key.isArray()) {
                              return (
                                <GridItem colSpan={2}>
                                  <Text display={'inline'}>
                                    <Text fontWeight={500} as='span'>{attachmentKeys[key] || key}: </Text>
                                    {Object.values(attachment?.form)[i].map(test => (
                                      <>
                                        {(typeof attachment[test] === 'string') ? (
                                          <Text as='span' fontSize={'18px'}>{attachmentKeys[test] || test} {', '} </Text>
                                        ) : (
                                          <>
                                            <Text as='span' fontSize={'18px'}>{attachmentKeys[test] || test} {', '} </Text>
                                          </>
                                        )}
                                      </>
                                    ))}
                                  </Text>
                                </GridItem>
                              )
                            } else {
                              return (
                                <Text display={'inline'}>
                                  <Text as='span' fontWeight={500}>{attachmentKeys[key] || key}: </Text>
                                  <Text as='span'>{Object.values(attachment?.form)[i]?.toString()}</Text>
                                </Text>
                              )
                            }
                          })}
                        </SimpleGrid>
                      </Box>
                    ))}
                  </Carousel>
                </Box>
              ) : (
                <Box my='4' w='full'>
                  <Text textAlign={'center'} fontWeight={500}>No attachment yet</Text>
                </Box>
              )}
            </Box>
          </Flex >
        )
      })}
      <Attachment
        bioData={appointment?.patient?.bioData}
        onSubmitAttachment={onSubmitAttachment}
        setAttachmentToEdit={setAttachmentToEdit}
        attachmentToEdit={attachmentToEdit}
        attachmentModal={attachmentModal}
      />
    </Box >
  )
}

export default Timeline