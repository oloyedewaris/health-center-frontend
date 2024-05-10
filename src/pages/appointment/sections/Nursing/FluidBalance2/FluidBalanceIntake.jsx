import React, { useMemo } from 'react'
import { Box, Heading, Flex, useToast } from '@chakra-ui/react'
import CustomTable from '../../../../../components/table'
import { useNavigate } from 'react-router-dom';

const FluidBalanceIntake = ({ patient }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const dataToUse = [
    {
      "type": "",
      "intraVenous": "",
      "oral": "",
      "other": "",
    },
    {
      "type": "",
      "intraVenous": "",
      "oral": "",
      "other": "",
    },
  ]

  const columns = useMemo(() => [
    {
      Header: "Type of  Fluid",
      accessor: "type",
    },
    {
      Header: "Intra Venous",
      accessor: "intraVenous",
    },
    {
      Header: "Oral",
      accessor: "oral",
    },
    {
      Header: "Other",
      accessor: "other",
    },
  ])

  const saveSheet = () => {

  }

  return (
    <Box py='24px' w='full' >
      <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
        <Heading fontSize={'22px'} mb='15px' fontWeight={600} as='h1'>
          Fluid balance (Intake)
        </Heading>
      </Flex>
      <CustomTable
        cellType='input'
        columns={columns}
        data={dataToUse}
      />
    </Box>
  )
}

export default FluidBalanceIntake