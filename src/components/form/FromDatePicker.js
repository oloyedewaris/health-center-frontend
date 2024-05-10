import { FormControl, FormLabel, Text } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import React from 'react'

const FromDatePicker = ({ error, isRequired, onChange, value, label, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      {error && <Text fontSize='10px' color='red'>{error}</Text>}
      <SingleDatepicker
        borderColor={error && 'red'}
        name="date-input"
        date={value}
        onDateChange={onChange}
      />
    </FormControl>
  )
}

export default FromDatePicker