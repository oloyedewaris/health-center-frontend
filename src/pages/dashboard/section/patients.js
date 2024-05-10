import { Box } from '@chakra-ui/react'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getAdminPatientsApi } from '../../../api/admin';
import { useQuery } from 'react-query'
import { useContext } from 'react';
import { GlobalContext } from '../../../context/Provider';

const Patients = () => {
  const { authState } = useContext(GlobalContext);

  const getAdminPatientsQuery = useQuery(['getAdminPatientsApi', authState?.user?.unit], getAdminPatientsApi);
  const patients = getAdminPatientsQuery?.data?.data?.patients;

  return (
    <Box px='24px' w='full'>
      <Box w='full' overflowX={'scroll'}>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th size='sm'>Surname</Th>
                <Th size='sm'>Other Names</Th>
                <Th size='sm'>Matric No.</Th>
                <Th size='sm'>Email</Th>
                <Th size='sm'>Patient Type</Th>
                <Th size='sm'>Department</Th>
                <Th size='sm'>Date Of Birth</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients?.map(patient => (
                <Tr key={patient._id} w='full' justify={'space-between'} align={'center'} py='2'>
                  <Td>{patient.bioData.surname}</Td>
                  <Td>{patient.bioData.otherNames}</Td>
                  <Td>{patient.bioData.matricNo}</Td>
                  <Td>{patient.bioData.email}</Td>
                  <Td>{patient.bioData.patientType}</Td>
                  <Td>{patient.bioData.department}</Td>
                  <Td>{patient.bioData.dateOfBirth}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>


      </Box>
    </Box>
  )
}

export default Patients