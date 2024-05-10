import React, { useContext } from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCaretDown, FaUser } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiMessageDetail } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { GlobalContext } from '../../context/Provider';
import { logout } from '../../context/actions/auth';

const ProfileMenu = () => {
  const { authState, authDispatch } = useContext(GlobalContext)
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate('/settings');
  };
  const handleLogout = () => {
    logout()(authDispatch)
    navigate('/');
  };

  return (
    <Menu h="fit-content">
      <MenuButton w='178px' color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
        <Flex gap={'8px'} as={motion.div} align={'center'} justifyContent={'center'} cursor={'pointer'}
          whiletap={{ scale: 0.9 }} whilehover={{ scale: 1.1 }}
        >
          <FaUser color='#19518D' size={'20px'} alt='icon' />
          <Text color='#000000'>{authState.user?.name || authState.user?.firstName}</Text>
          <FaCaretDown color='#19518D' size={25} />
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }}>
        <MenuItem onClick={handleLogout}>
          <Flex gap={3} align='center'>
            <FaSignOutAlt size={'26px'} color='#919191' />
            <Text color='#919191' fontWeight='400'>
              Sign Out
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu