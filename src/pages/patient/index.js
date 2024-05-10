import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Flex, GridItem, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner, Image, Text, useToast } from "@chakra-ui/react";
import Biodata from './sections/Biodata';
import { useParams } from 'react-router-dom';
import VisualSkill from './sections/VisualSkill';
import PathologyLab from './sections/PathologyLab';
import LayoutView from '../../components/layout';
import Auth from '../../hoc/Auth';
import Appointments from './sections/Appointments';
import ContinuationSheet from './sections/ContinuationSheet';
import FormHistory from './sections/FormHistory';
import { approvePatientApi, getPatientByIdApi, updatePatientImageApi } from '../../api/patients';
import { useQuery, useMutation } from 'react-query'
import { getAgeApp } from '../../utils/getAge';
import { useDropzone } from 'react-dropzone';
import camera from '../../images/camera.png';
import avatar from '../../assets/images/avatar.png'
import uploadImage from '../../utils/uploadImage';

const PatientProfile = () => {
  const toast = useToast()
  const patientId = useParams().id
  const [tabIndex, setTabIndex] = useState(0);
  const [loadingImage, setLoadingImage] = useState(false);

  const getPatientByIdQuery = useQuery(['getPatientByIdApi', patientId], () => getPatientByIdApi(patientId));
  const patient = getPatientByIdQuery?.data?.data;

  const updatePatientImageMutation = useMutation(updatePatientImageApi, {
    onSuccess: async res => {
      await refetch();
    },
    onError: err => {
      toast({
        title: "Error...",
        description: 'An error occurred while saving image',
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  })


  const addFiles = useCallback((acceptedFiles) => {
    setLoadingImage(true)
    uploadImage(acceptedFiles)
      .then(res => {
        const url = res.data.url;
        const dataToSubmit = { image: url, patientId: patient?._id }
        updatePatientImageMutation.mutate(dataToSubmit)
      })
      .catch(err => {
        toast({
          title: "Error...",
          description: 'An error occurred while uploading image',
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => setLoadingImage(false))
  })

  const approvePatientMutation = useMutation(approvePatientApi, {
    onSuccess: async res => {
      toast({
        title: 'Approval success',
        description: "Patient approved successfully",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await getPatientByIdQuery.refetch()
    },
    onError: err => {
      toast({
        title: 'Approval error',
        description: err?.response?.data?.msg || "An error occurred while approving patient",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: { "image/*": [], },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: addFiles
  });


  useEffect(() => {
    if (fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);



  const handleApprove = () => {
    approvePatientMutation.mutate(patient?._id)
  }

  const tabs = [
    {
      tablist: "Biodata",
      component: <Biodata patient={patient} refetch={getPatientByIdQuery.refetch} />,
    },
    {
      tablist: "Continuation Sheet",
      component: <ContinuationSheet patient={patient} refetch={getPatientByIdQuery.refetch} />,
    },
    {
      tablist: "Visual Skill",
      component: <VisualSkill patient={patient} />,
    },
    {
      tablist: "Pathology Lab",
      component: <PathologyLab patient={patient} />,
    },
    {
      tablist: "Attendance",
      component: <Appointments patient={patient} refetch={getPatientByIdQuery.refetch} />,
    },
    {
      tablist: "Form History",
      component: <FormHistory patient={patient} />,
    },
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <LayoutView>
      {getPatientByIdQuery.isLoading || !patient ? (
        <Flex justify='center' align='center' h='60vh' w='full'>
          <CircularProgress isIndeterminate size="24px" />
        </Flex>
      ) : (
        <Box>
          <Box pt='20px' pb='20px' px='24px' w='full'>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing='10px'>
              <GridItem colSpan={1} rowSpan={4} mx={'auto'} mb='30px'>
                <Box
                  h='140px' w='140px'
                  borderRadius={'full'}
                  mx='auto'
                  position={'relative'}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  {isDragActive && <Text>Drop the files here</Text>}
                  {loadingImage ? <Spinner w='full' h='full' /> : (
                    <Image
                      borderRadius={'full'}
                      w='full' h='full'
                      src={patient?.image}
                      fallbackSrc={avatar}
                      position={'absolute'}
                      top={'0'} right={'0'}
                    />
                  )}
                  <Image zIndex={2} src={camera} position={'absolute'} top={'5px'} right={'5px'} />
                </Box>
              </GridItem>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Surname: </Text>
                <Text as='span'>{patient?.bioData?.surname}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Other Names: </Text>
                <Text as='span'>{patient?.bioData?.otherNames}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Telephone: </Text>
                <Text as='span'>{patient?.bioData?.telephone}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>NHIS No.: </Text>
                <Text as='span'>{patient?.bioData?.NHISNo}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Unit No: </Text>
                <Text as='span'>{patient?.bioData?.unitNo}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Matric No.: </Text>
                <Text as='span'>{patient?.bioData?.matricNo}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Age: </Text>
                <Text as='span'>{patient?.bioData?.dateOfBirth && getAgeApp(patient?.bioData?.dateOfBirth)}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Sex: </Text>
                <Text as='span'>{patient?.bioData?.sex}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Date Of Birth: </Text>
                <Text as='span'>{patient?.bioData?.dateOfBirth}</Text>
              </Text>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Email: </Text>
                <Text as='span'>{patient?.bioData?.email}</Text>
              </Text>
            </SimpleGrid>
            <Flex justify={'flex-end'} gap='4'>
              <Text noOfLines={1}>
                <Text as='span' fontWeight={500}>Status: </Text>
                <Text as='span'>{patient?.approved ? 'Approved' : 'Not approved'}</Text>
              </Text>
              {!patient?.approved && <Button color='green' onClick={handleApprove}>Approve patient</Button>}
            </Flex>
          </Box>
          <Tabs onChange={handleTabChange} isLazy shadow={'xl'}>
            <SimpleGrid columns={{ base: 1, md: 4 }} w='full' spacing='20px' >
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <TabList minH='80vh' flexDirection={'column'} h='full' px='0' gap='10px' pt='30px' shadow='md' fontWeight="600" fontSize="18px">
                  {tabs.map((item, index) => (
                    <Tab key={index} borderBottom={0} w='full' mx='0'>
                      {tabIndex === index ? (
                        <Flex fontWeight='600' color='white' bg='#19518D' borderRadius='10px' mx="0" w="full" px='12px' py='8px'>
                          {item.tablist}
                        </Flex>
                      ) : (
                        <Flex fontWeight='600' color='black' borderRadius='10px' mx="auto" w="full" px='12px' py='8px'>
                          {item.tablist}
                        </Flex>
                      )}
                    </Tab>
                  ))}
                </TabList>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 3 }} >
                <TabPanels shadow='md' minH='80vh'>
                  {tabs.map((item, index) => (
                    <TabPanel key={index} px="0px">
                      {item.component}
                    </TabPanel>
                  ))}
                </TabPanels>
              </GridItem>
            </SimpleGrid>
          </Tabs>
        </Box>
      )}
    </LayoutView>
  )
}

export default Auth(PatientProfile)