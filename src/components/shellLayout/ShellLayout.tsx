'use client';

import { AppShell, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';

import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';
import HeaderTabs from '../header/header';
import { Flex, Button } from '@mantine/core';
import { Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import classes from './shellLayoutcss.module.css';
import { Stack } from '@mantine/core';



function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <Stack
      // h={76}
    >
      <div><HeaderTabs /></div>
      <div>{children}</div>

    </Stack>
  );
}

export default ShellLayout;





