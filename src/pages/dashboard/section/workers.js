import { Box, Flex, useToast, Text, Heading, Switch, Modal, ModalOverlay, ModalContent, useDisclosure, Button, ModalBody, Spinner, SimpleGrid, GridItem, Image, Center, } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { GlobalContext } from '../../../context/Provider';
import { BiArrowBack } from 'react-icons/bi';
import avatar from '../../../assets/images/avatar.png'
import { changeWorkerStatusApi } from '../../../api/workers';
import { useMutation, useQuery } from 'react-query'
import { getAdminWorkersByUnitApi } from '../../../api/admin';

const Workers = () => {
  const toast = useToast()
  const [worker, setWorker] = useState(null)
  const [postData, setPostData] = useState({})
  const actionModal = useDisclosure()
  const { authState } = useContext(GlobalContext);

  const getAdminWorkersByUnitQuery = useQuery(['getAdminWorkersByUnitApi', authState?.user?.unit], () => getAdminWorkersByUnitApi(authState?.user?.unit))
  const workers = getAdminWorkersByUnitQuery?.data?.data?.workers;

  const changeWorkerStatusMutation = useMutation(
    (form) => changeWorkerStatusApi(form.status, form.workerId), {
    onSuccess: async res => {
      await getAdminWorkersByUnitQuery.refetch()
      actionModal.onClose()
    },
    onError: err => {
      toast({
        title: 'Update error',
        description: err?.response?.data?.msg || "An error occurred while updating worker",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const changeWorkerStatus = ({ status, workerId }) => {
    changeWorkerStatusMutation.mutate({ status, workerId })
  }


  const openModal = (e, workerId) => {
    actionModal.onOpen()
    const checked = e.target.checked
    setPostData({ status: checked ? 'active' : 'inactive', workerId })
  }

  const handleActivate = (e, workerId) => {
    changeWorkerStatus(postData)
  }

  return (
    <Box px='24px' w='full'>
      {worker ? (
        <Box px='24px' w='full'>
          <Flex justify={'space-between'} align={'center'} mt='10px' mb='20px'>
            <BiArrowBack cursor={'pointer'} onClick={() => setWorker(null)} />
            <Heading size='sm' textAlign={'center'} textDecoration={'underline'}>Staff Details</Heading>
            <Box w='25px' />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing='10px'>
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Center w='full' py='20px'>
                <Image
                  h='140px' w='140px'
                  borderRadius={'full'}
                  src={worker?.image}
                  fallbackSrc={avatar}
                />
              </Center>
            </GridItem>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>First Name: </Text>
              <Text as='span'>{worker?.firstName}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Last Name: </Text>
              <Text as='span'>{worker?.lastName}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Phone Numbetr: </Text>
              <Text as='span'>{worker?.phoneNumber}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Status: </Text>
              <Text as='span'>{worker?.status}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Sub unit: </Text>
              <Text as='span'>{worker?.subUnit}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Email: </Text>
              <Text as='span'>{worker?.email}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Unit: </Text>
              <Text as='span'>{worker?.unit}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Staff Id: </Text>
              <Text as='span'>{worker?.idNo}</Text>
            </Text>
            <Text noOfLines={1}>
              <Text as='span' fontWeight={500}>Last login: </Text>
              <Text as='span'>{worker?.lastLogin ? new Date(worker?.lastLogin).toLocaleString() : 'Not available'}</Text>
            </Text>
          </SimpleGrid>
        </Box>
      ) : (
        <Box w='full' overflowX={'scroll'}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th size='sm'>Name</Th>
                  <Th size='sm'>Email</Th>
                  <Th size='sm'>Last login</Th>
                  <Th size='sm'>Status</Th>
                  <Th>Action</Th>
                  <Th size='sm'>Unit</Th>
                  <Th size='sm'>Sub-unit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {workers?.map(worker => (
                  <Tr cursor={'pointer'} key={worker._id} w='full' justify={'space-between'} align={'center'} py='2'>
                    <Td onClick={() => setWorker(worker)}>{`${worker.firstName} ${worker.lastName}`}</Td>
                    <Td onClick={() => setWorker(worker)}>{worker.email}</Td>
                    <Td onClick={() => setWorker(worker)}>{worker?.lastLogin ? new Date(worker?.lastLogin).toLocaleString() : '-'}</Td>
                    <Td onClick={() => setWorker(worker)}>{worker.status}</Td>
                    <Td>
                      <Switch onChange={e => openModal(e, worker._id)} isChecked={worker?.status === 'active'} />
                    </Td>
                    <Td onClick={() => setWorker(worker)}>{worker.unit}</Td>
                    <Td onClick={() => setWorker(worker)}>{worker.subUnit}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>


          <Modal isCentered isOpen={actionModal?.isOpen} onClose={actionModal?.onClose}>
            <ModalOverlay />
            <ModalContent maxW='400px' minHeight={'200px'}>
              <ModalBody>
                {changeWorkerStatusMutation.isLoading ? (
                  <Spinner size='xl' />
                ) : (
                  <Box my='10%'>
                    <Heading size='md' textAlign='center'>
                      Are you sure you want to {postData?.status === 'active' ? 'activate' : 'deactivate'} this worker?
                    </Heading>
                    <Flex justify={'space-between'} align='center' mt='30px'>
                      <Button w='45%' onClick={handleActivate}>Yes</Button>
                      <Button w='45%' onClick={actionModal?.onClose}>No</Button>
                    </Flex>
                  </Box>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  )
}

export default Workers