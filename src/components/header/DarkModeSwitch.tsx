import { Switch, useMantineTheme, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';



function DarkModeSwitch() {
    const theme = useMantineTheme();

    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}

        size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;

}

export default DarkModeSwitch;
