'use client';
import { Grid } from '@mantine/core';
import { Container } from '@mantine/core';
import { Stack } from '@mantine/core';
import ReaderPad from '@/components/RWS/Read/ReaderPad';
import HintPad from '@/components/RWS/Read/HintPad';
import HelperPad from '@/components/RWS/Read/HelperPad';
import { Space } from '@mantine/core';

function ReadMode() {
  return (
    <>
      <Grid grow>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}> <ReaderPad /> </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>


          <Stack
            h={250}>

            < HintPad />

          </Stack>

          <Space h="md" />

          <Stack>

            < HelperPad />

          </Stack>






        </Grid.Col>
      </Grid>

    </>
  );
}

export default ReadMode;