import React from 'react'
import { Box, Text, SimpleGrid, GridItem, Image } from '@chakra-ui/react';
import avatar from '../../../assets/images/avatar.png';
import { getAgeApp } from '../../../utils/getAge';

const Biodata = ({ bioData, patient }) => {

  return (
    <Box padding='24px' w='full' >
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing='19px'>
        <GridItem colSpan={4} mb='30px'>
          <Box
            h='140px' w='140px'
            borderRadius={'full'}
            mx='auto'
            position={'relative'}
          >
            <Image
              borderRadius={'full'}
              w='full' h='full'
              src={patient?.image}
              fallbackSrc={avatar}
              position={'absolute'}
              top={'0'} right={'0'}
            />
          </Box>
        </GridItem>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Surname: </Text>{bioData?.surname}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Other Names: </Text>{bioData?.otherNames}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Email: </Text>{bioData?.email}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Unit No: </Text>{bioData?.unitNo}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Matric No: </Text>{bioData?.matricNo}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Title: </Text>{bioData?.title}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Home Address: </Text>{bioData?.homeAddress}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>NHIS No.: </Text>{bioData?.NHISNo}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Patient Type: </Text>{bioData?.patientType}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Telephone: </Text>{bioData?.telephone}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Age: </Text>{bioData?.dateOfBirth ? getAgeApp(bioData?.dateOfBirth) : ''}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Marital Status: </Text>{bioData?.maritalStatus}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Sex: </Text>{bioData?.sex}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Home Town: </Text>{bioData?.homeTown}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Tribe: </Text>{bioData?.tribe}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Occupation: </Text>{bioData?.occupation}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Department: </Text>{bioData?.department}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Religion: </Text>{bioData?.religionOrDenimination}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Date Of Birth: </Text>{bioData?.dateOfBirth}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Nationality: </Text>{bioData?.nationality}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>State: </Text>{bioData?.state}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Date Registered: </Text>{bioData?.dateRegistered}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>XRay No.: </Text>{bioData?.xRayNumber}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Sensivity: </Text>{bioData?.sensivity}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Rhesus: </Text>{bioData?.rhesus}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Genotype: </Text>{bioData?.genotype}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Blood Group: </Text>{bioData?.bloodGroup}
        </Text>
        <Text>
          <Text as='span' fontWeight={700} noOfLines={1}>Allergies: </Text>{bioData?.allergies}
        </Text>
      </SimpleGrid>
    </Box>
  )
}

export default Biodata