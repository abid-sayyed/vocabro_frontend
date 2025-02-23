import { Grid, Stack, Space } from "@mantine/core";
import HelperPad from "@/components/RWS/Read/HelperPad";
import HintPad from "@/components/RWS/Read/HintPad";
import { FC } from "react";


interface ModeLayoutProps {
    MainComponent: FC; 
  }

const ModeLayout: FC<ModeLayoutProps> = ({ MainComponent }) => {
    return (
    <Grid grow>
      <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
        <MainComponent />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <Stack>
          <HelperPad />
        </Stack>
        <Space h="xl" />
        <Stack h={250}>
          <HintPad />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ModeLayout;
