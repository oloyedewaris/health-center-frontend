import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'

const FormInputPassword = ({ isRequired, error, onChange, id, value, label, placeholder, ...rest }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      {error && <Text fontSize='10px' color='red'>{error}</Text>}
      <InputGroup>
        <Input
          borderColor={error && 'red'}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          pr='4.5rem'
          type={show ? 'text' : 'password'}
        />
        <InputRightElement width='4.5rem'>
          <Button bg='transparent' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}

export default FormInputPassword