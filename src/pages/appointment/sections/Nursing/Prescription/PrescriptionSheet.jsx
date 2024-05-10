import React, { useEffect, useMemo, useState } from 'react'
import { Box, Heading, Flex, Button, useToast, Text, Input } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import axiosInstance from '../../../../../utils/axiosInstance'
import CustomTable, { TableCell } from '../../../../../components/table'
import { useNavigate } from 'react-router-dom';

const dataSample = {
  "time": "",
  "drug": "",
  "days": "",
  "status": "",
}

const PrescriptionSheet = ({ patient }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [dataToUse, setDataToUse] = useState([dataSample])


  const columns = useMemo(() => [
    {
      Header: "Date/Time",
      accessor: "time",
    },
    {
      Header: "Drug",
      accessor: "drug",
    },
    {
      Header: "Days",
      accessor: "days",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ])

  const saveSheet = () => {

  }


  return (
    <Box padding='24px' w='full' >
      <Flex as='header' px='15px' h='fit-content' justify='space-between' align='center' w='100%'>
        <Heading fontSize={'22px'} mb='15px' fontWeight={600} as='h1'>
          Prescription Sheet
        </Heading>
      </Flex>
      <CustomTable
        cellType='input'
        columns={columns}
        data={dataToUse}
      />
      <Button
        // mt='25px'
        float='right'
        onClick={() => setDataToUse([...dataToUse, dataSample])}
      >
        <BiPlus size={25} />
      </Button>

      <Button
        w='full'
        mt='25px'
        float='right'
        onClick={saveSheet}
      >
        Save
      </Button>
    </Box>
  )
}

export default PrescriptionSheet