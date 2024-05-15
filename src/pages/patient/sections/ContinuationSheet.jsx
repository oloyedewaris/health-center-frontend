import React, { useState } from 'react'
import { Box, Button, Divider, Flex, Heading, Spinner, Text, VStack, useDisclosure, Input } from '@chakra-ui/react'
import CommentAndTreatmentView from '../../../pages/appointment/sections/ContinuatioSheet/CommentAndTreatmentView';

import { CiCalendarDate } from "react-icons/ci";
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const ContinuationSheet = ({ patient }) => {
  const commentViewModal = useDisclosure()
  const [comment, setComment] = useState(null)

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7), // Setting a default range of 7 days
      key: 'selection',
    },
  ]);

  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [showDatePicker, setShowDatePicker] = useState(false);

   const handleDateRangeChange = (ranges) => {
    if (ranges.selection) {
      const { startDate, endDate } = ranges.selection;
      setTempDateRange([
        {
          ...tempDateRange[0],
          startDate,
          endDate,
        },
      ]);
    }
  };

  const applyDateRange = () => {
    setDateRange(tempDateRange);
    setShowDatePicker(false);
  };

  const staticData = [
    {
      id: 1,
      date: '2024-05-01',
      signsAndSymptoms: 'Cough and fever',
      assessment: 'Upper respiratory tract infection',
      plan: 'Prescribed antibiotics and rest',
    },
    {
      id: 2,
      date: '2024-05-03',
      signsAndSymptoms: 'Sore throat and fatigue',
      assessment: 'Tonsillitis',
      plan: 'Prescribed antibiotics and pain relief',
    },
    {
      id: 3,
      date: '2024-05-05',
      signsAndSymptoms: 'Headache and dizziness',
      assessment: 'Migraine',
      plan: 'Prescribed painkillers and hydration',
    },
    {
      id: 4,
      date: '2024-05-07',
      signsAndSymptoms: 'Stomach pain and nausea',
      assessment: 'Gastritis',
      plan: 'Prescribed antacids and dietary changes',
    },
    {
      id: 5,
      date: '2024-05-09',
      signsAndSymptoms: 'Shortness of breath',
      assessment: 'Asthma exacerbation',
      plan: 'Inhaler and corticosteroids',
    },
    {
      id: 6,
      date: '2024-05-10',
      signsAndSymptoms: 'Chest pain',
      assessment: 'Possible angina',
      plan: 'Referred to cardiologist for further evaluation',
    },
    {
      id: 7,
      date: '2024-05-12',
      signsAndSymptoms: 'Back pain',
      assessment: 'Muscle strain',
      plan: 'Prescribed muscle relaxants and physical therapy',
    },
    {
      id: 8,
      date: '2024-05-13',
      signsAndSymptoms: 'Rash and itching',
      assessment: 'Allergic reaction',
      plan: 'Prescribed antihistamines and topical steroids',
    },
    {
      id: 9,
      date: '2024-05-14',
      signsAndSymptoms: 'Joint pain and swelling',
      assessment: 'Rheumatoid arthritis',
      plan: 'Referred to rheumatologist and prescribed anti-inflammatory medication',
    },
    {
      id: 10,
      date: '2024-05-15',
      signsAndSymptoms: 'Fatigue and muscle aches',
      assessment: 'Influenza',
      plan: 'Prescribed antiviral medication and rest',
    },
    {
      id: 11,
      date: '2024-05-16',
      signsAndSymptoms: 'Loss of appetite and weight loss',
      assessment: 'Depression',
      plan: 'Referred to psychiatrist and prescribed antidepressants',
    },
    {
      id: 12,
      date: '2024-05-17',
      signsAndSymptoms: 'Ear pain and hearing loss',
      assessment: 'Otitis media',
      plan: 'Prescribed antibiotics and pain relief',
    },
    {
      id: 13,
      date: '2024-05-18',
      signsAndSymptoms: 'Eye redness and discharge',
      assessment: 'Conjunctivitis',
      plan: 'Prescribed antibiotic eye drops',
    },
    {
      id: 14,
      date: '2024-05-19',
      signsAndSymptoms: 'Swollen glands and fever',
      assessment: 'Mononucleosis',
      plan: 'Prescribed rest and hydration',
    },
    {
      id: 15,
      date: '2024-05-20',
      signsAndSymptoms: 'Frequent urination and thirst',
      assessment: 'Diabetes mellitus',
      plan: 'Referred to endocrinologist and prescribed insulin',
    },
    {
      id: 16,
      date: '2024-05-21',
      signsAndSymptoms: 'Persistent cough and weight loss',
      assessment: 'Tuberculosis',
      plan: 'Referred to infectious disease specialist and prescribed antibiotics',
    },
    {
      id: 17,
      date: '2024-05-22',
      signsAndSymptoms: 'Chest tightness and wheezing',
      assessment: 'Asthma',
      plan: 'Prescribed inhaler and monitoring',
    },
    {
      id: 18,
      date: '2024-05-23',
      signsAndSymptoms: 'Abdominal pain and diarrhea',
      assessment: 'Gastroenteritis',
      plan: 'Prescribed rehydration therapy and antibiotics',
    },
    {
      id: 19,
      date: '2024-05-24',
      signsAndSymptoms: 'Skin lesions and fatigue',
      assessment: 'Psoriasis',
      plan: 'Referred to dermatologist and prescribed topical treatments',
    },
    {
      id: 20,
      date: '2024-05-25',
      signsAndSymptoms: 'High blood pressure and headache',
      assessment: 'Hypertension',
      plan: 'Prescribed antihypertensive medication and lifestyle changes',
    },
  ];
  

  console.log("patient", patient)
  console.log("patient date", new Date(patient?.timestamp))

  const onViewModal = (cmt) => {
    setComment(cmt);
    console.log("cmtt", cmt)
    commentViewModal.onOpen();
  }


  const filterCommentsByDate = (comments) => {
    const { startDate, endDate } = dateRange[0];
    return comments.filter((cmt) => {
      const date = new Date(cmt.date);
      return date >= startDate && date <= endDate;
    });
  };

  // const filteredComments = filterCommentsByDate(
  //   patient?.continuationSheet?.commentAndTreatment || []
  // );

  const filteredComments = filterCommentsByDate(staticData);
  


  return (
    <Box px='24px' w='full'>
      <Flex align={'center'} justify='center'>
        <Heading textAlign={'center'} size='md'>Comments And Treatments</Heading>
      </Flex>
      <Flex my='10px' justify='end' gap='10px'>
        <CiCalendarDate size="2rem"/>
        <Input
        ml="5px"
          w="fit-content"
          value={`${format(dateRange[0].startDate, 'dd/MM/yyyy')} - ${format(dateRange[0].endDate, 'dd/MM/yyyy')}`}
          readOnly
          onClick={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <Box position='absolute' top='40px' zIndex='1000' bg='white' p='10px' boxShadow='md'>
          <DateRangePicker
            ranges={tempDateRange}
            onChange={handleDateRangeChange}
            rangeColors={['#3182ce']}
          />
          <Flex justify='flex-end' mt='10px'>
            <Button onClick={applyDateRange} colorScheme='blue'>
              Apply
            </Button>
          </Flex>
        </Box>
          
        )}
      </Flex>
      {patient ? (
        <VStack w='full' spacing={'10px'} divider={<Divider />}>
          <Flex gap='10px' w='full' justify={'center'} fontWeight={500}>
            <Text w='15%'>Date</Text>
            <Text w='25%'>Signs and Symptoms</Text>
            <Text w='25%'>Assessment</Text>
            <Text w='25%'>Plan</Text>
            <Box w='10%'>
              <Text>Action</Text>
            </Box>
          </Flex>
          {/* {(patient?.continuationSheet?.commentAndTreatment || [])?.map(cmt => ( */}
          {filteredComments.map((cmt, index) => (
            <Flex gap='10px' w='full' justify={'center'}>
              {/* <Text w='15%'>27th May, 2024</Text> */}
              <Text w='15%'>{format(new Date(cmt.date), 'MMMM d, yyyy')}</Text>
              <Text w='25%'>{cmt?.signsAndSymptoms}</Text>
              <Text w='25%'>{cmt?.assessment}</Text>
              <Text w='25%'>{cmt?.plan}</Text>
              <Flex w='10%' gap={'7px'}>
                <Button onClick={() => onViewModal(cmt)} color='blue'>View</Button>
              </Flex>
            </Flex>
          ))}

        </VStack>
      ) : <Spinner />}

      <CommentAndTreatmentView comment={comment} modal={commentViewModal} />
    </Box>
  )
}

export default ContinuationSheet;