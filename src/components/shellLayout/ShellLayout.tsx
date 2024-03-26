'use client';

import { AppShell, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';

import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';
import HeaderTabs from '../header/header';
import { Flex, Button } from '@mantine/core';
import { Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import classes from './shellLayout.module.css';
import { Stack } from '@mantine/core';



function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <Stack
    >
      <div><HeaderTabs /></div>
      <div className={classes.borderb}>{children}</div>

    </Stack>
  );
}

export default ShellLayout;





