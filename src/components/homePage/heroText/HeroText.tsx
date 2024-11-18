import { Title, Text, Button, Container, Group } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import PdfReader from '@/components/RWS/Read/pdfReader';
import { ScrollArea } from '@mantine/core';
import { Card } from '@mantine/core';
import { Paper } from '@mantine/core';
import Link from 'next/link';
import { Space } from '@mantine/core';

import { HttpHookService } from '@/services/HttpHookService';


function HeroText() {

  const { authGet } = HttpHookService();


  const test = async () => {
    const test = await authGet('/protected')
    console.log(test, "abidauthget protectedroute");
  }

  test()


  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Want to Improve your{' '}
          <Text component="span" className={classes.highlight} inherit>
            Communication?
          </Text>{' '}
          {/* stack */}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Master this exercise and unleash your potential!
          </Text>
        </Container>

        <div className={classes.controls}>

          <Group justify="center">



            <Link href='/RWS' passHref>
              <Button className={classes.control} size="lg" variant="default" color="gray">
                Start
              </Button>
            </Link>




            <Link href='/RWS' passHref>
              <Button className={classes.control} size="lg">
                Continue
              </Button>
            </Link>

          </Group>

        </div>
      </div>


    </Container>

  );
}

export default HeroText;


