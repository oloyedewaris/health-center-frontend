import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Flex } from '@chakra-ui/react';

function LandingAuth(Component) {
  const AuthCheck = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        navigate('/dashboard')
      } else {
        setChecked(true)
      }
    }, [])

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify='center' align='center' h='100vh' w='100vw'>
            <CircularProgress isIndeterminate size="24px" />
          </Flex>
        )}
      </div>
    )
  }
  return AuthCheck
};


export default LandingAuth
