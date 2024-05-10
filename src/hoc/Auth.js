import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Provider'
import axiosInstance from '../utils/axiosInstance';
import { authenticateUser } from '../context/actions/auth';
import { CircularProgress, Flex } from '@chakra-ui/react';

function Auth(Component) {
  const AuthCheck = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const { authState, authDispatch } = useContext(GlobalContext);

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken')
      if (!authState?.isAuthenticated && accessToken) {
        axiosInstance.get("/auth/authenticate")
          .then(res => {
            authenticateUser(res.data)(authDispatch)
            setChecked(true)
          })
          .catch(err => {
            localStorage.removeItem('accessToken')
            navigate('/')
          })
      } else {
        if (!authState.isAuthenticated) {
          navigate('/auth/login')
        } else if (authState.isAuthenticated && authState.user.isPatient && !authState.user?.bioData) {
          navigate('/auth/biodata')
        } else if (authState.isAuthenticated && authState.user.isPatient && !authState.user?.nextOfKin) {
          navigate('/auth/next-of-kin')
        } else {
          setChecked(true)
        }
      }
    }, [authState])

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


export default Auth
