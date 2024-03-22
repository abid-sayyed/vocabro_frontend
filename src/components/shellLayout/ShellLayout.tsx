'use client';

import { AppShell, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';

import HeaderTabs from  '@/components/header/header';

function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    
    <AppShell header={{ height: { base: 48, sm: 60, lg: 76 } }}>
    

      <AppShell.Header>

        <HeaderTabs />

      </AppShell.Header>


      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default ShellLayout;




