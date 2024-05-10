import { Button as ChakraButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Button = ({ bg, background, bgColor, variant, children, ...rest }) => {
  const [isClicked, setIsClicked] = useState(false);

  switch (variant) {
    case 'primary':
      return (
        <ChakraButton
          fontFamily="proximanova"
          fontWeight={500}
          p={'11px'}
          borderRadius={12}
          as={motion.button}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          color='#000000'
          bg={'transparent'}
          border={'1px solid #000000'}
          h={'44px'}
          _hover={{
            background: '',
          }}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}>
          {children}
        </ChakraButton>
      );

    case 'secondary':
      return (
        <ChakraButton
          fontFamily="proximanova"
          fontWeight={500}
          as={motion.button}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          borderRadius={12}
          p={'11px'}
          color='#FFFFFF'
          bg={'#000000'}
          h={'44px'}
          _hover={{
            background: '',
          }}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}>
          {children}
        </ChakraButton>
      );

    case 'gray':
      return (
        <ChakraButton
          fontFamily="proximanova"
          fontWeight={500}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          borderRadius={5}
          bg={'transparent'}
          _hover={{
            background: '',
          }}
          outline={'none !important'}
          border={'1px solid #919191 !important'}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}>
          {children}
        </ChakraButton>
      );
    case 'danger':
      return (
        <ChakraButton
          fontFamily="proximanova"
          fontWeight={500}
          borderRadius={5}
          as={motion.button}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          bg={'#D92E33'}
          _hover={{
            background: '',
          }}
          outline={'none !important'}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}>
          {children}
        </ChakraButton>
      );

    default:
      return (
        <ChakraButton
          fontFamily="proximanova"
          fontWeight={500}
          bg={bg || background || bgColor}
          border={'1px solid #919191'}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}>
          {children}
        </ChakraButton>
      );
  }
};
