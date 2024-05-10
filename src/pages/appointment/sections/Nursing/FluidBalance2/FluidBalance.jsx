import React from 'react'
import FluidBalanceIntake from './FluidBalanceIntake'
import FluidBalanceOutput from './FluidBalanceOutput'
import { Box, Button, Flex } from '@chakra-ui/react'

const FluidBalance = ({ appointment, bioData }) => {
    return (
        <Box py='24px' w='full' >
            <Flex overflowX={'scroll'} h='full' w='full'>
                <FluidBalanceIntake bioData={bioData} appointment={appointment} />
                <FluidBalanceOutput bioData={bioData} appointment={appointment} />
            </Flex>
            <Button
                mt='25px'
                float='right'
            // onClick={saveSheet}
            >
                Save
            </Button>
        </Box>
    )
}

export default FluidBalance