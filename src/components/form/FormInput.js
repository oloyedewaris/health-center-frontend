import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const FormInput = ({ isRequired, error, onChange, id, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      {error && <Text fontSize='10px' color='red'>{error}</Text>}
      <Input
        borderColor={error && 'red'}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default FormInput