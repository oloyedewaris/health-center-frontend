import React, { useEffect, useMemo, useState } from 'react'
import { Box, Heading, Flex, Button, useToast, Text, Input } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import CustomTable, { TableCell } from '../../../../../components/table'
import { useNavigate } from 'react-router-dom';

const FluidBalanceOutput = ({ patient }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const dataToUse = [
    {
      "urine": "",
      "gastricAspirate": "",
      "vomit": "",
      "bile": "",
      "blood": "",
      "stool": "",
      "other": "",
    },
    {
      "urine": "",
      "gastricAspirate": "",
      "vomit": "",
      "bile": "",
      "blood": "",
      "stool": "",
      "other": "",
    },
  ]

  const columns = useMemo(() => [
    {
      Header: "Urine",
      accessor: "urine",
    },
    {
      Header: "Gastric Aspirate",
      accessor: "gastricAspirate",
    },
    {
      Header: "Vomit",
      accessor: "vomit",
    },
    {
      Header: "Bile",
      accessor: "bile",
    },
    {
      Header: "Blood",
      accessor: "blood",
    },
    {
      Header: "Stool",
      accessor: "stool",
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
          Fluid balance (Output)
        </Heading>
      </Flex>
      <CustomTable
        w='full'
        cellType='input'
        columns={columns}
        data={dataToUse}
      />
    </Box>
  )
}

export default FluidBalanceOutput