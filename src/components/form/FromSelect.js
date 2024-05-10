import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import React from 'react'

const FormSelect = ({ error, isRequired, onChange, id, value, label, placeholder, options, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      {error && <Text fontSize='10px' color='red'>{error}</Text>}
      <Select
        borderColor={error && 'red'}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
        {options.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </Select>
    </FormControl>
  )
}

export default FormSelect