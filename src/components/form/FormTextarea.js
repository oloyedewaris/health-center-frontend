import { FormControl, FormLabel, Textarea, Text } from '@chakra-ui/react'
import React from 'react'

const FormTextarea = ({ error, isRequired, onChange, id, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      {error && <Text fontSize='10px' color='red'>{error}</Text>}
      <Textarea
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

export default FormTextarea