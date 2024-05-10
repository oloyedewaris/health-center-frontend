import React, { useState } from 'react'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Urine from './PathologyLab/urine';
import Parasitology from './PathologyLab/parasitology';
import Haematology from './PathologyLab/haematology';
import ChemPathology from './PathologyLab/chemPathology';

const tabs = [
  {
    tablist: "Urine",
    component: <Urine />,
  },
  {
    tablist: "Parasitology",
    component: <Parasitology />,
  },
  {
    tablist: "Haematology",
    component: <Haematology />,
  },
  {
    tablist: "Chemical Pathology",
    component: <ChemPathology />,
  },
];

const PathologyLab = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  return (
    <Tabs onChange={handleTabChange} align="start" isLazy >
      <TabList justifyContent={'flex-start'} bg='#EAECF5' borderRadius={'full'} fontWeight="600" fontSize="18px" lineHeight="23px" maxW="100%" >
        {tabs.map((item, index) => (
          <Tab key={index} borderBottom={'0'}>
            {tabIndex === index ? (
              <Box fontWeight='700' color='black' bg='white' border='1px solid #B3B8DB' borderRadius='full' mx="auto" minW="73px" px='12px' py='8px'>
                {item.tablist}
              </Box>
            ) : (
              <Box fontWeight='400' color='#667085' borderRadius='full' mx="auto" minW="73px" px='12px' py='8px'>
                {item.tablist}
              </Box>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels >
        {tabs.map((item, index) => (
          <TabPanel key={index} px="0px">
            {item.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default PathologyLab