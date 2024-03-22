import cx from 'clsx';
import classes from './theme.module.css';

import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import useDarkModeToggle from './ToggleFunction';


function DesktopToggleDarkMode() {

  const toggleDarkMode = useDarkModeToggle();

  return (
    <ActionIcon
      onClick={toggleDarkMode}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}

export default DesktopToggleDarkMode;