import React, { useState } from 'react'
import { Box, Flex, GridItem, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PrescriptionSheet from './Prescription/PrescriptionSheet';
import FluidBalance from './FluidBalance/index';
import Treatment from './Treatment/index';

const Nursing = ({ appointment, bioData }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    {
      tablist: "Nursing Treatments",
      component: <Treatment appointment={appointment} bioData={bioData} />,
    },
    {
      tablist: "Fluid Balance",
      component: <FluidBalance appointment={appointment} bioData={bioData} />,
    },
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Tabs onChange={handleTabChange} isLazy mt='2' shadow={'xl'}>
      <SimpleGrid columns={{ base: 1, md: 5 }} w='full' spacing='20px' >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <TabList minH='80vh' flexDirection={'column'} h='full' px='0' gap='10px' pt='30px' shadow='md' fontWeight="600" fontSize="18px">
            {tabs.map((item, index) => (
              <Tab key={index} borderBottom={0} w='full' mx='0'>
                {tabIndex === index ? (
                  <Flex fontWeight='600' color='white' bg='#19518D' borderRadius='10px' mx="0" w="full" px='12px' py='8px'>
                    {item.tablist}
                  </Flex>
                ) : (
                  <Flex fontWeight='600' color='black' borderRadius='10px' mx="auto" w="full" px='12px' py='8px'>
                    {item.tablist}
                  </Flex>
                )}
              </Tab>
            ))}
          </TabList>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 4 }} h={'80vh'} overflowY={'scroll'}>
          <TabPanels minH='80vh'>
            {tabs.map((item, index) => (
              <TabPanel key={index} px="0px">
                {item.component}
              </TabPanel>
            ))}
          </TabPanels>
        </GridItem>
      </SimpleGrid>
    </Tabs>
  )
}

export default Nursing