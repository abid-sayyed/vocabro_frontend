import { Stack, Button } from '@mantine/core';
import { Chip } from '@mantine/core';
import styles from './ContinueBox.module.css';
function Home() {
  return (
    <Stack className={styles.container}
      bg="var(--mantine-color-body)"
      align="center"
      gap='xs'
    >
       <Chip defaultChecked radius="xs">Awesome chip</Chip>
       <Chip defaultChecked radius="xs">Awesome chip</Chip>
       <Chip defaultChecked radius="xs">Awesome chip</Chip>

    </Stack>
  );
}

export default Home;