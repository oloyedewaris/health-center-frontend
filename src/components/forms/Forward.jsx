import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Box, Heading, Button, Flex, CircularProgress, SimpleGrid, GridItem, Text } from '@chakra-ui/react';
import FormSelect from '../../components/form/FromSelect';
import units from '../../utils/units';
import { useQuery } from 'react-query'
import { searchWorkersApi } from '../../api/workers';

const Forward = ({ forwardModal, onForward, heading }) => {
  const [staff, setStaff] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [subUnit, setSubUnit] = useState(null);
  const [selectedUnit, setUnitObj] = useState(null);

  const searchWorkerQuery = useQuery(['searchWorkersApi', unitName, subUnit], () => {
    const args = {
      unit: unitName,
      subUnit: subUnit && subUnit
    }
    return searchWorkersApi(args);
  });

  const fetchedStaffs = searchWorkerQuery?.data?.data;

  const handleForward = (e) => {
    const workerId = staff._id;
    onForward(workerId)
    setStaff(null)
  }

  const handleStaffChange = staffId => {
    const staff = fetchedStaffs?.find(staff => staff._id === staffId)
    setStaff(staff)
  }

  const handleUnit = (e) => {
    const unitGotten = units.find(unit => unit.unit === e.target.value)
    setUnitObj(unitGotten)
    setUnitName(e.target.value);
    setSubUnit('');
  }


  return (
    <Modal isCentered isOpen={forwardModal?.isOpen} onClose={forwardModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='600px' minHeight={'260px'}>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Flex direction={'column'} justify={'space-between'} align='stretch'>
            <Box p='14px' w='full'>
              <Heading size='md' textAlign={'center'}>{heading}</Heading>
              <SimpleGrid gap='20px' columns={2}>
                <FormSelect
                  options={units.map(unit => unit.unit)}
                  id='unit'
                  onChange={handleUnit}
                  placeholder='Select Unit'
                />
                <FormSelect
                  options={selectedUnit?.subUnits || []}
                  id='unit'
                  onChange={e => setSubUnit(e.target.value)}
                  placeholder='Select Sub Unit'
                />
                <GridItem colSpan={2} maxH={'60vh'} overflowY={'scroll'}>
                  {!searchWorkerQuery.isLoading ? (
                    <>
                      {!fetchedStaffs?.length ? (
                        <Text textAlign={'center'}>No staff found</Text>
                      ) : (
                        <Box>
                          {fetchedStaffs.map(fetchedStaff => (
                            <Box
                              cursor={'pointer'}
                              onClick={() => handleStaffChange(fetchedStaff._id)}
                              key={fetchedStaff?._id} my='4'
                              border='1px solid #aeaeae' borderRadius={'20px'}
                              p='12px'
                              color={staff?._id === fetchedStaff._id ? '#fff' : '#1e1e1e'}
                              bg={staff?._id === fetchedStaff._id ? '#1e1e1e' : 'transparent'}

                            >
                              <Heading size='sm'> {`${fetchedStaff.firstName} ${fetchedStaff.lastName}`}</Heading>
                              <Text>Unit {'---> '} {fetchedStaff.unit}</Text>
                              <Text>Subunit {'---> '} {fetchedStaff.subUnit}</Text>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </>
                  ) : (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  )}
                </GridItem>
              </SimpleGrid>
            </Box>
            {staff && (
              <Button onClick={handleForward} my='30px'>
                {heading} {`${staff?.firstName} ${staff?.lastName}`} -- {staff.unit}
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Forward