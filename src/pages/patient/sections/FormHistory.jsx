import React from 'react'
import { Box, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import attachmentKeys from '../../../utils/attachmentKeys';
import { useQuery } from 'react-query';
import { getPatientFormsApi } from '../../../api/request';

const FormHistory = ({ patient }) => {
  const getPatientFormsQuery = useQuery(['getPatientFormsApi', patient?._id], () => getPatientFormsApi(patient?._id))
  const forms = getPatientFormsQuery?.data?.data?.requestForms;

  return (
    <Box>
      {forms?.map(form => (
        <Box px={2} py={4} w='full'>
          <Heading
            textDecoration={'underline'}
            size='sm' textAlign={'center'}
            textTransform={'capitalize'}
          >{
              form?.type} form
            {form?.deleted && <Text textDecoration={'none'} as='span' color='red'> (Deleted)</Text>}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={'12px'} rowGap='4px' w='full'>
            {Object.keys(form?.form || {})?.map((key, i) => {
              if (key.isArray && key.isArray()) {
                return (
                  <GridItem colSpan={2}>
                    <Text display={'inline'}>
                      <Text fontWeight={500} as='span'>{attachmentKeys[key] || key}: </Text>
                      {Object.values(form?.form)[i]?.map(test => (
                        <>
                          {(typeof form[test] === 'string') ? (
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
                    <Text as='span'>{Object.values(form?.form)[i]?.toString()}</Text>
                  </Text>
                )
              }
            })}
          </SimpleGrid>
        </Box>
      ))}
      {!forms?.length && <Text mt='10px' fontWeight={500} textAlign={'center'}>No previous form available</Text>}
    </Box>
  )
}

export default FormHistory