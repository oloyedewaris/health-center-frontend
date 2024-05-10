import React from 'react'
import { Box, Text, Flex, Image, HStack, Center, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import buildingBg from '../assets/images/building-bg.png'
import { Button } from '../components/Buttons';
import longArrowRight from '../assets/images/long-arrow-right.svg';
import landingMap from '../assets/images/landing-map.png';
import numb1 from '../assets/images/69B+.svg';
import numb2 from '../assets/images/20+.svg';
import numb3 from '../assets/images/10X.svg';
import numb4 from '../assets/images/99.9.svg';
import billboard from '../assets/images/veerge-billboard.png';
import Footer from '../components/Footer/Footer';
import allEmcompass1 from '../assets/images/all-emcompass1.png'
import allEmcompass2 from '../assets/images/all-emcompass2.png'
import allEmcompass3 from '../assets/images/all-emcompass3.png'
import people from '../assets/images/people.png';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import fraction from '../assets/images/fraction.png';
import Carousel from 'react-elastic-carousel';
import LandingAuth from '../hoc/LandingWrapper';
import GetStarted from '../components/navbar/sections/get-started';
import Navbar from '../components/navbar';

const Home = () => {
  const getStarted = useDisclosure();

  const numbers = [
    {
      text: 'Patients daily consultation',
      image: numb1,
      end: 100,
      prefix: '+'
    },
    {
      text: 'Clinical Services',
      image: numb2,
      end: 20,
      prefix: '+'
    },
    {
      text: 'Departments and Units',
      image: numb3,
      end: 10,
      prefix: '+'
    },
    {
      text: 'Reliability',
      image: numb4,
      end: 99.9,
      prefix: '%',
      isDecimal: true
    },
  ]

  const allEmcompass = [
    allEmcompass1,
    allEmcompass2,
    allEmcompass3,
  ]

  return (
    <Box fontFamily={'euclid'} position={'relative'} w='full'>
      <Navbar />
      <Box
        bg='#F2F2F2'
        bgImage={{ base: 'unset', md: buildingBg }}
        w={{ base: '100%', md: '85%' }}
        h='full'
        minH={'630px'}
        ml={'auto'}
        bgPosition={'center'}
        bgSize={'cover'}
        pt={{ base: '70px', md: '70px' }}
      >
        <Flex
          h='fit-content' w={{ base: '100%', md: '570px' }}
          bg={{ base: 'inherit', md: '#fff' }} align={'stretch'}
          direction={'column'}
          justify={'flex-start'}
          ml={{ base: 'auto', md: '-175px' }}
          mr={{ base: 'auto', md: 'unset' }}
          p={{ base: '24px', md: '40px 21px 41px 76px' }}
        >
          <Text
            fontFamily={'syne_semibold'}
            fontSize={{ base: '24px', md: '40px' }} fontWeight={600}
            color='#011B33'
          >The Internet of Health Care</Text>
          <Text
            mt={{ base: '8px', md: '20px' }} fontSize={{ base: '12px', md: '18px' }}
            fontWeight={400} lineHeight={{ base: '15.471px', md: '30px' }}
            color='#011B33' fontFamily={'euclid'}
          >An ever-evolving tech of apps & services, built to make health care work better and accessible for all.</Text>
          <Image mt='0px' src={buildingBg} objectFit={'cover'} objectPosition={'-10px'} w='100%' h='350px' display={{ base: 'block', md: 'none' }} />
          <Button
            onClick={getStarted.onOpen}
            borderRadius='0' w={{ base: 'full', md: '466px' }}
            h={{ base: '40px', md: '48px' }}
            bg='#19508d' mt='11px' _hover={{ bg: '#19508d' }}
            _active={{ bg: '#19508d' }}>
            <Text
              fontSize={'14px'}
              fontWeight={500}
              lineHeight={'30px'}
              color={'#fff'}
            >Get Started</Text>
          </Button>
        </Flex>

      </Box>

      <Box w='100%' mt={{ base: '40px', md: '100px' }} bg='#F7F7F7' py={{ base: '18px', md: '45px' }}>
        <Flex w={{ base: '90%', md: '85%' }} mx='auto' align={'center'} direction={{ base: 'column', md: 'row' }} justify={'space-between'} gap={{ base: '10px', md: '80px' }}>
          <Text mb='18px' alignSelf={'flex-start'} display={{ base: 'block', md: 'none' }} fontSize={{ base: '14px', md: '20px' }} fontWeight={400} lineHeight={{ base: '8.125px', md: '30px' }} color={'#606060'}>Technology Infrastructure</Text>
          <Image w={{ base: '100%', md: '54%' }} src={landingMap} />
          <Box>
            <Text display={{ base: 'none', md: 'block' }} fontSize={'20px'} fontWeight={400} lineHeight={'30px'} color={'#606060'}>Technology Infrastructure</Text>
            <Text mt='21px' maxW='540px' fontSize={{ base: '14px', md: '26px' }} fontWeight={500} lineHeight={{ base: 'normal', md: '30px' }} color={'#011B33'} fontFamily={'euclid-medium'}>
              Choose a path to wellness with us
            </Text>
            <Text mt={{ base: '16px', md: '41px' }} maxW={'468px'} fontSize={{ base: '14px', md: '18px' }} fontWeight={400} lineHeight={'normal'} color={'#3D3D3D'}>
              Our healthcare service combines advanced medical technology with a patient-centric approach to ensure you receive the best possible care.            </Text>
          </Box>
        </Flex>
      </Box>

      <Box w='85%' mx='auto' my={{ base: '20px', md: '50px' }}>
        <Text fontSize={{ base: '12px', md: '20px' }} fontWeight={400} lineHeight={{ base: '8.125px', md: '30px' }} color={'#606060'}>Infrastructure</Text>
        <Text mt='11px' maxW={'540px'} fontSize={{ base: '14px', md: '26px' }} fontWeight={500} lineHeight={{ base: '11.917px', md: '30px' }} color={'#011B33'} fontFamily={'euclid-medium'}>
          A Health Care Service built for growth
        </Text>
        <HStack display={{ base: 'none', md: 'flex' }} mt='37px' w='full' justify={'space-between'} align={'center'}>
          {numbers.map((numb) => (
            <Center
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'space-between'}
              h='166px'
            >
              <Box />
              <CountUp
                duration={2.75}
                separator=" "
                decimal={numb.isDecimal ? "." : null}
                decimals={numb.isDecimal ? 1 : null}
                suffix={numb.prefix}
                end={numb.end}
                redraw={true}
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <span
                      style={{
                        fontFamily: 'syne_bold',
                        color: '#19508d',
                        fontSize: '100px',
                        fontWeight: '700',
                        lineHeight: '30px'
                      }}
                      ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              <Text
                w='full' pl='10px'
                fontSize={'20px'} fontWeight={400}
                lineHeight={'44px'} color='#747474'
              >{numb.text}</Text>
            </Center>
          ))}
        </HStack>

        <SimpleGrid columns={2} rowGap={'60px'} columnGap={'10px'} display={{ base: 'grid', md: 'none' }} mt='37px' w='full' justify={'space-between'} align={'center'}>
          {numbers.map((numb) => (
            <Center
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'space-between'}
              h={{ base: '95px', md: '166px' }}
            >
              <Box />
              <CountUp
                duration={2.75}
                separator=""
                decimal={numb.isDecimal ? "." : null}
                decimals={numb.isDecimal ? 1 : null}
                suffix={numb.prefix}
                end={numb.end}
                redraw={true}
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <span
                      style={{
                        fontFamily: 'syne_bold',
                        color: '#19508d',
                        fontSize: '40px',
                        fontWeight: '700',
                        lineHeight: '130%'
                      }}
                      ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              <Text
                w='full' textAlign={'center'}
                fontSize={{ base: '14px', md: '20px' }} fontWeight={400}
                lineHeight={{ base: 'normal', md: '44px' }} color='#747474'
              >{numb.text}</Text>
            </Center>
          ))}
        </SimpleGrid>
      </Box>

      <Box w='85%' mx='auto' mt={{ base: '28px', md: '134px' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          w='full' alignItems={{ base: 'flex-start', md: 'center' }}
          justify={'space-between'}
          mt={{ base: '0', md: '47px' }} mb={{ base: '16px', md: '62px' }}
        >
          <Text
            mb={{ base: '24px', md: '0' }}
            lineHeight={{ base: 'normal', md: '44px' }}
            fontSize={{ base: '14px', md: '24px' }}
            fontWeight={{ base: 600, md: 500 }}
            maxW={'610px'}
            fontFamily={'euclid-medium'}
          >
            Experience personalized care like never before
          </Text>
          <Flex
            onClick={getStarted.onOpen}
            mt='22px'
            alignItems={'center'}
            justify={'flex-start'} gap='10px'
            cursor={'pointer'}
          >
            <Text
              _hover={{ textDecoration: 'underline' }}
              fontSize={{ base: '12px', md: '16px' }}
              fontWeight={500}
              lineHeight={'30px'}
              color={'#19508d'}
              fontFamily={'euclid-medium'}
            >Get started </Text>
            <Image src={longArrowRight} w='23.593px' h='auto' />
          </Flex>
        </Flex>

        <HStack display={{ base: 'none', md: 'flex' }} spacing={'41px'} justify={'space-between'} align={'flex-start'}>
          {allEmcompass.map(emcompass => (
            <Box
              position={'relative'} p='0' m='0'
              cursor={'pointer'} overflow={'hidden'}
              maxW={'auto'} w='full'
            >
              <Image
                h='401px'
                transition='transform 0.3s ease-in-out'
                objectPosition={'center'}
                w='full' src={emcompass}
              />
            </Box>
          ))}
        </HStack>

        <Box display={{ base: 'flex', md: 'none' }}>
          <Carousel
            pagination={true}
            showArrows={false}
            renderPagination={(props) => (
              <Center mt='20px' gap='4px'>
                {allEmcompass.map((box, i) => (
                  <Box bg={props.activePage === i ? '#000' : '#00000066'} w='5px' h='5px' borderRadius={'full'} />
                ))}
              </Center>
            )}
          >
            {allEmcompass.map(emcompass => (
              <Box
                position={'relative'} p='0' m='0'
                cursor={'pointer'} overflow={'hidden'}
                maxW={'auto'} w='full'
                h={{ base: 'auto', md: '340px' }}
              >
                <Image
                  h='auto'
                  transition='transform 0.3s ease-in-out'
                  _hover={{ transform: 'scale(1.2)', maxW: '100%' }}
                  objectPosition={'center'} objectFit={'contain'}
                  w='full' src={emcompass}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>

      <Box bg='#F7F7F7' w='full' h={{ base: 'auto', md: '536px' }} mt={{ base: '28px', md: '184px' }} pb={{ base: '28px', md: 'unset' }}>
        <Flex gap={{ base: '20px', md: 'unset' }} direction={{ base: 'column', md: 'row' }} pt={{ base: '28px', md: 'unset' }} mt={{ base: '28px', md: '84px' }} w='85%' mx='auto' justify={'space-between'} h='full' align={'center'}>
          <Box w={{ base: '100%', md: '55%' }} position={'relative'} h='auto'>
            <Image w={{ base: '180px', md: '462px' }} h={{ base: '240px', md: '548.075px' }} mx={'auto'} my='auto' src={fraction} />
          </Box>
          <Box maxW={{ base: '100%', md: '40%' }}>
            <Text display={{ base: 'none', md: 'block' }} fontSize={'20px'} fontWeight={400} lineHeight={'30px'} color={'#606060'}>Technology Infrastructure</Text>
            <Text display={{ base: 'none', md: 'block' }}
              fontFamily={'euclid-medium'}
              fontSize={'25px'} fontWeight={500}
              color='#011B33'
            >Unparalleled care for a healthier tomorrow</Text>
            <Text mt='7px' fontSize={{ base: '14px' }} fontWeight={{ base: 400 }} lineHeight={{ base: 'normal' }}>
              Join us in embracing a proactive approach to health, where our healthcare service becomes your partner in well-being.
            </Text>
            <Flex
              onClick={getStarted.onOpen}
              mt='22px'
              alignItems={'center'}
              justify={'flex-start'} gap='10px'
              cursor={'pointer'}
            >
              <Text
                _hover={{ textDecoration: 'underline' }}
                fontSize={{ base: '12px', md: '16px' }}
                fontWeight={500}
                lineHeight={'30px'}
                color={'#19508d'}
                fontFamily={'euclid-medium'}
              >Get started </Text>
              <Image src={longArrowRight} w='23.593px' h='auto' />
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Flex direction={{ base: 'column-reverse', md: 'row' }} mt={{ base: '28px', md: '184px' }} w='80%' mx='auto' justify={'space-between'} align={'center'}>
        <Box maxW={{ base: '100%', md: '43%' }}>
          <Box display={{ base: 'none', md: 'block' }}>
            <Text fontSize={'20px'} fontWeight={400} lineHeight={'30px'} color={'#606060'}>Technology Infrastructure</Text>
            <Text
              lineHeight={'50px'}
              fontFamily={'euclid-medium'}
              fontSize={'30px'} fontWeight={500}
              color='#011B33'
            >Elevate your health experience</Text>
          </Box>
          <Text>
            Our healthcare service combines cutting-edge treatments with a focus on prevention, ensuring a brighter and healthier future for you.
          </Text>
          <Flex
            onClick={getStarted.onOpen}
            mt='22px'
            alignItems={'center'}
            justify={'flex-start'} gap='10px'
            cursor={'pointer'}
          >
            <Text
              _hover={{ textDecoration: 'underline' }}
              fontSize={{ base: '12px', md: '16px' }}
              fontWeight={500}
              lineHeight={'30px'}
              color={'#19508d'}
              fontFamily={'euclid-medium'}
            >Get started </Text>
            <Image src={longArrowRight} w='23.593px' h='auto' />
          </Flex>
        </Box>

        <Box w={{ base: '100%', md: '55%' }} position={'relative'} mb={{ base: '24px', md: '0' }}>
          <Image w='full' h={{ base: '371px', md: '543px' }} src={people} />
        </Box>

        <Box display={{ base: 'block', md: 'none' }} mb='70px' alignSelf={'flex-start'}>
          <Text fontSize={'12px'} fontWeight={400} lineHeight={'8.125px'} color={'#606060'}>Technology Infrastructure</Text>
          <Text
            mt='12px'
            lineHeight={'11.917px'}
            fontFamily={'euclid-medium'}
            fontSize={'14px'} fontWeight={500}
            color='#011B33'
          >Elevate your health experience</Text>
        </Box>
      </Flex>

      <Flex
        pb={{ base: '48px', md: '100px' }}
        direction={{ base: 'column', md: 'row' }}
        w='85%' mx='auto' justify={'flex-start'}
        gap={{ base: '28px', md: '72px' }} align={'center'}
        mt={{ base: '40px', md: '107px' }}
      >
        <Box w={{ base: '100%', md: '47%' }}>
          <Text fontSize={{ base: '12px', md: '20px' }} fontWeight={400} lineHeight={{ base: '8.125px', md: '30px' }} color={'#606060'}>Research</Text>
          <Text mt='18px' maxW={'540px'} fontSize={{ base: '14px', md: '26px' }} fontWeight={500} lineHeight={{ base: '11.917px', md: '30px' }} color={'#011B33'} fontFamily={'euclid-medium'}>
            Our ideas and insights
          </Text>
          <Image w='full' mt='20px' h={{ base: '228.172px', md: '443px' }} src={billboard} />
        </Box>
        <Box maxW={{ base: '100%', md: '40%' }}>
          <Text fontSize={{ base: '12px', md: '20px' }} fontWeight={400} lineHeight={{ base: '8.125px', md: '30px' }} color={'#606060'}>Research</Text>
          <Text
            fontFamily={'euclid-medium'}
            fontSize={{ base: '16px', md: '30px' }} fontWeight={500}
            color='#011B33'
            lineHeight={{ base: '29.109px', md: 'normal' }}
          >The New Era of Health Care Services</Text>
          <Text fontWeight={{ base: 400 }} fontSize={{ base: '14px' }}>
            An Infrastructure that empowers you to adapt to changing customer expectations with everything you need to power your business.
          </Text>
          <Flex
            onClick={getStarted.onOpen}
            mt='22px'
            alignItems={'center'}
            justify={'flex-start'} gap='10px'
            cursor={'pointer'}
          >
            <Text
              _hover={{ textDecoration: 'underline' }}
              fontSize={{ base: '12px', md: '16px' }}
              fontWeight={500}
              lineHeight={'30px'}
              color={'#19508d'}
              fontFamily={'euclid-medium'}
            >Get started </Text>
            <Image src={longArrowRight} w='23.593px' h='auto' />
          </Flex>
        </Box>
      </Flex>

      <Footer />

      <GetStarted getStarted={getStarted} />
    </Box>
  )
}

export default LandingAuth(Home)