'use client';
import Link from 'next/link';

import { Stack } from '@mantine/core';

import DesktopToggleDarkMode from '@/components/theme/DesktopToggle';
import MobileToggleDarkMode from '@/components/theme/MobileToggle';


import cx from 'clsx';
import { useState } from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';

import classes from './HeaderTabs.module.css';



const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
    { label: 'Home', href: '/' },
    { label: 'RWS', href: '/RWS' },
    { label: 'Education', href: '/education' },
    { label: 'Community', href: '/community' },
    { label: 'Forums', href: '/forums' },
    { label: 'Support', href: '/support' },
    { label: 'Account', href: '/account' },
    { label: 'Helpdesk', href: '/helpdesk' },
];

export function HeaderTabs() {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab.label} key={tab.label}>
            <Link href={tab.href}>
                {tab.label}
            </Link>
        </Tabs.Tab> 
    ));

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group justify="space-between">
                    <MantineLogo size={28} />

                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                    <Group>


                        <Menu
                            width={260}
                            position="bottom-end"
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                                >
                                    <Group gap={7}>
                                        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                        <Text fw={500} size="sm" lh={1} mr={3}>
                                            {user.name}
                                        </Text>
                                        <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Stack
                                    hiddenFrom="xs"

                                    h={rem(36)}
                                >
                                    <MobileToggleDarkMode />
                                </Stack>

                                <Menu.Item
                                    leftSection={
                                        <IconHeart
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.red[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Liked posts
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconStar
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.yellow[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Saved posts
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconMessage
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.blue[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Your comments
                                </Menu.Item>

                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Account settings
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Change account
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Logout
                                </Menu.Item>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Pause subscription
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                >
                                    Delete account
                                </Menu.Item>
                            </Menu.Dropdown>


                        </Menu>

                        <div className={classes.toggleButton}>

                            < DesktopToggleDarkMode />


                        </div>



                    </Group>

                </Group>
            </Container>

            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom={opened ? undefined : 'sm'}
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}

export default HeaderTabs;



