import { Switch, useMantineTheme, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

import useDarkModeToggle from './ToggleFunction';


function MobileToggleDarkMode() {

    const theme = useMantineTheme();
    const toggleDarkMode = useDarkModeToggle();

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );

    return <Switch
        onClick={toggleDarkMode}

        size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;

}

export default MobileToggleDarkMode;
