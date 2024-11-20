/** @format */

"use client";
import Link from "next/link";

import { Stack } from "@mantine/core";

import DesktopToggleDarkMode from "@/components/theme/DesktopToggle";
import MobileToggleDarkMode from "@/components/theme/MobileToggle";

import cx from "clsx";
import { useState } from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";


import { Button, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useContext } from "react";
import AuthenticationContextValue from "@/context/AuthenticationContext";
import { HttpHookService } from "@/services/HttpHookService";


import classes from "./HeaderTabs.module.css";
import { useEffect } from "react";
import { Image } from "@mantine/core";
import { usePathname } from "next/navigation";

interface UserDetail {
  username: string;
  email: string;
  image: string;
}

const defaultUserDetail: UserDetail = {
  username: "Login",
  email: "",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
};


const tabs = [
  { label: "Home", href: "/" },
  { label: "RWS", href: "/RWS" },
  { label: "ReadMode", href: "/RWS/ReadMode" },
  { label: "WriteMode", href: "/RWS/WriteMode" },
  { label: "Improve", href: "/RWS/ImproveMode" },
  // { label: 'Forums', href: '/forums' },
  // { label: 'Account', href: '/account' },
  // { label: 'Helpdesk', href: '/helpdesk' },
];

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail>(defaultUserDetail);
  console.log(userDetail, "abidprofile");

  const [activeTab, setActiveTab] = useState<string | null>("first");
  const pathname = usePathname();

  //logut
  const { authPost, authGet } = HttpHookService();
  const { setLoginState, loginState } = useContext(AuthenticationContextValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.href === pathname);
    if (currentTab) {
      setActiveTab(currentTab.label);
    }
  }, [pathname]);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.label} key={tab.label}>
      <Link href={tab.href} className={classes.removeDecoration}>
        {tab.label}
      </Link>
    </Tabs.Tab>
  ));


  const onConfirm = async () => {

    try {
      setLoading(true); // Set loading to true when logout starts
      const response = await authPost("/user/logout");

      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        }
        setLoginState(false);
        console.log("Logout successful");
        if (typeof window !== "undefined") {
          window.location.reload(); // Refresh the page
        }
      } else {
        console.log("Logout failed: ", response);
      }
    } catch (error) {
      console.error("Logout error: ", error);
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  const openLogoutModal = () =>

    modals.openConfirmModal({
      title: "Logout Confirmation",
      centered: true,
      children: (
        <>
          <Text size="sm">Are you sure you want to logout?</Text>
          {loading && <Loader size="sm" />}
        </>
      ),
      labels: { confirm: "Yes, Logout", cancel: "No" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Logout canceled"),
      onConfirm: onConfirm,
    });



  useEffect(() => {
    const fetchUserDetail = async () => {
      if (loginState) {
        const response = await authGet("/user-detail/profile");
        console.log(response, "abidprofile");
        response.image = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png";
        setUserDetail(response);

      } else {
        setUserDetail(defaultUserDetail);
      }
    };
    fetchUserDetail();
  }, [loginState]);







  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Image
            radius="md"
            h={30}
            w="auto"
            fit="contain"
            src="/logo/logo3.png"
            alt="Mantine logo"
          />

          {/* <MantineLogo size={28} /> */}

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Group>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={userDetail.image}
                      alt={userDetail.username}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {userDetail.username}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Stack hiddenFrom="xs" h={rem(36)}>
                  <MobileToggleDarkMode />
                </Stack>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Change account
                </Menu.Item>

                <Link href="/authentication">
                  <Menu.Item
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Login
                  </Menu.Item>
                </Link>

                <Menu.Item
                  onClick={() => openLogoutModal()}
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconPlayerPause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Pause subscription
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <div className={classes.toggleButton}>
              <DesktopToggleDarkMode />
            </div>
          </Group>
        </Group>
      </Container>

      <Container size="md">
        <Tabs
          value={activeTab} //accept string
          onChange={setActiveTab} //accept function returning string
          variant="outline"
          visibleFrom={opened ? undefined : "sm"}
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
