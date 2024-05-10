import React, { useMemo } from 'react'
import { Box, Heading, Flex, Button, useToast, Text, CircularProgress } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import CustomTable from '../../../components/table'
import { useNavigate } from 'react-router-dom';
import { getPatientAppointmentsApi, startAppointmentByStaffApi } from '../../../api/appointments';
import { useQuery, useMutation } from 'react-query'

const Appointments = ({ patient, refetch }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const getPatientAppointmentsQuery = useQuery(['getPatientAppointmentsApi', patient?._id], () => getPatientAppointmentsApi(patient?._id));
  const appointments = getPatientAppointmentsQuery?.data?.data?.appointments;

  const startAppointmentMutation = useMutation(startAppointmentByStaffApi, {
    onSuccess: async res => {
      await refetch();
      toast({
        title: 'Attendance started',
        description: "Patient's attendance has successfully started",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    onError: err => {
      toast({
        title: 'An error occurred',
        description: err.response?.data?.msg || "An error occurred while starting appointment",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const columns = useMemo(() => [
    {
      Header: "Current attending staff",
      accessor: "currentAttendingWorker",
    },
    {
      Header: "Status",
      accessor: "closed",
    },
    {
      Header: "Current unit",
      accessor: "unit",
    },
    {
      Header: "Current sub-unit",
      accessor: "subUnit",
    },
  ])

  const startAppointment = () => {
    startAppointmentMutation.mutate(patient?._id)
  }

  const appointmentData =
    appointments?.sort((a, b) => b.timestamp - a.timestamp).map(app => ({
      id: app._id,
      closed: app.closed ? <Button color='red.600'>Closed</Button> : <Button color='green.600'>Open</Button>,
      currentAttendingWorker: app?.currentAttendingWorker ?
        `${app.currentAttendingWorker?.firstName} ${app.currentAttendingWorker?.lastName}` :
        'null',
      unit: app?.currentAttendingWorker?.unit || 'null',
      subUnit: app?.currentAttendingWorker?.subUnit || 'null',
    })) || []

  return (
    <Box padding='24px' w='full' >
      <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
        <Heading fontSize={'22px'} mb='15px' fontWeight={600} as='h1'>
          Appointments History
        </Heading>
      </Flex>
      <Flex w='full' justify={'flex-end'}>
        <Button
          alignSelf={'flex-end'}
          my='15px'
          onClick={startAppointment}
          leftIcon={<BiPlus size={20} />}>
          Start Attendance
        </Button>
      </Flex>
      {getPatientAppointmentsQuery.isLoading ? (
        <Flex justify='center' align='center' h='10vh' w='100%'>
          <CircularProgress isIndeterminate size="24px" />
        </Flex>
      ) : (
        <CustomTable onRowClick={(id) => navigate(`/appointment/${id}`)} columns={columns} data={appointmentData} />
      )}
      {appointments?.length <= 0 && <Text textAlign='center' mx='auto'>No scheduled attendance yet</Text>}
    </Box>
  )
}

export default Appointments