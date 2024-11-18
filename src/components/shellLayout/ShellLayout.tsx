'use client';

import { AppShell, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { authGet } from '@/services/http.service';
import { use, useEffect } from 'react';

import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';
import HeaderTabs from '../header/header';
import { Flex, Button } from '@mantine/core';
import { Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import classes from './ShellLayout.module.css';
import { Stack } from '@mantine/core';
import { useState } from 'react'; 
import { HttpHookService } from '@/services/HttpHookService';
import { useContext } from 'react';
import AuthenticationContext from '@/context/AuthenticationContext';



function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  // const { loginState, setLoginState } = useContext(AuthenticationContext) as {
  //   loginState: boolean;
  //   setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  // };


  // const { sepcialPost } = HttpHookService();

  // const validateUserUsingRefreshToken = async () => {
  //   try {
  //     // Call the API to validate the user using the refresh token
  //     const response = await sepcialPost('/user/refresh-token');
  //     console.log(response, "abidtokennava");

  //     // Correct way to check if the request was successful
  //     if (response.status === 200) {
  //       console.log("running validationfunction now", loginState);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error validating user using refresh token:', error);
  //     return false;
  //   }
  // };

  // const checkAndSetLoginState = async () => {
  //   if (!loginState) {
  //     // If user is not logged in, validate immediately
  //     const isValid = await validateUserUsingRefreshToken();
  //     if (isValid) {
  //       setLoginState(true);
  //       console.log("setting loginstate to true first time", loginState);
  //     }
  //     //else keep it false only
  //   }
  // };

  // useEffect(() => {
  //   console.log("running useeffect first time in shell", loginState);
  //   checkAndSetLoginState();
  // }, []);


  return (
    <Stack
    >
      <div><HeaderTabs /></div>
      <div className={classes.borderb}>{children}</div>

    </Stack>
  );
}

export default ShellLayout;





