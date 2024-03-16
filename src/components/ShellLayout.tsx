'use client';

import { AppShell, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';

import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';
import HeaderTabs from './header/header';

function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <AppShell
      header={{ height: 60 }}
    >

      <AppShell.Header>

        <HeaderTabs />

      </AppShell.Header>


      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default ShellLayout;




