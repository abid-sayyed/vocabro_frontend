import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';


function useDarkModeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const toggleDarkMode = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    };

    return toggleDarkMode;
}

export default useDarkModeToggle;
