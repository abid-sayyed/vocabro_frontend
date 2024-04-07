import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import PdfReader from '@/components/RWS/Read/pdfReader';
import { ScrollArea } from '@mantine/core';
import { Card } from '@mantine/core';
import { Paper } from '@mantine/core';


function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Tesing phase for Hero Text{' '}
          <Text component="span" className={classes.highlight} inherit>
             reviews
          </Text>{' '}
          stack
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build more reliable software with collaboration. .
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg" variant="default" color="gray">
            Start
          </Button>
          <Button className={classes.control} size="lg">
            Continue
          </Button>
        </div>
      </div>


    </Container>
    
  );
}

export default HeroText;


