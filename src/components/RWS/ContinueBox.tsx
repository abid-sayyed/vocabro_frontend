import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { Chip, Stack } from '@mantine/core';
import styles from './ContinueBox.module.css';


const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const data = [
  { label: 'Page views', stats: '456,578', progress: 65, color: 'teal', icon: 'up' },
  { label: 'New users', stats: '2,550', progress: 72, color: 'blue', icon: 'up' },
  {
    label: 'Orders',
    stats: '4,735',
    progress: 52,
    color: 'red',
    icon: 'down',
  },
  
  { label: 'Page views', stats: '456,578', progress: 65, color: 'teal', icon: 'up' },
] as const;

export function ContinueBox() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label} >
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />
          <Stack 
            align="center"
            gap='xs'
          >
            <Chip defaultChecked radius="xs" variant="light">Awesome chip</Chip>
            <Chip defaultChecked radius="xs">Awesome chip</Chip>
            <Chip defaultChecked radius="xs">Awesome chip</Chip>

          </Stack>

        </Group>
      </Paper>
    );
  });

  return <Group gap="xl" ps="xl"  justify="center">{stats}</Group>;
}

export default ContinueBox;