import React, { useContext, useMemo } from 'react'
import { Flex, DrawerCloseButton, useToast } from '@chakra-ui/react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Heading } from '@chakra-ui/react';
import axiosInstance from '../../../utils/axiosInstance';
import CustomTable from '../../table';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GlobalContext } from '../../../context/Provider';
import { getAppointmentsApi } from '../../../api/appointments';

const SchedulesDrawer = ({ schedulesDrawer }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const { authState } = useContext(GlobalContext);



  const APPOINTMENT_DATA = useQuery(
    ['getAllApointments', authState.user?._id],
    getAppointmentsApi,
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

  // useEffect(() => {
  //   setAppointmentData([...newAppointmentData])
  // }, [APPOINTMENT_DATA])

  const appointmentData =
    (APPOINTMENT_DATA?.data?.data?.appointments || []).map(schedule => ({
      id: schedule._id,
      name: `${schedule.patient?.bioData?.surname} ${schedule.patient?.bioData?.otherNames}`,
      nhisNo: schedule?.patient?.bioData?.NHISNo,
      unitNo: schedule?.patient?.bioData?.unitNo,
      startTime: (new Date(Number(schedule.timestamp))).toLocaleTimeString()
    }))

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "NHIS No",
        accessor: "nhisNo",
      },
      {
        Header: "Unit No",
        accessor: "unitNo",
      },
      {
        Header: "Time",
        accessor: "startTime",
      },
    ])

  const handleClick = (route) => {
    schedulesDrawer?.onClose();
    const appointment = appointmentData.find(appointment => appointment.id === route)
    if (appointment)
      navigate(`/appointment/${appointment.id}`)
  }

  return (
    <Drawer isCentered={false} scrollBehavior='inside' isOpen={schedulesDrawer.isOpen} onClose={schedulesDrawer.onClose}>
      <DrawerOverlay />
      <DrawerContent maxW='600px'>
        <DrawerCloseButton onClose={schedulesDrawer.onClose} />
        <DrawerHeader my='21px' pb='12px' borderBottom='1px solid #D3D3D3' fontSize={28} fontWeight={500} px='0'>
          <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
            <Heading fontSize={'18px'} fontWeight={600} as='h1'>
              Patients waiting to be attended to
            </Heading>
          </Flex>
        </DrawerHeader>
        <DrawerBody p='0'>
          <CustomTable onRowClick={handleClick} columns={columns} data={appointmentData} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SchedulesDrawer